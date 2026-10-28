import Image from "next/image";
import { HeroAnimated } from "@/components/hero-animated";
import { FeatureCard } from "@/components/feature-card";
import { RoomCard } from "@/components/room-card";
import { AutoGallery } from "@/components/auto-gallery";
import { AmenitiesGrid } from "@/components/amenities-grid";
import { TestimonialMarquee } from "@/components/testimonial-marquee";
import { CtaBanner } from "@/components/cta-banner";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GsapReveal } from "@/components/ui/gsap-reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ScaleOnScroll } from "@/components/ui/scale-on-scroll";
import { CardHoverReveal } from "@/components/ui/card-hover-reveal";
import { IMAGES, wix } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { features } from "@/lib/content/features";
import { getRooms } from "@/lib/api/rooms";
import { amenities, amenitiesIntro } from "@/lib/content/amenities";
import {
  getContentItems,
  getContentSection,
  getContentText,
  getPublicSiteData,
} from "@/lib/api/public-content";


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

export default async function HomePage() {
  const [rooms, site] = await Promise.all([getRooms(), getPublicSiteData()]);
  const hero = getContentSection(site, "hero");
  const about = getContentSection(site, "about");
  const serviceItems = getContentItems(site, "services", ["title", "description"]);
  const reviewItems = getContentItems(site, "testimonials", ["quote", "author"]);
  const publicFeatures = serviceItems.map((feature, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: feature.title,
    description: feature.description,
    icon: features[index % features.length]?.icon ?? "sparkles",
  }));

  return (
    <>
      <HeroAnimated
        size="full"
        eyebrow={getContentText(hero, "eyebrow", "Victoria Falls · Zimbabwe")}
        title={getContentText(
          hero,
          "title",
          "More Than a Stay — Your Zimbabwe Story Begins Here",
        )}
        subtitle={getContentText(
          hero,
          "subtitle",
          "Your gateway to an unforgettable adventure in the heart of Zimbabwe.",
        )}
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
      </HeroAnimated>

      {/* Features */}
      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="flex flex-col gap-14">
          <GsapReveal animation="fade-up">
            <SectionHeading
              eyebrow="Features"
              title="Comfort, Convenience, Adventure. All in One Place"
            />
          </GsapReveal>
          <StaggerReveal className="grid gap-6 md:grid-cols-3" stagger={0.12} itemClassName="h-full">
            {publicFeatures.map((feature) => (
              <CardHoverReveal key={feature.title} className="h-full">
                <FeatureCard feature={feature} />
              </CardHoverReveal>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* About teaser */}
      <section className="bg-white py-20 sm:py-24 overflow-hidden">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <GsapReveal animation="fade-right" className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title={getContentText(
                about,
                "teaserTitle",
                "Meet The Heart Behind The Shrub",
              )}
              intro={getContentText(
                about,
                "teaserBody",
                "More than a stay. A feeling of warmth, wonder, and belonging that’s The Shrub Lodge. Nestled in the quiet suburbs of Victoria Falls, our family-run 3-star lodge blends relaxed luxury with heartfelt hospitality, creating a soulful escape for those who seek both comfort and adventure.",
              )}
            />
            <ButtonLink href="/about" variant="outline" className="mt-8">
              Read More
            </ButtonLink>
          </GsapReveal>
          <GsapReveal animation="fade-left" className="order-1 lg:order-2">
            <ScaleOnScroll>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
                <ParallaxImage
                  src={wix(IMAGES.lodgeExterior, 4 / 5)}
                  alt="The Shrub Lodge"
                  className="h-full w-full"
                  speed={0.15}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </ScaleOnScroll>
          </GsapReveal>
        </Container>
      </section>

      {/* Rooms */}
      <section className="bg-sand-50 py-20 sm:py-24">
        <Container className="flex flex-col gap-14">
          <GsapReveal animation="fade-up">
            <SectionHeading
              eyebrow="Rooms"
              title="Luxury Stays For Your Comfort"
              intro="Whether you're a solo adventurer or a family on a bucket-list safari, The Shrub Lodge offers a sophisticated sanctuary in the heart of Victoria Falls. Our rooms are more than just a place to sleep, they are designed to be your personal retreat, providing a seamless blend of modern luxury and relaxation."
            />
          </GsapReveal>
          <StaggerReveal className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.15} itemClassName="h-full">
            {rooms.map((room) => (
              <CardHoverReveal key={room.name} className="h-full">
                <RoomCard room={room} />
              </CardHoverReveal>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* Amenities */}
      <section className="bg-white py-20 sm:py-24 overflow-hidden">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <GsapReveal animation="fade-right">
            <SectionHeading
              align="left"
              eyebrow="Our Amenities"
              title="Everything you need to settle in"
              intro={amenitiesIntro}
            />
            <ScaleOnScroll>
              <div className="mt-8 relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lg">
                <ParallaxImage
                  src={wix(IMAGES.lodgePool, 4 / 3)}
                  alt="Pool at The Shrub Lodge"
                  className="h-full w-full"
                  speed={0.12}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </ScaleOnScroll>
          </GsapReveal>
          <GsapReveal animation="fade-left" delay={0.2}>
            <AmenitiesGrid items={amenities} />
          </GsapReveal>
        </Container>
      </section>

      {/* Photo moments */}
      <section className="bg-sand-50 py-20 sm:py-24 overflow-hidden">
        <Container className="flex flex-col gap-12">
          <GsapReveal animation="fade-up">
            <SectionHeading
              eyebrow="A little look around"
              title="Find your moment at The Shrub"
              intro="From a warm welcome and restful rooms to the wonders just beyond the lodge, take a closer look at your Victoria Falls escape."
            />
          </GsapReveal>
          <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {lodgeMoments.map((moment) => (
              <CardHoverReveal key={moment.title}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest-900 shadow-md">
                  <ParallaxImage
                    src={wix(moment.image, 4 / 5)}
                    alt={moment.alt}
                    className="h-full w-full"
                    speed={0.1}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-2xl text-sand-50 transition-transform duration-700 group-hover:translate-y-[-4px]">
                    {moment.title}
                  </figcaption>
                </figure>
              </CardHoverReveal>
            ))}
          </StaggerReveal>
        </Container>
      </section>

      {/* Comfort Inside, Adventure Outside */}
      <section className="bg-sand-50 py-20 sm:py-24 overflow-hidden">
        <Container className="flex flex-col gap-14">
          <GsapReveal animation="fade-up">
            <SectionHeading
              eyebrow="Explore"
              title="Comfort Inside, Adventure Outside"
              intro="Your stay at The Shrub Lodge is more than just luxury accommodation, it's the gateway to unforgettable adventures. From guided tours of Victoria Falls and serene Zambezi River cruises, to thrilling safaris, cultural village visits, white-water rafting, and fishing trips, every experience is designed to showcase the very best of Zimbabwe."
            />
          </GsapReveal>
          <GsapReveal animation="fade-up" delay={0.15}>
            <AutoGallery photos={comfortAdventurePhotos} />
          </GsapReveal>
        </Container>
      </section>

      <TestimonialMarquee items={reviewItems} />

      {/* Explore */}
      <section className="bg-white py-20 sm:py-24 overflow-hidden">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <GsapReveal animation="fade-right">
            <ScaleOnScroll>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
                <ParallaxImage
                  src={wix(IMAGES.vicFalls, 4 / 3)}
                  alt="Victoria Falls — Mosi-oa-Tunya, ‘the smoke that thunders’"
                  className="h-full w-full"
                  speed={0.14}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </ScaleOnScroll>
          </GsapReveal>
          <GsapReveal animation="fade-left" delay={0.2}>
            <SectionHeading
              align="left"
              eyebrow="Adventure"
              title="Explore With The Shrub Lodge"
              intro="Your stay at The Shrub Lodge is more than just luxury accommodation, it’s the gateway to unforgettable adventures. From guided tours of Victoria Falls and serene Zambezi River cruises, to thrilling safaris, cultural village visits, white-water rafting, and fishing trips, every experience is designed to showcase the very best of Zimbabwe."
            />
            <ButtonLink href="/activities" className="mt-8">
              Discover More
            </ButtonLink>
          </GsapReveal>
        </Container>
      </section>

      {/* Dining */}
      <section className="bg-forest-900 py-20 text-sand-50 sm:py-24 overflow-hidden">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <GsapReveal animation="fade-right">
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
          </GsapReveal>
          <GsapReveal animation="fade-left" delay={0.2}>
            <ScaleOnScroll>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
                <ParallaxImage
                  src={wix(IMAGES.restaurantHero, 4 / 3)}
                  alt="Dining at The Shrub Restaurant"
                  className="h-full w-full"
                  speed={0.12}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </ScaleOnScroll>
          </GsapReveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
