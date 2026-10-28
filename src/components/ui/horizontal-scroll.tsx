"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  start?: string;
  end?: string;
  scrub?: number;
}

export function HorizontalScroll({
  children,
  className,
  start = "top 60%",
  end = "bottom 30%",
  scrub = 1,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const getScrollAmount = () => {
      return -(track.scrollWidth - container.offsetWidth);
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [start, end, scrub]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max">
        {children}
      </div>
    </div>
  );
}
