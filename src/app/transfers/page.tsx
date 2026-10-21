import type { Metadata } from "next";
import { Car } from "lucide-react";
import { Hero } from "@/components/hero";
import { CtaBanner } from "@/components/cta-banner";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { IMAGES } from "@/lib/images";
import { transfers } from "@/lib/content/transfers";

export const metadata: Metadata = {
  title: transfers.title,
  description: transfers.description,
};

export default function TransfersPage() {
  return (
    <>
      <Hero
        eyebrow="Activities"
        title={transfers.title}
        subtitle={transfers.description}
        image={IMAGES.transfersHero}
      />

      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="grid gap-8 md:grid-cols-2">
          {transfers.groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 90}>
              <div className="h-full rounded-3xl border border-sand-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-900 text-gold-300">
                    <Car className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h2 className="font-display text-2xl text-forest-900">
                    {group.title}
                  </h2>
                </div>
                <ul className="mt-6 flex flex-col divide-y divide-sand-200">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-4 py-3.5"
                    >
                      <span className="text-forest-800/80">{item.name}</span>
                      <span className="font-semibold text-forest-900">
                        ${item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <CtaBanner
        eyebrow="Getting around"
        title="Need a transfer arranged?"
        intro="Send us your arrival details and we will arrange a smooth, stress-free transfer."
      />
    </>
  );
}
