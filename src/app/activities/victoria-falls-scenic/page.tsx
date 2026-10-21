import type { Metadata } from "next";
import { ActivityCategoryPage } from "@/components/activity-category";
import { getActivityCategory } from "@/lib/content/activities";

const category = getActivityCategory("victoria-falls-scenic");

export const metadata: Metadata = {
  title: category.title,
  description: category.blurb,
};

export default function VictoriaFallsScenicPage() {
  return <ActivityCategoryPage category={category} />;
}
