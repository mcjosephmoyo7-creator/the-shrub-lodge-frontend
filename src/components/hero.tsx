import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { HeroMedia } from "@/components/hero-media";
import { HeroPicture } from "@/components/hero-picture";
import { cn } from "@/lib/utils";

export function Hero({
  image,
  images,
  interval,
  eyebrow,
  title,
  subtitle,
  size = "page",
  align = "left",
  priority = true,
  children,
  className,
}: {
  image: string;
  images?: string[];
  interval?: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  size?: "full" | "page";
  align?: "left" | "center";
  priority?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const slides = images && images.length > 1 ? images : null;

  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden bg-forest-950",
        size === "full"
          ? "min-h-[100vh] min-h-[100svh] lg:min-h-[100vh] [@supports(height:100svh)]:min-h-[100svh]"
          : "min-h-[58vh] md:min-h-[66vh] lg:min-h-[74vh]",
        className,
      )}
    >
      {slides ? (
        <HeroMedia
          images={slides}
          interval={interval}
          priority={priority}
          variant={size}
        />
      ) : (
        <div className="absolute inset-0">
          <HeroPicture image={image} variant={size} priority={priority} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/65 to-forest-950/45" />
      <Container className={cn("relative z-10", size === "full" ? "pt-28 pb-16 sm:pt-32 sm:pb-24" : "py-24 sm:py-32")}>
        <div
          className={cn(
            "flex flex-col gap-5",
            align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl",
          )}
        >
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-300">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="font-display text-4xl leading-[1.05] text-sand-50 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-lg leading-relaxed text-sand-100/85">
              {subtitle}
            </p>
          ) : null}
          {children ? (
            <div className="mt-2 flex flex-wrap items-center gap-4">{children}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
