const STORIES = [
  {
    quote:
      "I came back after fifteen years of not touching a guitar. Six months later I played a full set at my brother's wedding — and I was not pretending.",
    name: "Maya R.",
    role: "Adult beginner, weekly lessons",
    initials: "MR",
  },
  {
    quote:
      "My son has a hard time sitting still for lectures. Here the lesson is the song. He actually opens the practice map without a fight.",
    name: "Jordan L.",
    role: "Parent of a student",
    initials: "JL",
  },
  {
    quote:
      "I did not want campfire chords. We went after jazz voicings without turning the hour into a theory class. Finally, something that sounds like me.",
    name: "Dominic K.",
    role: "Returning player, weekly lessons",
    initials: "DK",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="bg-background" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Stories</p>
            <h2 id="stories-heading" className="mt-3 font-display text-title">
              What the hour turns into.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Students keep the work because the work is theirs — a wedding set,
              a stubborn solo, a kid who finally wants to pick the guitar up.
              That is the point of studying with a player who still takes the stage.
            </p>
            <img
              src="/images/brian-portrait.jpg"
              alt="Brian Nolan in a black blazer holding a wine-red PRS guitar"
              className="mt-8 hidden aspect-3/4 w-full rounded-2xl object-cover object-top lg:block"
              width={1200}
              height={1600}
            />
          </div>
          <div className="grid gap-4 lg:col-span-8">
            {STORIES.map((story) => (
              <blockquote
                key={story.name}
                className="rounded-2xl bg-card p-6 shadow-border md:p-8"
              >
                <p className="font-display text-xl leading-snug text-foreground md:text-2xl">
                  {story.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span
                    className="flex size-11 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground"
                    aria-hidden="true"
                  >
                    {story.initials}
                  </span>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-foreground">
                      {story.name}
                    </cite>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
