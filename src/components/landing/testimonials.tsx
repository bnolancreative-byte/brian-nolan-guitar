const QUESTIONS = [
  {
    q: "Do I need a guitar?",
    a: "Yes. Bring the one you practice on. If you are just starting and do not have one yet, say so in the form.",
  },
  {
    q: "Is the first hour a trial?",
    a: "No. It is the same $60 hour. If we both want to continue, we keep that time each week.",
  },
  {
    q: "Where do we meet?",
    a: "In North Haven or Wallingford, including School of Rock North Haven, or on a video call.",
  },
  {
    q: "How do I pay?",
    a: "Lessons: cash, Zelle, or Venmo at the hour. Gigs: I send a quote first. A deposit holds the date. The rest is due the night of the gig.",
  },
];

export function Testimonials() {
  return (
    <section id="questions" className="bg-background" aria-labelledby="questions-heading">
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
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Before you book</p>
            <h2 id="questions-heading" className="mt-3 font-display text-title">
              A few things people ask.
            </h2>
            <div className="mt-8 divide-y divide-border rounded-2xl bg-card shadow-border">
              {QUESTIONS.map((item) => (
                <details key={item.q} className="group px-6 py-1">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="text-muted-foreground group-open:hidden" aria-hidden="true">
                      +
                    </span>
                    <span className="hidden text-muted-foreground group-open:inline" aria-hidden="true">
                      –
                    </span>
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
