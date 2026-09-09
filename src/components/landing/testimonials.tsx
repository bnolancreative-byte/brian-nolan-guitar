import { Button } from "@/components/ui/button";

const FACTS = [
  {
    title: "Kids through adults",
    body: "Beginners, returning players, and students who already have chops. The hour bends around who is in the chair.",
  },
  {
    title: "Parents stay in the loop",
    body: "If I am teaching your kid, you hear what we worked on and what the week looks like. No mystery homework.",
  },
  {
    title: "Jazz first",
    body: "Standards, time, and ears. Rock, blues, and the song on your phone still count — they just sit on that foundation.",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="bg-background" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">The chair</p>
            <h2 id="stories-heading" className="mt-3 font-display text-title">
              Who the hour is for.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              I teach one-to-one in North Haven and Wallingford, including School
              of Rock North Haven, and live online. Students and parents tell me
              how the week went — ask them, or email me and we will talk.
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
