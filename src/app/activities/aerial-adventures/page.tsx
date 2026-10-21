import type { Metadata } from "next";
import { ActivityCategoryPage } from "@/components/activity-category";
import { getActivityCategory } from "@/lib/content/activities";

const category = getActivityCategory("aerial-adventures");

export const metadata: Metadata = {
  title: category.title,
  description: category.blurb,
};

export default function AerialAdventuresPage() {
  return <ActivityCategoryPage category={category} />;
}
