import Image from "next/image";
import { siteConfig } from "@/lib/site";

/**
 * Site-wide loading state.
 *
 * Because this lives at the root of the App Router, Next.js wraps every route
 * in this loading boundary — any page navigation shows it until the new
 * route's content is ready. The header/footer (rendered by the root layout)
 * stay visible while the page body loads.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-[70vh] flex-col items-center justify-center bg-sand-50 px-6 py-24"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Spinning gold ring */}
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-sand-300" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold-500" />
        {/* Pulsing logo in the centre */}
        <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-gold-400/50 bg-forest-900 p-1.5 animate-fade-in">
          <Image
            src="/images/logo.png"
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
            className="h-full w-full object-contain"
            priority
          />
        </span>
      </div>

      <p className="mt-6 font-display text-xl tracking-wide text-forest-900">
        {siteConfig.name}
      </p>
      <p className="mt-2 text-[0.625rem] font-medium uppercase tracking-[0.3em] text-forest-700/70">
        Victoria Falls
      </p>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
