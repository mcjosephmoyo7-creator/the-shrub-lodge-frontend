"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "blur";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  start?: string;
}

const animations: Record<AnimationType, gsap.TweenVars> = {
  "fade-up": { y: 60, opacity: 0 },
  "fade-down": { y: -60, opacity: 0 },
  "fade-left": { x: 60, opacity: 0 },
  "fade-right": { x: -60, opacity: 0 },
  scale: { scale: 0.9, opacity: 0 },
  blur: { filter: "blur(10px)", opacity: 0 },
};

export function GsapReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  triggerOnce = true,
  start = "top 85%",
}: GsapRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1, filter: "none" });
      return;
    }

    const fromVars = animations[animation];
    gsap.set(element, fromVars);

    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "none",
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: triggerOnce ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, duration, start, triggerOnce]);

  return (
    <div ref={elementRef} className={cn(className)}>
      {children}
    </div>
  );
}
