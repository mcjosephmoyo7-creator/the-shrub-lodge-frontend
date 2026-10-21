import Image from "next/image";
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
}: {
  tone?: "onDark" | "onLight";
  size?: number;
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {siteConfig.socialLinks.map((social) => {
        const icon = iconByTitle[social.title];
        if (!icon) return null;

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
            </a>
          </li>
        );
      })}
    </ul>
  );
}
