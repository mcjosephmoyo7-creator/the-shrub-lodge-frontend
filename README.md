# The Shrub Lodge — Next.js Website

A clean, component-driven rebuild of **The Shrub Lodge** website (Victoria Falls,
Zimbabwe). The original was a static Wix.com export full of generated markup and
inline runtime scripts; this project replaces it with a maintainable Next.js
(App Router) application and **no raw HTML dumps** — every section is a typed
React component.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router, React Server Components) |
| Language | **TypeScript** for all app code, **JavaScript** for tooling/config (`next.config.mjs`, `tailwind.config.js`, `postcss.config.js`, `image-loader.js`) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + `@tailwindcss/typography` (legal pages) |
| Fonts | `next/font/google` — Playfair Display (display) + Inter (body) |
| Images | `next/image` with a **custom loader** that requests sized WebP renditions straight from the Wix media CDN |
| Icons | [lucide-react](https://lucide.dev) |
| Forms | `react-hook-form` + `zod` (`@hookform/resolvers`) |
| Class utils | `clsx` + `tailwind-merge` (`cn`) |
| SEO | Metadata API, `sitemap.ts`, `robots.ts` |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build
npm run typecheck  # tsc --noEmit
```

## Project structure

```
src/
  app/                     # routes (App Router)
    page.tsx               # Home                    /
    about/                 # About                   /about
    restaurant/            # The Shrub Restaurant    /restaurant
    activities/            # Activities overview     /activities
      <slug>/              # one page per category   /activities/<slug>
    transfers/             # Transfers & Logistics   /transfers
    contact/               # Contact                 /contact
    privacy-policy/        # Privacy Policy          /privacy-policy
    terms-and-conditions/  # Terms & Conditions      /terms-and-conditions
    layout.tsx globals.css not-found.tsx sitemap.ts robots.ts
  components/              # reusable UI (header, footer, hero, cards, forms...)
  lib/
    site.ts                # site config + navigation
    images.ts              # Wix media catalogue + URL helper
    utils.ts               # cn()
    content/               # rooms, amenities, activities, transfers, legal...
```

## Content & images

All copy was extracted verbatim from the original export and lives in
`src/lib/content/*`. Photography is referenced by its Wix media path in
`src/lib/images.ts` and rendered through `next/image`; the custom loader
(`image-loader.js`) builds on-the-fly resize URLs, so the CDN does the work and
we ship optimised WebP.

> **Note:** image-to-section placement is a best-effort mapping based on the
> original filenames and page locations. Swapping a photo is a one-line change in
> `src/lib/images.ts`.

## The contact form

`src/components/contact-form.tsx` validates input with Zod and simulates a
successful submission. To make it live, point `onSubmit` at a Route Handler or an
email/CRM service.

## The menu PDF

`public/the-shrub-lodge-menu.pdf` is served by the "See Our Menu" button on the
restaurant page.
