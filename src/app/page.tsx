import Image from "next/image";
import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { RoomCard } from "@/components/room-card";
import { AutoGallery } from "@/components/auto-gallery";
import { AmenitiesGrid } from "@/components/amenities-grid";
import { TestimonialSection } from "@/components/testimonial";
import { CtaBanner } from "@/components/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { IMAGES, wix } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { features, testimonials } from "@/lib/content/features";
import { rooms } from "@/lib/content/rooms";
import { amenities, amenitiesIntro } from "@/lib/content/amenities";


// Rotating hero: opens on Victoria Falls (Mosi-oa-Tunya) then cycles through
// the lodge's signature activities — scenic Falls, safari, cruises, flights,
// adrenaline, wildlife and culture.
const heroImages = [
  IMAGES.vicFalls, // Victoria Falls — "Mosi-oa-Tunya"
  IMAGES.heroFallsPortrait,
  IMAGES.safari,
  IMAGES.cruises,
  IMAGES.aerial,
  IMAGES.adrenaline,
  IMAGES.animals,
  IMAGES.cultural,
  IMAGES.heroFallsTall,
];

// The gallery gathers every lodge and adventure photograph from
// theshrublodge.com's "Comfort Inside, Adventure Outside" area — comfort shots
// (rooms, pool, garden, dining terrace) alongside adventure shots (the Falls) —
// with no repeats, plus the four photos from the site's
// "Explore With The Shrub Lodge" section.
const comfortAdventurePhotos = [
  IMAGES.lodgePool,
  IMAGES.lodgeExterior,
  IMAGES.lodgeGarden,
  IMAGES.lodgeInterior,
  IMAGES.comfortAdventure1,
  IMAGES.comfortAdventure2,
  IMAGES.comfortAdventure3,
  IMAGES.chobeOvernight,
  IMAGES.roomSingle,
  IMAGES.roomDouble,
  IMAGES.roomTwin,
  IMAGES.restaurantPoolside,
  IMAGES.heroFalls,
  IMAGES.heroFallsTall,
  IMAGES.heroFallsPortrait,
  IMAGES.explore1,
  IMAGES.explore2,
  IMAGES.explore3,
  IMAGES.explore4,
];

const lodgeMoments = [
  {
    title: "A warm welcome",
    image: IMAGES.lodgeExterior,
    alt: "The Shrub Lodge exterior surrounded by greenery",
  },
  {
    title: "Room to unwind",
    image: IMAGES.roomDetail1,
    alt: "A thoughtfully prepared room at The Shrub Lodge",
  },
  {
    title: "The wonder of the Falls",
    image: IMAGES.vicFalls,
    alt: "Victoria Falls, one of the adventures near The Shrub Lodge",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        size="full"
        eyebrow="Victoria Falls · Zimbabwe"
        title="More Than a Stay — Your Zimbabwe Story Begins Here"
        subtitle="Your gateway to an unforgettable adventure in the heart of Zimbabwe."
        image={IMAGES.heroFalls}
        images={heroImages}
        interval={5000}
      >
        <ButtonLink href={siteConfig.bookingHref}>Book Now</ButtonLink>
        <ButtonLink
          href="/activities"
          variant="ghost"
          className="border border-white/25 text-sand-50 hover:bg-white/10"
        >
          Explore Activities
        </ButtonLink>
      </Hero>

      {/* Features */}
      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="flex flex-col gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Features"
              title="Comfort, Convenience, Adventure. All in One Place"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 90}>
                <FeatureCard feature={feature} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* About teaser */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title="Meet The Heart Behind The Shrub"
              intro="More than a stay. A feeling of warmth, wonder, and belonging that’s The Shrub Lodge. Nestled in the quiet suburbs of Victoria Falls, our family-run 3-star lodge blends relaxed luxury with heartfelt hospitality, creating a soulful escape for those who seek both comfort and adventure."
            />
            <ButtonLink href="/about" variant="outline" className="mt-8">
              Read More
            </ButtonLink>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src={wix(IMAGES.lodgeExterior, 4 / 5)}
                alt="The Shrub Lodge"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Rooms */}
      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="flex flex-col gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Rooms"
              title="Luxury Stays For Your Comfort"
              intro="Whether you're a solo adventurer or a family on a bucket-list safari, The Shrub Lodge offers a sophisticated sanctuary in the heart of Victoria Falls. Our rooms are more than just a place to sleep, they are designed to be your personal retreat, providing a seamless blend of modern luxury and relaxation."
            />
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, index) => (
              <Reveal key={room.name} delay={index * 90}>
                <RoomCard room={room} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Amenities */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our Amenities"
              title="Everything you need to settle in"
              intro={amenitiesIntro}
            />
            <div className="mt-8 relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lg">
              <Image
                src={wix(IMAGES.lodgePool, 4 / 3)}
                alt="Pool at The Shrub Lodge"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AmenitiesGrid items={amenities} />
          </Reveal>
        </Container>
      </section>

      {/* Photo moments */}
      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="A little look around"
              title="Find your moment at The Shrub"
              intro="From a warm welcome and restful rooms to the wonders just beyond the lodge, take a closer look at your Victoria Falls escape."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lodgeMoments.map((moment, index) => (
              <Reveal key={moment.title} delay={index * 75}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest-900 shadow-md">
                  <Image
                    src={wix(moment.image, 4 / 5)}
                    alt={moment.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-2xl text-sand-50">
                    {moment.title}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Comfort Inside, Adventure Outside */}
      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="flex flex-col gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Explore"
              title="Comfort Inside, Adventure Outside"
              intro="Your stay at The Shrub Lodge is more than just luxury accommodation, it's the gateway to unforgettable adventures. From guided tours of Victoria Falls and serene Zambezi River cruises, to thrilling safaris, cultural village visits, white-water rafting, and fishing trips, every experience is designed to showcase the very best of Zimbabwe."
            />
          </Reveal>
          <AutoGallery photos={comfortAdventurePhotos} />
        </Container>
      </section>

      <TestimonialSection items={testimonials} />

      {/* Explore */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src={wix(IMAGES.vicFalls, 4 / 3)}
                alt="Victoria Falls — Mosi-oa-Tunya, ‘the smoke that thunders’"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              align="left"
              eyebrow="Adventure"
              title="Explore With The Shrub Lodge"
              intro="Your stay at The Shrub Lodge is more than just luxury accommodation, it’s the gateway to unforgettable adventures. From guided tours of Victoria Falls and serene Zambezi River cruises, to thrilling safaris, cultural village visits, white-water rafting, and fishing trips, every experience is designed to showcase the very best of Zimbabwe."
            />
            <ButtonLink href="/activities" className="mt-8">
              Discover More
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* Dining */}
      <section className="bg-forest-900 py-20 text-sand-50 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Dine with us"
              title="The Shrub Restaurant"
              intro="The Shrub Lodge menu features a selection of carefully crafted dishes, highlighting fresh, local ingredients and flavors. Perfect for a satisfying meal after a day of adventure or relaxation."
            />
            <ButtonLink href="/restaurant" className="mt-8">
              Explore the Restaurant
            </ButtonLink>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src={wix(IMAGES.restaurantHero, 4 / 3)}
                alt="Dining at The Shrub Restaurant"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
