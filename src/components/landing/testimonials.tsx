import { Button } from "@/components/ui/button";

const FACTS = [
  {
    title: "The song is the lesson",
    body: "Bring what you want to play. We pull the chords, the riff, and the feel off the record, then build the technique that song actually needs.",
  },
  {
    title: "Hands on the guitar",
    body: "I watch how you sit, pick, and fret. We fix what is in the way of the next chorus — then you take that move home for the week.",
  },
  {
    title: "A weekly hour that sticks",
    body: "Same teacher, same slot, work you can open between lessons. Kids, adults, and players coming back after years off.",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="bg-background" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Lessons</p>
            <h2 id="stories-heading" className="mt-3 font-display text-title">
              How I teach guitar.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              One-to-one, $60 an hour, weekly. North Haven, Wallingford, School
              of Rock North Haven, or live online. You play. I listen, show you
              the next move, and send you out with something you can actually
              practice.
            </p>
            <Button asChild className="mt-8">
              <a href="/#book-lesson">Book a weekly hour</a>
            </Button>
            <img
              src="/images/brian-portrait.jpg"
              alt="Portrait of Brian Nolan in a black blazer, holding a wine-red PRS guitar"
              className="mt-8 hidden aspect-3/4 w-full rounded-2xl object-cover object-top lg:block"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="grid gap-4 lg:col-span-8">
            {FACTS.map((fact) => (
              <article key={fact.title} className="rounded-2xl bg-card p-6 shadow-border md:p-8">
                <h3 className="text-base font-semibold text-foreground">{fact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {fact.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
