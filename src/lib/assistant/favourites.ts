/**
 * Guest favourites — the curated "most loved" shortlist used by the AI assistant.
 *
 * The website does not collect star ratings, so these are hand-picked by The
 * Shrub Lodge team and the assistant always describes them as "guest
 * favourites" — never as invented ratings or review scores.
 *
 * Edit this list freely: reorder for priority, add or remove entries. Every
 * `activity` value must match an activity name in lib/content/activities.ts so
 * the assistant can quote the live price and booking link.
 */
export type Favourite = {
  /** Exact activity name from lib/content/activities.ts */
  activity: string;
  /** Category slug from lib/content/activities.ts */
  categorySlug: string;
  /** One short line explaining why guests love it (shown by the assistant). */
  why: string;
  /** Optional audience tags used for matching guest interests. */
  tags: string[];
};

export const guestFavourites: Favourite[] = [
  {
    activity: "Guided Tour of the Falls – Zimbabwe",
    categorySlug: "victoria-falls-scenic",
    why: "the classic first thing to do in Victoria Falls, with the most panoramic viewpoints and a local guide's stories about the Falls",
    tags: ["falls", "sightseeing", "family", "first-time", "easy", "half day"],
  },
  {
    activity: "Standard Sunset Cruise",
    categorySlug: "cruises-river",
    why: "a relaxed, great-value Zambezi sunset with drinks and wildlife along the riverbank",
    tags: ["cruise", "sunset", "romantic", "relaxing", "family", "value", "evening"],
  },
  {
    activity: "Helicopter Ride 13–15 min",
    categorySlug: "aerial-adventures",
    why: "the famous 'Flight of Angels' — an unforgettable view of the whole Falls from above in only 15 minutes",
    tags: ["helicopter", "aerial", "views", "thrill", "photo", "must-do"],
  },
  {
    activity: "Hwange Full Day Trip",
    categorySlug: "safari-wildlife-nature",
    why: "Zimbabwe's largest and most diverse park, with excellent chances of elephants, lions and buffalo",
    tags: ["safari", "wildlife", "full day", "big five", "nature", "elephants"],
  },
  {
    activity: "Elephant Experience",
    categorySlug: "animal-encounters",
    why: "a close, educational and conservation-focused encounter that guests of all ages remember",
    tags: ["animals", "wildlife", "family", "kids", "conservation", "easy"],
  },
  {
    activity: "Bungee Jumping",
    categorySlug: "adventure-adrenaline",
    why: "one of the world's highest commercial bungee jumps, off the legendary Victoria Falls Bridge",
    tags: ["adrenaline", "thrill", "adventure", "extreme", "bucket list"],
  },
  {
    activity: "Ra-Ikane Luxury Cruise",
    categorySlug: "cruises-river",
    why: "an intimate, elegant teak riverboat cruise with premium refreshments and superb wildlife viewing",
    tags: ["cruise", "luxury", "romantic", "couples", "sunset", "premium"],
  },
  {
    activity: "Devils Pool Morning Breeze",
    categorySlug: "victoria-falls-scenic",
    why: "a once-in-a-lifetime swim right at the edge of Victoria Falls, with cooler morning conditions",
    tags: ["falls", "swim", "bucket list", "unique", "adventure", "seasonal"],
  },
];
