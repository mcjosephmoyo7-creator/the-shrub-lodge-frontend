import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact form endpoint.
 *
 * Delivery is configured with environment variables (see .env.example). Two
 * providers are supported and the first one that is configured is used:
 *
 *  1. Web3Forms  — set WEB3FORMS_ACCESS_KEY. The access key is tied to the
 *     destination inbox, so submissions arrive there directly. No domain needed.
 *  2. Resend     — set RESEND_API_KEY. Sends to CONTACT_TO_EMAIL (defaults to the
 *     lodge reservations address).
 *
 * When neither is configured the endpoint replies 503 with `not_configured` so
 * the form can show the guest our phone/email instead of pretending it sent.
 */

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(80),
  lastName: z.string().trim().min(1, "Please enter your last name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(200),
  message: z.string().trim().min(1, "Please tell us a little about your plans").max(4000),
  /** Honeypot — must stay empty. Bots fill it in. */
  company: z.string().max(0).optional().or(z.literal("")),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (recentRequests.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  recentRequests.set(key, timestamps);

  if (recentRequests.size > 500) {
    for (const [entryKey, times] of recentRequests) {
      if (times.every((time) => now - time > RATE_LIMIT_WINDOW_MS)) {
        recentRequests.delete(entryKey);
      }
    }
  }

  return timestamps.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(data: z.infer<typeof schema>) {
  const fullName = `${data.firstName} ${data.lastName}`;
  const subject = `New website enquiry from ${fullName}`;
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1e2f24;line-height:1.6">
      <h2 style="margin:0 0 12px">New enquiry from the website</h2>
      <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p style="margin:16px 0 4px"><strong>Message:</strong></p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>
  `.trim();
  return { fullName, subject, html };
}

async function sendWithWeb3Forms(
  accessKey: string,
  data: z.infer<typeof schema>,
  subject: string,
): Promise<boolean> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: `${siteConfig.name} website`,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      replyto: data.email,
      message: data.message,
      botcheck: false,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[contact] Web3Forms HTTP", response.status, body);
    return false;
  }

  // Web3Forms reports failures in the body (with HTTP 200), so read it.
  const payload = (await response.json().catch(() => null)) as
    | { success?: boolean; message?: string }
    | null;

  if (payload && typeof payload.success === "boolean") {
    if (!payload.success) {
      console.error("[contact] Web3Forms rejected the submission:", payload.message);
    }
    return payload.success;
  }

  return true;
}

async function sendWithResend(
  apiKey: string,
  to: string,
  data: z.infer<typeof schema>,
): Promise<boolean> {
  const { subject, html } = buildEmail(data);
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    `${siteConfig.name} Website <onboarding@resend.dev>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html, reply_to: data.email }),
  });
  return response.ok;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again shortly, or email us directly." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check your details." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.company) {
    // Silently accept honeypot hits without sending anything.
    return NextResponse.json({ ok: true });
  }

  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email.reservations;

  try {
    if (web3formsKey) {
      const { subject } = buildEmail(data);
      const ok = await sendWithWeb3Forms(web3formsKey, data, subject);
      if (ok) return NextResponse.json({ ok: true });
      return NextResponse.json(
        { error: "We couldn't send your message. Please email us directly." },
        { status: 502 },
      );
    }

    if (resendKey) {
      const ok = await sendWithResend(resendKey, to, data);
      if (ok) return NextResponse.json({ ok: true });
      return NextResponse.json(
        { error: "We couldn't send your message. Please email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        error: "not_configured",
        detail: `Email delivery is not set up yet. Please email us at ${siteConfig.email.reservations} or call ${siteConfig.phoneDisplay.reservations}.`,
      },
      { status: 503 },
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email us directly." },
      { status: 502 },
    );
  }
}
