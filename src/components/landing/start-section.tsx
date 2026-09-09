import { useEffect } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { GigForm, LessonForm } from "@/components/landing/start-form";
import { SITE } from "@/lib/site";

const routeApi = getRouteApi("/");

export function StartSection() {
  const { book } = routeApi.useSearch();

  useEffect(() => {
    const id = book === "gig" ? "book-gig" : book === "lesson" ? "book-lesson" : null;
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [book]);

  return (
    <section id="start" className="bg-hero text-hero-foreground" aria-labelledby="start-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-hero-muted">Book</p>
          <h2 id="start-heading" className="mt-3 font-display text-title text-hero-foreground">
            Book a lesson or a gig.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-hero-muted">
            Lessons are $60 an hour, once a week, in {SITE.towns} or online.
            For gigs, pick solo, the six-piece, or the jazz group. The form
            opens an email to me with your details filled in.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div id="book-lesson" className="scroll-mt-24">
            <p className="mb-4 text-sm font-medium tracking-wide text-hero-muted">Lessons</p>
            <LessonForm />
            <p className="mt-4 text-sm text-hero-muted">
              I teach in person around {SITE.towns}, including School of Rock
              North Haven, and online. {SITE.payment.lessons}
            </p>
          </div>
          <div id="book-gig" className="scroll-mt-24">
            <p className="mb-4 text-sm font-medium tracking-wide text-hero-muted">Gigs</p>
            <GigForm />
            <p className="mt-4 text-sm text-hero-muted">
              I sing and play solo, acoustic or electric. I lead Weekend Update,
              a six-piece band, and Lowlight Collective, a small jazz group.
              I’ve played {SITE.rooms}. {SITE.payment.gigs}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
