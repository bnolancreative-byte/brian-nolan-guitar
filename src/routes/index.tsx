import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/landing/home-page";
import type { LiveActId } from "@/lib/site";

const ACTS = ["weekend-update", "lowlight", "solo"] as const satisfies readonly LiveActId[];

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (
    search: Record<string, unknown>,
  ): { book?: "lesson" | "gig"; act?: LiveActId } => ({
    book: search.book === "gig" || search.book === "lesson" ? search.book : undefined,
    act: ACTS.find((act) => act === search.act),
  }),
});

function Home() {
  return <HomePage />;
}
