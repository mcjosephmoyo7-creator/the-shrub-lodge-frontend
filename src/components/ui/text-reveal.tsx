"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  stagger?: number;
  delay?: number;
  type?: "chars" | "words" | "lines";
}

export function TextReveal({
  children,
  className,
  as: Component = "div",
  stagger = 0.02,
  delay = 0,
  type = "words",
}: TextRevealProps) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const split = new SplitText(element, {
      type,
      linesClass: "overflow-hidden",
      wordsClass: "inline-block",
      charsClass: "inline-block",
    });

    const targets =
      type === "chars" ? split.chars : type === "words" ? split.words : split.lines;

    gsap.set(targets, { y: 100, opacity: 0, rotateX: -20 });

    gsap.to(targets, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger,
      delay,
      ease: "power3.out",
    });

    return () => {
      split.revert();
    };
  }, [children, type, stagger, delay]);

  return (
    <Component ref={elementRef as any} className={cn(className)}>
      {children}
    </Component>
  );
}
