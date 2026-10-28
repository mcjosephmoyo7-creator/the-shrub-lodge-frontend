import { featureIcons } from "@/components/icons";
import type { Feature } from "@/lib/content/features";

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = featureIcons[feature.icon];

  return (
    <div className="group flex h-full flex-col gap-5 rounded-3xl border border-sand-200 bg-white p-8 transition-all duration-500 hover:border-gold-400 hover:shadow-[0_30px_60px_-40px_rgba(30,47,36,0.8)] hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-900 text-gold-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <span className="font-display text-3xl text-sand-300 transition-colors duration-500 group-hover:text-gold-400">
          {feature.number}
        </span>
      </div>
      <h3 className="font-display text-2xl text-forest-900">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-forest-800/70">{feature.description}</p>
    </div>
  );
}
