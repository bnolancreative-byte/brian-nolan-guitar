import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const GIGS = [
  {
    src: "/images/brian-formal.jpg",
    alt: "Brian Nolan standing in a navy blazer, holding a wine-red PRS guitar",
    title: "Solo",
    kicker: "I sing and play",
    body: "Acoustic or electric. Jazz, popular songs, and requests — dinners, receptions, and private events.",
  },
  {
    src: "/images/brian-outdoor.jpg",
    alt: "Brian Nolan playing an electric guitar outdoors on a lawn",
    title: "Weekend Update",
    kicker: "Six-piece band",
    body: "A six-piece pop and rock band I lead. Breweries, halls, and private events.",
    follow: SITE.weekendUpdate,
  },
  {
    src: "/images/brian-jazz.jpg",
    alt: "Brian Nolan playing a nylon-string guitar in a small brick room with a microphone",
    title: "Lowlight Collective",
    kicker: "Small jazz group",
    body: "A small jazz group I lead. Cafes, speakeasies, and listening rooms.",
  },
] as const;

export function Gigs() {
  return (
    <section id="gigs" className="border-y border-border bg-secondary/40" aria-labelledby="gigs-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Live</p>
            <h2 id="gigs-heading" className="mt-3 font-display text-title">
              Solo, a six-piece band, or a small jazz group.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5">
            I play solo and I lead two groups out of North Haven and
            Wallingford. I’ve played Foolproof Brewing, Center Street Brewing,
            and Carcosa Lounge.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {GIGS.map((gig) => (
            <article key={gig.title} className="overflow-hidden rounded-2xl bg-card shadow-border">
              <img
                src={gig.src}
                alt={gig.alt}
                className="aspect-3/4 w-full object-cover object-top"
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
              />
              <div className="p-6">
                <p className="text-sm font-medium tracking-wide text-muted-foreground">{gig.kicker}</p>
                <h3 className="mt-1 font-display text-2xl tracking-tight">{gig.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{gig.body}</p>
                {"follow" in gig ? (
                  <a
                    href={gig.follow.href}
              className="mt-3 inline-flex text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={gig.follow.ariaLabel}
                  >
                    {gig.follow.label}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="/#book-gig">Book a gig</a>
          </Button>
          <p className="text-sm text-muted-foreground">
            See recent shows on{" "}
            <a
              href={SITE.instagram.href}
              className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE.instagram.ariaLabel}
            >
              Instagram
            </a>
            {" and "}
            <a
              href={SITE.facebook.href}
              className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE.facebook.ariaLabel}
            >
              Facebook
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
