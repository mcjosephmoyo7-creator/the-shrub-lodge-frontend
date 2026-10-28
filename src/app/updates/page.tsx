import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { PublicContentError } from "@/components/public-content-error";
import { Container } from "@/components/ui/container";
import { IMAGES } from "@/lib/images";
import { getPublicPosts } from "@/lib/api/public-content";

export const metadata: Metadata = {
  title: "Updates",
  description: "News, stories, and updates from The Shrub Lodge.",
};

function isSafeHttpUrl(value: string | null): value is string {
  if (!value) return false;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export default async function UpdatesPage() {
  let posts;
  try {
    posts = await getPublicPosts();
  } catch (error) {
    console.error("[updates-page] Unable to load updates:", error);
    return (
      <>
        <Hero eyebrow="From the lodge" title="Updates" image={IMAGES.aboutHero} />
        <PublicContentError label="our updates" />
      </>
    );
  }

  return (
    <>
      <Hero
        eyebrow="From the lodge"
        title="Updates"
        subtitle="News, stories, and notes from The Shrub Lodge."
        image={IMAGES.aboutHero}
      />
      <section className="bg-sand-50 py-16 sm:py-20">
        <Container>
          {posts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const cover = isSafeHttpUrl(post.cover_image)
                  ? post.cover_image
                  : null;
                const date = post.published_at ?? post.scheduled_for ?? post.created_at;
                return (
                  <article
                    key={post.id}
                    className="overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <Link href={`/updates/${encodeURIComponent(post.slug)}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
                        {cover ? (
                          <Image
                            src={cover}
                            alt={post.title}
                            fill
                            unoptimized
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center font-display text-xl text-forest-700/60">
                            The Shrub Lodge
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <time
                          dateTime={date}
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700"
                        >
                          {new Date(date).toLocaleDateString()}
                        </time>
                        <h2 className="mt-2 font-display text-2xl text-forest-900 group-hover:text-gold-700">
                          {post.title}
                        </h2>
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-forest-800/70">
                          {post.excerpt}
                        </p>
                        <span className="mt-5 inline-block text-sm font-semibold text-forest-900">
                          Read update <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-sand-200 bg-white p-10 text-center">
              <h2 className="font-display text-2xl text-forest-900">
                No updates yet
              </h2>
              <p className="mt-3 text-sm text-forest-800/70">
                New stories from the lodge will appear here.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
