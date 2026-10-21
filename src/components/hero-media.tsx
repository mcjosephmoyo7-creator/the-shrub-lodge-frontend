"use client";

import { useEffect, useState } from "react";
import { HeroPicture } from "@/components/hero-picture";
import { cn } from "@/lib/utils";

/**
 * Cross-fading background slideshow for the page hero. Images swap slowly
 * (default 5s) so the hero eases through the lodge's signature shots, matching
 * the rotating hero on theshrublodge.com. Each slide is art-directed so it
 * fills the hero shape nicely on phones, tablets and desktop alike.
 */
export function HeroMedia({
  images,
  interval = 5000,
  priority = true,
  variant = "full",
}: {
  images: string[];
  interval?: number;
  priority?: boolean;
  variant?: "full" | "page";
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [images.length, interval]);

  return (
    <>
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          aria-hidden={index !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            index === active ? "opacity-100" : "opacity-0",
          )}
        >
          <HeroPicture
            image={image}
            variant={variant}
            priority={priority && index === 0}
          />
        </div>
      ))}
    </>
  );
}
