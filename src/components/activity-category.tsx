import { Hero } from "@/components/hero";
import { ActivityCard } from "@/components/activity-card";
import { CtaBanner } from "@/components/cta-banner";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { ActivityCategory } from "@/lib/content/activities";

/** Shared layout for every activity detail page. */
export function ActivityCategoryPage({
  category,
}: {
  category: ActivityCategory;
}) {
  return (
    <>
      <Hero
        eyebrow="Activities"
        title={category.title}
        subtitle={category.intro ?? category.blurb}
        image={category.image}
      />

      <section className="bg-sand-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {category.items.map((activity, index) => (
              <Reveal key={activity.name} delay={(index % 3) * 80}>
                <ActivityCard activity={activity} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
