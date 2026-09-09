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
              Brian Nolan, guitarist and teacher.
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Lessons</p>
            <h2 id="stories-heading" className="mt-3 font-display text-title">
              How a lesson is structured.
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Bring a song you want to learn, or a passage that is not yet
                reliable. We play it together. I observe left and right hand,
                isolate the difficulty — a chord change, a figure, or the time —
                and we slow that material until it is secure.
              </p>
              <p>
                You leave with a short, specific practice assignment for the
                days between lessons. The following hour continues from that
                work.
              </p>
              <p>
                Instruction is one-to-one, for children, adults, and returning
                players. Lessons are offered in North Haven and Wallingford,
                at School of Rock North Haven, and live online, at $60 per hour
                on a weekly schedule.
              </p>
            </div>
            <Button asChild className="mt-8" size="lg">
              <a href="/#book-lesson">Request a weekly lesson</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
