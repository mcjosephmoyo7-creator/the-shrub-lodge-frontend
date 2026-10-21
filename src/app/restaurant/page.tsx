import type { Metadata } from "next";
import Image from "next/image";
import { Utensils, Clock, Users, Award, Wine } from "lucide-react";
import { Hero } from "@/components/hero";
import { CtaBanner } from "@/components/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { IMAGES, wix } from "@/lib/images";
import {
  beverageHighlights,
  foodHighlights,
  restaurantIntro,
} from "@/lib/content/restaurant";

export const metadata: Metadata = {
  title: "The Shrub Restaurant | Dining & Beverages in Victoria Falls",
  description:
    "Fresh, local and seasonal dishes at The Shrub Lodge Restaurant in Victoria Falls. Enjoy gourmet meals, signature beverages, fine wines, and heartfelt hospitality.",
};

// Hospitality & Restaurant Team
const hospitalityHighlights = [
  {
    title: "Master Culinary Craftsmanship",
    description: "Our dedicated executive chef brings decades of culinary passion, combining authentic Zimbabwean flavors with modern culinary art.",
    image: IMAGES.staffChef,
    alt: "Executive chef preparing fine dishes at The Shrub Lodge",
  },
  {
    title: "Warm, Attentive Table Service",
    description: "From morning breakfast to candlelit dinner, our dining team ensures every request is met with a warm smile and genuine Zimbabwean warmth.",
    image: IMAGES.staffWaiter,
    alt: "Friendly restaurant staff serving guests with care",
  },
  {
    title: "Inviting Dining Ambiance",
    description: "Relax in our comfortable restaurant hall, designed for intimate romantic dinners, family gatherings, and relaxed safari evenings.",
    image: IMAGES.restaurantTable,
    alt: "Elegantly prepared tables in The Shrub Lodge restaurant",
  },
];

export default function RestaurantPage() {
  return (
    <>
      <Hero
        eyebrow="The Shrub Lodge Restaurant"
        title="Fresh, Local and Seasonal"
        subtitle="Savor delicious local gastronomy, refreshing beverages, and the genuine warmth of our hospitality staff in Victoria Falls."
        image={IMAGES.restaurantHero}
      />

      {/* Overview & Menu Callout */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={restaurantIntro.eyebrow}
              title={restaurantIntro.title}
              intro={restaurantIntro.intro}
            />
            <p className="mt-4 text-base leading-relaxed text-forest-800/80">
              {restaurantIntro.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink
                href={restaurantIntro.menuHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full PDF Menu
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Book a Table
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-sand-200 shadow-xl">
              <Image
                src={wix(IMAGES.restaurantDish, 4 / 3)}
                alt="Signature plated dish at The Shrub Restaurant"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-forest-950/80 px-4 py-2 text-xs font-medium text-sand-50 backdrop-blur-md">
                Chef's Signature Plated Meal
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Food Section: Popular Meals & Dishes */}
      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Freshly Prepared"
              title="Food Specialties & Popular Meals"
              intro="A taste of the dishes our guests love most — from hearty breakfasts to flame-grilled meats and vegetarian delights."
            />
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {foodHighlights.map((dish, index) => (
              <Reveal key={dish.name} delay={index * 60}>
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={wix(dish.image, 16 / 10)}
                      alt={dish.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-forest-950/80 px-3 py-1 text-[0.7rem] font-semibold tracking-wider text-gold-300 backdrop-blur-sm">
                      {dish.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl text-forest-950">
                      {dish.name}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-forest-800/75">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Beverages Section: Drinks, Cocktails & Cellar */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Bar & Cellar"
              title="Beverages, Cocktails & Refreshments"
              intro="Quench your thirst with our hand-crafted cocktails, regional wines, fresh smoothies, and aromatic African coffees."
            />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beverageHighlights.map((beverage, index) => {
              const Icon = beverage.icon;
              return (
                <Reveal key={beverage.name} delay={index * 70}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-sand-50/50 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={wix(beverage.image, 1)}
                        alt={beverage.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute right-3 top-3 rounded-full bg-forest-900/85 p-2 text-gold-300 backdrop-blur-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-600">
                        {beverage.tag}
                      </span>
                      <h3 className="mt-1 font-display text-lg text-forest-950">
                        {beverage.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-forest-800/75">
                        {beverage.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Restaurant Staff & Hospitality Section */}
      <section className="bg-forest-950 py-20 text-sand-100 sm:py-24">
        <Container className="flex flex-col gap-14">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
                Hospitality & Service
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl text-sand-50">
                Meet Our Restaurant Team
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-sand-100/75">
                Our kitchen chefs, baristas, and dining staff are passionate about providing attentive, personalized service to make every breakfast, lunch, and dinner memorable.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {hospitalityHighlights.map((staff, idx) => (
              <Reveal key={staff.title} delay={idx * 90}>
                <div className="flex flex-col overflow-hidden rounded-3xl border border-forest-800 bg-forest-900/60 shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={wix(staff.image, 4 / 3)}
                      alt={staff.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-sand-50">
                      {staff.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sand-100/70">
                      {staff.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Dining Service Schedule Banner */}
          <Reveal delay={200}>
            <div className="rounded-3xl border border-forest-800/80 bg-forest-900/40 p-8 backdrop-blur sm:p-10">
              <div className="grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-forest-800">
                <div className="flex items-start gap-4 sm:pr-6">
                  <Clock className="h-6 w-6 shrink-0 text-gold-400" />
                  <div>
                    <h4 className="font-display text-base text-sand-50">Breakfast</h4>
                    <p className="mt-1 text-xs text-sand-100/70">6:30 am – 10:00 am</p>
                    <p className="text-xs text-sand-100/50">Early breakfast packs for safari tours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:px-6">
                  <Utensils className="h-6 w-6 shrink-0 text-gold-400" />
                  <div>
                    <h4 className="font-display text-base text-sand-50">Lunch & Light Bites</h4>
                    <p className="mt-1 text-xs text-sand-100/70">12:00 pm – 3:00 pm</p>
                    <p className="text-xs text-sand-100/50">Poolside dining & fresh salads</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:pl-6">
                  <Wine className="h-6 w-6 shrink-0 text-gold-400" />
                  <div>
                    <h4 className="font-display text-base text-sand-50">Dinner & Cocktails</h4>
                    <p className="mt-1 text-xs text-sand-100/70">6:30 pm – 9:30 pm</p>
                    <p className="text-xs text-sand-100/50">Multi-course dining under the stars</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Reservation CTA */}
      <CtaBanner
        eyebrow="Dine With Us"
        title="Reserve Your Table at The Shrub Restaurant"
        intro="Whether you are staying at the lodge or visiting Victoria Falls, our doors and kitchen are warmly open to you."
      />
    </>
  );
}
