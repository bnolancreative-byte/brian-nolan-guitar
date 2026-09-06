import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const GIGS = [
  {
    src: "/images/brian-formal.jpg",
    alt: "Brian Nolan standing in a navy blazer, holding a wine-red PRS guitar",
    title: "Solo",
    body: "Acoustic and electric sets for rooms that want one guitarist who can carry the night — jazz standards, roots, and the songs people actually request.",
  },
  {
    src: "/images/brian-outdoor.jpg",
    alt: "Brian Nolan playing an electric guitar outdoors on a lawn",
    title: "Weekend Update",
    body: "Six-piece pop and rock covers for breweries, halls, and private events. Full-band energy, tight setlists, county-wide.",
    follow: SITE.weekendUpdate,
  },
  {
    src: "/images/brian-jazz.jpg",
    alt: "Brian Nolan playing a nylon-string guitar in a small brick room with a microphone",
    title: "Lowlight Collective",
    body: "Jazz with friends for speakeasies and cafes — small rooms, late lights, the set you lean in for.",
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
              Book the player, or book the band.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5">
            Solo guitar, Weekend Update, and Lowlight Collective — booked out of
            New Haven County. Weddings, breweries, speakeasies, and cafes.
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
                <h3 className="font-display text-2xl tracking-tight">{gig.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{gig.body}</p>
                {"follow" in gig ? (
                  <a
                    href={gig.follow.href}
                    className="mt-3 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
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
            <a href="/?book=gig#start">Request a date</a>
          </Button>
          <p className="text-sm text-muted-foreground">
            Check out the work on{" "}
            <a
              href={SITE.instagram.href}
              className="font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE.instagram.ariaLabel}
            >
              Instagram
            </a>
            {" and "}
            <a
              href={SITE.facebook.href}
              className="font-medium text-foreground underline-offset-4 hover:underline"
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
