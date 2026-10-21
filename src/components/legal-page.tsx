import { Hero } from "@/components/hero";
import { Container } from "@/components/ui/container";
import { IMAGES } from "@/lib/images";
import type { LegalDocument } from "@/lib/content/legal";

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title={doc.title}
        subtitle={`Last Updated: ${doc.updated}`}
        image={IMAGES.lodgeGarden}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-3xl">
          <article className="prose max-w-none prose-headings:font-display prose-headings:font-normal prose-headings:text-forest-900 prose-p:text-forest-800/80 prose-li:text-forest-800/80 prose-a:text-gold-700 prose-a:no-underline hover:prose-a:underline">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </Container>
      </section>
    </>
  );
}
