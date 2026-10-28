import { cache } from "react";
import { siteConfig } from "@/lib/site";
import { getBackendUrl } from "@/lib/api/backend-url";

type PublicSettings = {
  site_title: string;
  logo_url: string;
  seo_title: string;
  seo_description: string;
};

type ContentKey =
  | "hero"
  | "about"
  | "services"
  | "testimonials"
  | "socialLinks"
  | "contact"
  | "footer";

type ContentValue = Record<string, unknown> | unknown[];

export type PublicSiteData = {
  content: Record<ContentKey, ContentValue>;
  settings: PublicSettings;
};

const contentDefaults: Record<ContentKey, ContentValue> = {
  hero: {},
  about: {},
  services: [],
  testimonials: [],
  socialLinks: [],
  contact: {},
  footer: {},
};

export type PublicWork = {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  link: string | null;
  work_date: string | null;
  position: number;
};

export type PublicPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string | null;
  scheduled_for: string | null;
  created_at: string;
};

type PublicSiteResponse = {
  content?: Partial<Record<ContentKey, unknown>>;
  settings?: Partial<PublicSettings>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSafeHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function normalizePublicContent(
  received: Partial<Record<ContentKey, unknown>> | undefined,
): Record<ContentKey, ContentValue> {
  const content = { ...contentDefaults };
  if (!received) return content;

  for (const key of Object.keys(contentDefaults) as ContentKey[]) {
    const value = received[key];
    if (value === undefined) continue;

    if ((key === "socialLinks" || key === "services" || key === "testimonials") && Array.isArray(value)) {
      content[key] = value.filter(isRecord).map((entry) => {
        const safeEntry = { ...entry };
        for (const [field, fieldValue] of Object.entries(safeEntry)) {
          if (/(url|href|link|image|logo|src)$/i.test(field) && fieldValue !== "") {
            if (!isSafeHttpUrl(fieldValue)) delete safeEntry[field];
          }
        }
        return safeEntry as ContentValue;
      });
    } else if (isRecord(value) || typeof value === "string") {
      content[key] = value as ContentValue;
    }
  }

  return content;
}

const getPublicSiteDataCached = cache(async (): Promise<PublicSiteData> => {
  const fallback: PublicSiteData = {
    content: normalizePublicContent(undefined),
    settings: {
      site_title: siteConfig.name,
      logo_url: "",
      seo_title: "",
      seo_description: siteConfig.description,
    },
  };
  const baseUrl = getBackendUrl();

  if (!baseUrl) {
    console.error("[public-content] API URL is not configured; using bundled content.");
    return fallback;
  }

  try {
    const response = await fetch(`${baseUrl}/api/public/content`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      throw new Error(`Public content request failed (${response.status}).`);
    }

    const payload = (await response.json()) as PublicSiteResponse;
    const receivedSettings = payload.settings ?? {};
    const logoUrl = isSafeHttpUrl(receivedSettings.logo_url)
      ? receivedSettings.logo_url
      : "";

    return {
      content: normalizePublicContent(payload.content),
      settings: {
        site_title:
          typeof receivedSettings.site_title === "string" &&
          receivedSettings.site_title.trim()
            ? receivedSettings.site_title.trim()
            : siteConfig.name,
        logo_url: logoUrl,
        seo_title:
          typeof receivedSettings.seo_title === "string"
            ? receivedSettings.seo_title
            : "",
        seo_description:
          typeof receivedSettings.seo_description === "string"
            ? receivedSettings.seo_description
            : siteConfig.description,
      },
    };
  } catch (error) {
    console.error("[public-content] Unable to load CMS data; using bundled content.", error);
    return fallback;
  }
});

export function getPublicSiteData(): Promise<PublicSiteData> {
  return getPublicSiteDataCached();
}

export function getContentSection(
  site: PublicSiteData,
  key: ContentKey,
): Record<string, ContentValue> {
  const value = site.content[key];
  return isRecord(value) ? (value as Record<string, ContentValue>) : {};
}

export function getContentText(
  section: Record<string, ContentValue>,
  key: string,
  fallback: string,
): string {
  const value = section[key];
  return typeof value === "string" ? value : fallback;
}

export function getContentItems<Field extends string>(
  site: PublicSiteData,
  key: ContentKey,
  requiredFields: readonly Field[],
): Record<Field, string>[] {
  const value = site.content[key];
  if (!Array.isArray(value)) return [];

  const items: unknown[] = value;
  return items.filter(
    (item): item is Record<string, unknown> =>
      isRecord(item) &&
      requiredFields.every((field) => typeof item[field] === "string") &&
      (key !== "socialLinks" || isSafeHttpUrl(item.href)),
  ).map((item) =>
    Object.fromEntries(
      requiredFields.map((field) => [field, item[field] as string]),
    ) as Record<Field, string>,
  );
}

export function getSocialLinks(
  site: PublicSiteData,
): { title: string; href: string }[] {
  const links = new Map<string, { title: string; href: string }>(
    siteConfig.socialLinks.map((link) => [link.title.toLowerCase(), { ...link }]),
  );

  for (const link of getContentItems(site, "socialLinks", ["title", "href"])) {
    const title = link.title.trim();
    if (!title) continue;

    links.set(title.toLowerCase(), { title, href: link.href });
  }

  return Array.from(links.values());
}

async function getPublicCollection<T>(
  path: string,
  collectionKey: "works" | "posts",
): Promise<T[]> {
  const baseUrl = getBackendUrl();
  if (!baseUrl) {
    throw new Error("The public content API URL is not configured.");
  }

  const response = await fetch(`${baseUrl}/api/public/${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error(`Unable to load public ${collectionKey} (${response.status}).`);
  }

  const payload = (await response.json()) as Record<string, unknown>;
  const items = payload[collectionKey];
  if (!Array.isArray(items)) {
    throw new Error(`The public ${collectionKey} response is invalid.`);
  }
  return items as T[];
}

export function getPublicWorks(): Promise<PublicWork[]> {
  return getPublicCollection<PublicWork>("works", "works");
}

export async function getPublicWork(slug: string): Promise<PublicWork | null> {
  const baseUrl = getBackendUrl();
  if (!baseUrl) {
    throw new Error("The public content API URL is not configured.");
  }

  const response = await fetch(
    `${baseUrl}/api/public/works/${encodeURIComponent(slug)}`,
    { cache: "no-store", signal: AbortSignal.timeout(10_000) },
  );
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Unable to load this work (${response.status}).`);
  }
  const payload = (await response.json()) as { work?: PublicWork };
  if (!payload.work) throw new Error("The public work response is invalid.");
  return payload.work;
}

export function getPublicPosts(): Promise<PublicPost[]> {
  return getPublicCollection<PublicPost>("posts", "posts");
}

export async function getPublicPost(slug: string): Promise<PublicPost | null> {
  const baseUrl = getBackendUrl();
  if (!baseUrl) {
    throw new Error("The public content API URL is not configured.");
  }

  const response = await fetch(
    `${baseUrl}/api/public/posts/${encodeURIComponent(slug)}`,
    { cache: "no-store", signal: AbortSignal.timeout(10_000) },
  );
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Unable to load this post (${response.status}).`);
  }
  const payload = (await response.json()) as { post?: PublicPost };
  if (!payload.post) throw new Error("The public post response is invalid.");
  return payload.post;
}
