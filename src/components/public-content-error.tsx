import { AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/container";

export function PublicContentError({ label }: { label: string }) {
  return (
    <section className="bg-sand-50 py-20">
      <Container className="max-w-3xl">
        <div
          role="alert"
          className="flex items-start gap-4 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h1 className="font-display text-2xl">Content is temporarily unavailable</h1>
            <p className="mt-2 text-sm leading-relaxed">
              We could not load {label} right now. Please try again in a little while.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
