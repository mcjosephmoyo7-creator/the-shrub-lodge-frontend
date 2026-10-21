import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-forest-950 text-sand-50">
      <Container className="flex flex-col items-center gap-6 py-24 text-center">
        <span className="font-display text-6xl text-gold-400">404</span>
        <h1 className="font-display text-3xl sm:text-4xl">
          We couldn’t find that page
        </h1>
        <p className="max-w-md text-sand-100/75">
          The page you are looking for may have moved. Let us help you find your
          way back.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink
            href="/activities"
            variant="ghost"
            className="border border-white/25 text-sand-50 hover:bg-white/10"
          >
            Browse activities
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
