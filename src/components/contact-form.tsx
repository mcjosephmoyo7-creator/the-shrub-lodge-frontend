"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const schema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  email: z.string().min(1, "Please enter your email").email("Enter a valid email address"),
  message: z.string().min(1, "Please tell us a little about your plans"),
  // Honeypot field: invisible to humans, bots tend to fill it in.
  company: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-forest-900 placeholder:text-forest-800/40 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setError(null);

    // Honeypot: if filled, silently pretend success without sending.
    if (values.company) {
      setSent(true);
      reset();
      return;
    }

    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    let web3formsError: string | null = null;

    // Web3Forms blocks server-side requests (Cloudflare challenge), so when a
    // key is configured we submit straight from the browser — its intended use.
    if (web3formsKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `New website enquiry from ${values.firstName} ${values.lastName}`,
            from_name: `${siteConfig.name} website`,
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            replyto: values.email,
            message: values.message,
            botcheck: false,
          }),
        });

        const payload = (await response.json().catch(() => null)) as {
          success?: boolean;
          message?: string;
        } | null;

        if (response.ok && payload?.success) {
          setSent(true);
          reset();
          return;
        }

        web3formsError = payload?.message ?? null;
      } catch {
        // Network problem — fall through and try our own endpoint.
      }
    }

    // Fall back to our own endpoint (e.g. Resend is configured, or a retry).
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSent(true);
        reset();
        return;
      }

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        detail?: string;
      } | null;

      setError(
        payload?.detail ??
          payload?.error ??
          web3formsError ??
          "Sorry, we couldn't send your message. Please email us directly instead.",
      );
    } catch {
      setError(
        web3formsError ??
          "Sorry, we couldn't reach our server. Please email us or call us directly.",
      );
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-sand-200 bg-sand-100/60 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-forest-600" />
        <p className="font-display text-2xl text-forest-900">
          Thank You, We&rsquo;ll Contact You Soon!
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm font-semibold text-gold-700 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium text-forest-900">
            First Name
          </label>
          <input
            id="firstName"
            className={cn(fieldClass, errors.firstName && "border-red-400")}
            placeholder="Jane"
            {...register("firstName")}
          />
          {errors.firstName ? (
            <span className="text-xs text-red-600">{errors.firstName.message}</span>
          ) : null}
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium text-forest-900">
            Last Name
          </label>
          <input
            id="lastName"
            className={cn(fieldClass, errors.lastName && "border-red-400")}
            placeholder="Doe"
            {...register("lastName")}
          />
          {errors.lastName ? (
            <span className="text-xs text-red-600">{errors.lastName.message}</span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-forest-900">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={cn(fieldClass, errors.email && "border-red-400")}
          placeholder="jane@example.com"
          {...register("email")}
        />
        {errors.email ? (
          <span className="text-xs text-red-600">{errors.email.message}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-forest-900">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={cn(fieldClass, "resize-y", errors.message && "border-red-400")}
          placeholder="Tell us about your trip and what you would like to do..."
          {...register("message")}
        />
        {errors.message ? (
          <span className="text-xs text-red-600">{errors.message.message}</span>
        ) : null}
      </div>

      {/* Honeypot — hidden from humans, catches spam bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {error}{" "}
            <a
              href={`mailto:${siteConfig.email.reservations}`}
              className="font-semibold underline underline-offset-2"
            >
              {siteConfig.email.reservations}
            </a>{" "}
            or call{" "}
            <a href={`tel:${siteConfig.phone.reservations}`} className="font-semibold underline underline-offset-2">
              {siteConfig.phoneDisplay.reservations}
            </a>
            .
          </span>
        </div>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Sending..." : "Send"}
      </Button>
    </form>
  );
}
