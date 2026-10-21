import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { OverviewCard } from "@/components/overview-card";
import { CtaBanner } from "@/components/cta-banner";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { IMAGES } from "@/lib/images";
import {
  activityOverview,
  activitiesIntro,
  satisfactionGuarantee,
} from "@/lib/content/activities";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Tailored activities and experiences in Victoria Falls — game drives, Zambezi cruises, adventure sports, cultural tours and more with The Shrub Lodge.",
};

export default function ActivitiesPage() {
  return (
    <>
      <Hero
        eyebrow="Activities"
        title="Experience Adventure with The Shrub Lodge"
        subtitle={activitiesIntro}
        image={IMAGES.vicFalls}
      />

      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="flex flex-col gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Carefully Curated"
              title="Carefully Curated Experiences"
              intro="Choose from eight categories of hand-picked experiences, each arranged by our team so you can focus on the memories."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activityOverview.map((card, index) => (
              <Reveal key={card.href} delay={(index % 3) * 80}>
                <OverviewCard card={card} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest-950 py-20 text-sand-50 sm:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Peace of mind"
              title="Satisfaction Guarantee"
              intro={satisfactionGuarantee}
            />
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
