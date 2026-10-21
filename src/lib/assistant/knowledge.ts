import {
  activityCategories,
  activitiesIntro,
  satisfactionGuarantee,
  type Activity,
  type ActivityCategory,
} from "@/lib/content/activities";
import { amenities, amenitiesIntro } from "@/lib/content/amenities";
import { features, testimonials } from "@/lib/content/features";
import { rooms } from "@/lib/content/rooms";
import { transfers } from "@/lib/content/transfers";
import {
  beverageHighlights,
  foodHighlights,
  restaurantIntro,
} from "@/lib/content/restaurant";
import { siteConfig } from "@/lib/site";
import { guestFavourites, type Favourite } from "@/lib/assistant/favourites";

export type ActivityWithCategory = Activity & {
  categoryTitle: string;
  categorySlug: string;
};

/** Every activity on the website, flattened, with its category attached. */
export const allActivities: ActivityWithCategory[] = activityCategories.flatMap(
  (category) =>
    category.items.map((item) => ({
      ...item,
      categoryTitle: category.title,
      categorySlug: category.slug,
    })),
);

export function findActivity(name: string): ActivityWithCategory | undefined {
  const target = name.trim().toLowerCase();
  return (
    allActivities.find((item) => item.name.toLowerCase() === target) ??
    allActivities.find((item) => item.name.toLowerCase().includes(target))
  );
}

/** Resolved favourites: the curated list joined with live activity data. */
export type ResolvedFavourite = Favourite & {
  price: number;
  description: string;
  bookingUrl: string;
  categoryTitle: string;
  activityHref: string;
  categoryHref: string;
};

export const resolvedFavourites: ResolvedFavourite[] = guestFavourites.flatMap(
  (favourite) => {
    const match = findActivity(favourite.activity);
    if (!match) return [];
    return [
      {
        ...favourite,
        price: match.price,
        description: match.description,
        bookingUrl: match.bookingUrl,
        categoryTitle: match.categoryTitle,
        activityHref: `/activities/${match.categorySlug}`,
        categoryHref: `/activities/${match.categorySlug}`,
      },
    ];
  },
);

export const CONTACT_FALLBACK =
  `email ${siteConfig.email.reservations} or ${siteConfig.email.tours}, ` +
  `call/WhatsApp ${siteConfig.phoneDisplay.reservations} (reservations) or ` +
  `${siteConfig.phoneDisplay.reception} (reception), or use the Contact page at ${siteConfig.url}/contact`;

/**
 * A single, plain-text knowledge document built entirely from the website's own
 * content. The assistant is instructed to answer *only* from this text, which is
 * what keeps it accurate and stops it inventing prices, dates or availability.
 */
export function buildKnowledgeDocument(): string {
  const lines: string[] = [];
  const push = (...values: string[]) => lines.push(...values);

  push(
    "# ABOUT THE SHRUB LODGE",
    `${siteConfig.name} — ${siteConfig.tagline}. ${siteConfig.description}`,
    `Address: ${siteConfig.address.full}.`,
    `Front desk hours: ${siteConfig.hours.frontDesk}. Check-in: ${siteConfig.hours.checkIn}. Check-out: ${siteConfig.hours.checkOut}.`,
    `Reservations phone/WhatsApp: ${siteConfig.phoneDisplay.reservations}. Reception phone: ${siteConfig.phoneDisplay.reception}.`,
    `Emails: reservations ${siteConfig.email.reservations}; tours/activities ${siteConfig.email.tours}.`,
    `Website: ${siteConfig.url}. Online booking (rooms): ${siteConfig.bookingHref}.`,
    "",
    "## Why guests choose the lodge",
    ...features.map((feature) => `- ${feature.title}: ${feature.description}`),
    "",
    "## Rooms & rates (USD, per night, as listed on the website)",
    ...rooms.map((room) => `- ${room.name} — US$${room.price}: ${room.description}`),
    "",
    "## In-room & lodge amenities",
    `${amenitiesIntro} Included: ${amenities.map((item) => item.label).join(", ")}.`,
    "",
    "## Restaurant (The Shrub Restaurant)",
    `${restaurantIntro.intro} ${restaurantIntro.body}`,
    `Full PDF menu: ${siteConfig.url}${restaurantIntro.menuHref}`,
    "Popular dishes:",
    ...foodHighlights.map((dish) => `- ${dish.name} (${dish.category}): ${dish.description}`),
    "Drinks:",
    ...beverageHighlights.map((drink) => `- ${drink.name} (${drink.tag}): ${drink.description}`),
    "",
  );

  push(
    "# ACTIVITIES",
    activitiesIntro,
    satisfactionGuarantee,
    "",
    "## Guest favourites (the lodge's curated 'most loved' shortlist — NOT star ratings)",
    "If a guest is unsure what to do, recommend up to three of these, in this order:",
    ...resolvedFavourites.map(
      (favourite, index) =>
        `${index + 1}. ${favourite.activity} (US$${favourite.price}) — ${favourite.why}. Category: ${favourite.categoryTitle}.`,
    ),
    "Never claim a numeric rating or review score for any activity. These are simply guest favourites.",
    "",
  );

  for (const category of activityCategories as ActivityCategory[]) {
    push(`## Category: ${category.title}`);
    push(category.blurb);
    for (const item of category.items) {
      push(
        `- ${item.name} | Price: US$${item.price} per person | Page: ${siteConfig.url}/activities/${category.slug} | Book: ${item.bookingUrl}`,
        `  ${item.description}`,
      );
    }
    push("");
  }

  push(
    "# TRANSFERS & LOGISTICS",
    `${transfers.title}: ${transfers.description}`,
  );
  for (const group of transfers.groups) {
    push(`## ${group.title}`);
    push(...group.items.map((item) => `- ${item.name}: US$${item.price}`));
  }
  push("");

  push(
    "# GUEST REVIEW THEMES (real guest comments shown on the website)",
    "Guests most often praise: cleanliness, friendly and helpful staff, comfortable and modern rooms, good breakfast, the outdoor pool, reliable Wi-Fi, and the team arranging transport and daily activities.",
    ...testimonials.slice(0, 6).map((item) => `- "${item.quote}" — ${item.author}`),
    "",
    "# THINGS THE WEBSITE DOES NOT STATE (so you must not guess)",
    "- Real-time availability, dates, seasons when an activity runs, or whether a slot is free.",
    "- Exact pickup times, durations in hours, minimum ages, or health/weight restrictions.",
    "- Prices outside the USD figures listed above; prices may change and should be confirmed at booking.",
    "- Any rating, award or review score that is not written in this document.",
  );

  return lines.join("\n");
}

export const knowledgeDocument = buildKnowledgeDocument();
