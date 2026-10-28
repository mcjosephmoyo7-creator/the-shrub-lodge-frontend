import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Hero } from "@/components/hero";
import { PublicContentError } from "@/components/public-content-error";
import { Container } from "@/components/ui/container";
import { IMAGES } from "@/lib/images";
import { getPublicPost } from "@/lib/api/public-content";

type UpdatePageProps = { params: Promise<{ slug: string }> };

function isSafeHttpUrl(value: string | null): value is string {
  if (!value) return false;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export async function generateMetadata({
  params,
}: UpdatePageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPublicPost(slug);
    return post
      ? { title: post.title, description: post.excerpt.slice(0, 160) }
      : { title: "Update not found" };
  } catch (error) {
    console.error("[update-detail] Unable to load metadata:", error);
    return { title: "Update" };
  }
}

export default async function UpdateDetailPage({ params }: UpdatePageProps) {
  const { slug } = await params;
  let post;
  try {
    post = await getPublicPost(slug);
  } catch (error) {
    console.error("[update-detail] Unable to load update:", error);
    return (
      <>
        <Hero eyebrow="From the lodge" title="Update" image={IMAGES.aboutHero} />
        <PublicContentError label="this update" />
      </>
    );
  }

  if (!post) notFound();

  const date = post.published_at ?? post.scheduled_for ?? post.created_at;
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <Hero
        eyebrow="From the lodge"
        title={post.title}
        subtitle={new Date(date).toLocaleDateString()}
        image={IMAGES.aboutHero}
      />
      <section className="bg-sand-50 py-16 sm:py-20">
        <Container className="max-w-4xl">
          <Link
            href="/updates"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-forest-800 hover:text-gold-700"
          >
            <ArrowLeft className="h-4 w-4" /> All updates
          </Link>
          {isSafeHttpUrl(post.cover_image) ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-sand-200">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <article className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
              {new Date(date).toLocaleDateString()}
            </p>
            {post.excerpt ? (
              <p className="mt-5 font-display text-2xl leading-relaxed text-forest-900">
                {post.excerpt}
              </p>
            ) : null}
            <div className="mt-8 space-y-5 text-base leading-relaxed text-forest-800/80">
              {paragraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
              ))}
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
