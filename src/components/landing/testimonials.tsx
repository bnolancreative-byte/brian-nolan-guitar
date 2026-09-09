import { Button } from "@/components/ui/button";

export function Testimonials() {
  return (
    <section id="stories" className="bg-background" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <img
              src="/images/brian-portrait.jpg"
              alt="Portrait of Brian Nolan in a black blazer, holding a wine-red PRS guitar"
              className="aspect-3/4 w-full rounded-2xl object-cover object-top"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Brian Nolan — the same player in the lesson and on the gig.
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">The hour</p>
            <h2 id="stories-heading" className="mt-3 font-display text-title">
              You play. I listen. We fix the bar that is in the way.
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                You come in with a song, a stuck change, or “I just want to get
                better.” We play. I watch your hands. When something hesitates —
                a fret, a pick attack, the time — we stop, take that bar apart,
                and put it back until it feels like yours.
              </p>
              <p>
                You leave with a small amount of work you will actually do: one
                shape, one lick, one chorus in time. Not a binder. The next hour
                starts further along.
              </p>
              <p>
                Kids, adults, rusty hands. One student at a time. North Haven,
                Wallingford, School of Rock North Haven, or live online. $60.
                Weekly.
              </p>
            </div>
            <Button asChild className="mt-8" size="lg">
              <a href="/#book-lesson">Book a weekly hour</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
