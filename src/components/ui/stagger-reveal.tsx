"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stagger?: number;
  delay?: number;
  start?: string;
}

export function StaggerReveal({
  children,
  className,
  itemClassName,
  stagger = 0.1,
  delay = 0,
  start = "top 85%",
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      const items = container.querySelectorAll("[data-stagger-item]");
      items.forEach((item) => gsap.set(item, { opacity: 1, y: 0 }));
      return;
    }

    const items = container.querySelectorAll("[data-stagger-item]");
    gsap.set(items, { y: 40, opacity: 0 });

    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [stagger, delay, start]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} data-stagger-item className={itemClassName}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
