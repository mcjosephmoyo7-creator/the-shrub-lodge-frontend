"use client";

import { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TestimonialCard({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <article className="group relative flex h-full min-w-[320px] max-w-[380px] flex-col gap-6 overflow-hidden rounded-[2rem] border border-sand-100/20 bg-gradient-to-br from-white/5 to-white/0 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold-300/40 hover:shadow-[0_60px_120px_-60px_rgba(221,184,109,0.4)] sm:min-w-[380px]">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-300 transition-transform duration-500 group-hover:scale-110">
          <Quote className="h-6 w-6" />
        </span>
        <div className="flex items-center gap-1 text-gold-300">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </div>
      <blockquote className="relative text-lg leading-relaxed text-sand-50/90">
        {quote}
      </blockquote>
      <figcaption className="relative mt-auto text-sm font-semibold uppercase tracking-[0.24em] text-gold-300">
        {author}
      </figcaption>
    </article>
  );
}

export function TestimonialMarquee({
  items,
}: {
  items: { quote: string; author: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || items.length === 0) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const cards = track.querySelectorAll("[data-marquee-card]");
    if (cards.length === 0) return;

    const totalWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      duration: Math.max(20, items.length * 6),
      repeat: -1,
    });

    const handleEnter = () => tween.pause();
    const handleLeave = () => tween.resume();

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    gsap.fromTo(
      container,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      },
    );

    return () => {
      tween.kill();
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [items]);

  if (items.length === 0) return null;

  const duplicated = [...items, ...items];

  return (
    <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Guest reviews"
          title="Kind words from our guests"
          tone="light"
        />
      </Container>
      <div ref={containerRef} className="relative mt-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-forest-950 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-forest-950 to-transparent sm:w-40" />
        <div ref={trackRef} className="flex w-max gap-6 px-6 sm:gap-8 sm:px-10">
          {duplicated.map((item, index) => (
            <div key={`${item.author}-${index}`} data-marquee-card>
              <TestimonialCard quote={item.quote} author={item.author} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
