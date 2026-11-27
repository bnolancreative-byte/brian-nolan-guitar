import { useEffect } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { GigForm, LessonForm } from "@/components/landing/start-form";
import { SITE } from "@/lib/site";
import type { Act } from "@/lib/leads";

const routeApi = getRouteApi("/");

function scrollToId(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

export function StartSection() {
  const { book, act } = routeApi.useSearch();

  useEffect(() => {
    const id = book === "lesson" ? "book-lesson" : book === "gig" || act ? "book-gig" : null;
    if (!id) return;
    scrollToId(id);
  }, [book, act]);

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-hero text-hero-foreground"
      aria-labelledby="start-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-hero-muted">Contact</p>
          <h2 id="start-heading" className="mt-3 font-display text-title text-hero-foreground">
            Book a lesson or a gig.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-hero-muted">
            Lessons are {SITE.lessonRate} an hour, once a week, in {SITE.towns} or online. For a
            gig, pick Weekend Update, the jazz trio or duo, or solo acoustic. I’ll reply by email.
          </p>
          <p className="mt-4 text-base leading-relaxed text-hero-foreground">
            <a
              href={SITE.email.href}
              className="font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
            >
              {SITE.email.address}
            </a>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-hero-muted">
            Or send the form. If it can’t email me, it opens a draft to that address. Recent shows
            are on{" "}
            <a
              href={SITE.instagram.href}
              className="font-medium text-hero-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE.instagram.ariaLabel}
            >
              Instagram ({SITE.instagram.label})
            </a>
            .
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div id="book-lesson" className="scroll-mt-24">
            <p className="mb-4 text-sm font-medium tracking-wide text-hero-muted">Lessons</p>
            <LessonForm />
            <p className="mt-4 text-sm text-hero-muted">
              In person around {SITE.towns}, or online. {SITE.lessonRate} an hour, once a week.
            </p>
          </div>
          <div id="book-gig" className="scroll-mt-24">
            <p className="mb-4 text-sm font-medium tracking-wide text-hero-muted">Gigs</p>
            <GigForm initialAct={act as Act | undefined} />
            <p className="mt-4 text-sm text-hero-muted">
              Weekend Update, Lowlight Collective, or solo acoustic. {SITE.travel} {SITE.sound}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
