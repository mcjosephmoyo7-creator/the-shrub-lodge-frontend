import type { Metadata } from "next";
import { ActivityCategoryPage } from "@/components/activity-category";
import { getActivityCategory } from "@/lib/content/activities";

const category = getActivityCategory("cruises-river");

export const metadata: Metadata = {
  title: category.title,
  description: category.blurb,
};

export default function CruisesRiverPage() {
  return <ActivityCategoryPage category={category} />;
}
