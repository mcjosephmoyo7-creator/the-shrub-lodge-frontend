"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  start?: string;
  end?: string;
}

export function ScaleOnScroll({
  children,
  className,
  start = "top 80%",
  end = "bottom 40%",
}: ScaleOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    gsap.fromTo(
      container,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub: 1,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [start, end]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
