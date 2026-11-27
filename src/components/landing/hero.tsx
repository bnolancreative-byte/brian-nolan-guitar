import { SITE, bookGigHref, bookLessonHref } from "@/lib/site";

const FACTS = [
  { label: "Private", detail: "One student at a time" },
  { label: SITE.lessonRate, detail: "An hour, once a week" },
  { label: "Local", detail: SITE.towns },
];

export function Hero() {
  return (
    <section className="bg-background" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-brass">
            {SITE.teacher} · {SITE.region}
          </p>
          <h1 id="hero-heading" className="mt-4 font-display text-display text-foreground">
            Guitar lessons in North Haven and Wallingford.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I’m Brian Nolan. I teach private guitar lessons in {SITE.towns}, and online. Lessons are{" "}
            {SITE.lessonRate} an hour, once a week.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={bookLessonHref()}
              data-hero-cta=""
              className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book guitar lessons
            </a>
            <a
              href={bookGigHref()}
              className="inline-flex h-14 items-center justify-center rounded-md border border-foreground/20 bg-card px-6 text-base font-semibold text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book a gig
            </a>
          </div>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            I also book live music: Weekend Update, a jazz trio or duo, and solo acoustic.
          </p>
          <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm font-semibold text-foreground">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-muted-foreground">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure>
          <img
            src="/images/brian-hero.jpg"
            alt="Brian Nolan smiling and holding a butterscotch Telecaster in front of a stacked-stone wall"
            className="photo-frame aspect-4/5 w-full rounded-2xl object-cover object-[center_20%]"
            width={900}
            height={1125}
            sizes="(min-width: 1024px) 36rem, 100vw"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Brian Nolan with a Telecaster.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
