import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function Logo({
  className,
  tone = "light",
  variant = "full",
  siteName = siteConfig.name,
  logoUrl = "",
}: {
  className?: string;
  tone?: "light" | "dark";
  siteName?: string;
  logoUrl?: string;
  /**
   * "full" is the logo with the wordmark beside it. "mark" is the logo image
   * on its own, sized up — used in the site header like other lodges do.
   */
  variant?: "full" | "mark";
}) {
  const markOnly = variant === "mark";
  const isDefaultLogo = !logoUrl || logoUrl === "/images/logo.png";
  const imageSrc =
    tone === "light" && isDefaultLogo
      ? "/images/logo-light.png"
      : logoUrl || "/images/logo.png";

  return (
    <Link
      href="/"
      aria-label={`${siteName} home`}
      className={cn("flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center",
          markOnly ? "h-11 w-11 lg:h-14 lg:w-14" : "h-11 w-11",
        )}
      >
        <Image
          src={imageSrc}
          alt={`${siteName} logo`}
          width={48}
          height={48}
          priority
          unoptimized={Boolean(logoUrl)}
          className="h-full w-full object-contain"
        />
      </span>
      <span className={cn("flex flex-col leading-none", markOnly && "hidden")}>
        <span
          className={cn(
            "font-display text-lg tracking-wide transition-colors duration-300",
            tone === "light" ? "text-sand-50" : "text-forest-950",
          )}
        >
          {siteName}
        </span>
        <span
          className={cn(
            "mt-1 text-[0.625rem] font-medium uppercase tracking-[0.28em] transition-colors duration-300",
            tone === "light" ? "text-sand-100/70" : "text-forest-700/80",
          )}
        >
          Victoria Falls
        </span>
      </span>
    </Link>
  );
}
