import { featureIcons } from "@/components/icons";
import type { Feature } from "@/lib/content/features";

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = featureIcons[feature.icon];

  return (
    <div className="group flex flex-col gap-5 rounded-3xl border border-sand-200 bg-white p-8 transition-colors hover:border-gold-300">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-900 text-gold-300">
          <Icon className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <span className="font-display text-3xl text-sand-300">
          {feature.number}
        </span>
      </div>
      <h3 className="font-display text-2xl text-forest-900">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-forest-800/70">{feature.description}</p>
    </div>
  );
}
