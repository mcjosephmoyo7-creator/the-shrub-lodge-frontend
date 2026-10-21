import type { Metadata } from "next";
import { ActivityCategoryPage } from "@/components/activity-category";
import { getActivityCategory } from "@/lib/content/activities";

const category = getActivityCategory("animal-encounters");

export const metadata: Metadata = {
  title: category.title,
  description: category.blurb,
};

export default function AnimalEncountersPage() {
  return <ActivityCategoryPage category={category} />;
}
