import Image from "next/image";
import { Globe2 } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconByTitle: Record<string, string> = {
  WhatsApp: IMAGES.socialWhatsApp,
  Instagram: IMAGES.socialInstagram,
  Facebook: IMAGES.socialFacebook,
  TikTok: IMAGES.socialTikTok,
};

/**
 * Renders the lodge's social brand marks. The source icons are dark glyphs on a
 * transparent background, so `tone` controls whether they are inverted for use
 * on dark (header/footer) or light surfaces.
 */
export function SocialLinks({
  tone = "onDark",
  size = 18,
  className,
  items = siteConfig.socialLinks,
}: {
  tone?: "onDark" | "onLight";
  size?: number;
  className?: string;
  items?: readonly { title: string; href: string }[];
}) {
  const visibleItems = new Map<string, { title: string; href: string }>(
    siteConfig.socialLinks.map((link) => [link.title.toLowerCase(), { ...link }]),
  );

  for (const link of items) {
    const title = link.title.trim();
    if (title) visibleItems.set(title.toLowerCase(), { title, href: link.href });
  }

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {Array.from(visibleItems.values()).map((social) => {
        const icon = iconByTitle[social.title];

        return (
          <li key={social.title}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.title}
              title={social.title}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105",
                tone === "onDark"
                  ? "border-white/20 bg-white/5 hover:bg-white/10"
                  : "border-forest-900/15 bg-forest-900/5 hover:bg-forest-900/10",
              )}
            >
              {icon ? (
                <Image
                  src={icon}
                  alt=""
                  width={size}
                  height={size}
                  style={{ width: size, height: size }}
                  className={cn(
                    "object-contain",
                    tone === "onDark" ? "invert" : "",
                  )}
                />
              ) : (
                <Globe2
                  aria-hidden="true"
                  className={tone === "onDark" ? "text-sand-50" : "text-forest-900"}
                  style={{ width: size, height: size }}
                />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
