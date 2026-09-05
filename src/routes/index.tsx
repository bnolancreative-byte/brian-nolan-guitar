import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/landing/home-page";

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (search: Record<string, unknown>): { book?: "lesson" | "gig" } => ({
    book: search.book === "gig" || search.book === "lesson" ? search.book : undefined,
  }),
});

function Home() {
  return <HomePage />;
}
