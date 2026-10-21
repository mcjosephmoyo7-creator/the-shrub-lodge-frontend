import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function Logo({
  className,
  tone = "light",
  variant = "full",
}: {
  className?: string;
  tone?: "light" | "dark";
  /**
   * "full" is the logo with the wordmark beside it. "mark" is the logo image
   * on its own, sized up — used in the site header like other lodges do.
   */
  variant?: "full" | "mark";
}) {
  const markOnly = variant === "mark";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border p-1 transition-all duration-300 group-hover:scale-105",
          markOnly ? "h-14 w-14" : "h-11 w-11",
          tone === "light"
            ? "border-gold-400/50 bg-forest-900/40 shadow-sm shadow-black/20"
            : "border-forest-900/20 bg-sand-100/80 shadow-sm",
        )}
      >
        <Image
          src="/images/logo.png"
          alt="The Shrub Lodge logo"
          width={48}
          height={48}
          priority
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
          The Shrub Lodge
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
