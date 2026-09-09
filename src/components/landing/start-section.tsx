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
          <p className="text-sm font-medium tracking-wide text-hero-muted">Enquire</p>
          <h2 id="start-heading" className="mt-3 font-display text-title text-hero-foreground">
            Request a lesson or a performance.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-hero-muted">
            I charge $60 per hour, weekly, in {SITE.towns} or live online.
            For performances, select solo, the six-piece band, or the jazz
            group. Completing a form opens an email to me with your request.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div id="book-lesson" className="scroll-mt-24">
            <p className="mb-4 text-sm font-medium tracking-wide text-hero-muted">Lessons</p>
            <LessonForm />
            <p className="mt-4 text-sm text-hero-muted">
              I teach in person around {SITE.towns}, including School of Rock
              North Haven, and live online. {SITE.payment.lessons}
            </p>
          </div>
          <div id="book-gig" className="scroll-mt-24">
            <p className="mb-4 text-sm font-medium tracking-wide text-hero-muted">Performance</p>
            <GigForm />
            <p className="mt-4 text-sm text-hero-muted">
              I am available as a soloist (voice and guitar, acoustic or
              electric); I lead Weekend Update, a six-piece band; and I lead
              Lowlight Collective, an intimate jazz group. Appearances have
              included {SITE.rooms}. {SITE.payment.gigs}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
