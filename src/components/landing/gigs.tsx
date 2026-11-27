import { SITE, LIVE_ACTS, bookGigHref } from "@/lib/site";

const STEPS = [
  {
    step: "1",
    title: "Tell me the date",
    body: "Pick Weekend Update, the jazz trio or duo, or solo acoustic. Add the room and the day.",
  },
  {
    step: "2",
    title: "I send a quote",
    body: "I’ll email the price for that room and that date.",
  },
  {
    step: "3",
    title: "A deposit holds it",
    body: "Cancel 14 days or more ahead and I refund the deposit. Inside 14 days, I keep it.",
  },
];

export function Gigs() {
  return (
    <section
      id="gigs"
      className="scroll-mt-20 border-t border-border bg-secondary/50"
      aria-labelledby="gigs-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-sm font-medium tracking-wide text-muted-foreground">Live</p>
          <h2 id="gigs-heading" className="mt-3 font-display text-title">
            Weekend Update, a jazz trio or duo, or solo acoustic.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I lead two bands, and I play solo, from {SITE.towns}. {SITE.travel} {SITE.sound} I’ve
            played {SITE.rooms}.
          </p>
        </div>

        <div className="mt-12 grid gap-6">
          {LIVE_ACTS.map((act) => (
            <article
              key={act.id}
              className="grid overflow-hidden rounded-2xl bg-card shadow-border lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            >
              <img
                src={act.src}
                alt={act.alt}
                className="aspect-4/3 h-full w-full object-cover object-top lg:aspect-auto lg:min-h-72"
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
              />
              <div className="flex flex-col p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brass">
                  {act.kicker}
                </p>
                <h3 className="mt-2 font-display text-4xl tracking-tight">{act.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {act.body}
                </p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-foreground">
                  {act.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {act.follow ? (
                  <a
                    href={act.follow.href}
                    className="mt-4 inline-flex min-h-11 w-fit items-center text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={act.follow.ariaLabel}
                  >
                    {act.follow.label}
                  </a>
                ) : null}
                <div className="mt-6">
                  <a
                    href={bookGigHref(act.id)}
                    className="inline-flex h-12 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    {act.cta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {STEPS.map((item) => (
            <li key={item.step} className="rounded-2xl bg-card p-5 shadow-border">
              <p className="font-display text-2xl text-brass">{item.step}</p>
              <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          See recent shows on{" "}
          <a
            href={SITE.instagram.href}
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SITE.instagram.ariaLabel}
          >
            Instagram
          </a>
          {" and "}
          <a
            href={SITE.facebook.href}
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SITE.facebook.ariaLabel}
          >
            Facebook
          </a>
          .
        </p>
      </div>
    </section>
  );
}
