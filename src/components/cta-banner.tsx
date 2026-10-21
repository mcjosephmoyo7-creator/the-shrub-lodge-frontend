import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export function CtaBanner({
  eyebrow = "Plan your stay",
  title = "Ready to experience Victoria Falls with The Shrub Lodge?",
  intro = "Tell us what you would love to do and our team will help craft the perfect Zimbabwe adventure.",
  primaryLabel = "Book Now",
  primaryHref = siteConfig.bookingHref,
  secondaryLabel = "Browse Activities",
  secondaryHref = "/activities",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-sand-50 py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest-900 px-8 py-14 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-300">
                {eyebrow}
              </span>
              <h2 className="font-display text-3xl leading-tight text-sand-50 sm:text-4xl">
                {title}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-sand-100/80">
                {intro}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-4">
                <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
                <ButtonLink href={secondaryHref} variant="ghost" className="border border-white/25 text-sand-50">
                  {secondaryLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
