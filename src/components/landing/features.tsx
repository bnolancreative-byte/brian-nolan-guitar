import {
  Compass,
  ListChecks,
  Mic,
  Music2,
  UserRound,
  Wifi,
} from "lucide-react";

const FEATURES = [
  {
    icon: Music2,
    title: "Your songs first",
    body: "We reverse-engineer the record you love, then build the technique it actually demands.",
  },
  {
    icon: Compass,
    title: "Adaptive, not canned",
    body: "Kids, adults, returning players, ADHD brains. The method bends around the person in the chair.",
  },
  {
    icon: ListChecks,
    title: "A plan you will open",
    body: "Fifteen focused minutes beats an hour of wandering. You leave every lesson with the next week written down.",
  },
  {
    icon: Mic,
    title: "Recorded recaps",
    body: "A short takeaway clip after each session so home practice is the lesson, not a memory test.",
  },
  {
    icon: Wifi,
    title: "Studio or live online",
    body: "Same teacher, same plan. In person in New Haven County, or live online when the week is loud.",
  },
  {
    icon: UserRound,
    title: "Paced to you",
    body: "Beginner through advanced. Jazz first — then rock, blues, fingerstyle. We do not rush, and we do not stall.",
  },
];

export function Features() {
  return (
    <section id="lessons" className="bg-background" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">The method</p>
            <h2 id="features-heading" className="mt-3 font-display text-title">
              Craft in the hour. Clarity for the week.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5">
            Every lesson is built the same way: listen, isolate, play, and leave
            with work that fits real life — not a fantasy practice schedule.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl bg-card p-6 shadow-border shadow-border-hover transition-[box-shadow] duration-150 ease-out"
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-secondary text-foreground">
                <feature.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 overflow-hidden rounded-2xl bg-hero lg:grid-cols-2">
          <img
            src="/images/brian-prep.jpg"
            alt="Brian Nolan at home with a Telecaster and a laptop"
            className="aspect-4/3 h-full w-full object-cover object-top lg:aspect-auto lg:min-h-80"
            width={1200}
            height={1600}
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col justify-center p-8 text-hero-foreground md:p-12">
            <p className="text-sm font-medium tracking-wide text-hero-muted">Who it is for</p>
            <h3 className="mt-3 font-display text-3xl leading-snug">
              Starting out. Coming back. Ready for jazz that actually sounds like jazz.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-hero-muted">
              Kids, adults, returning players. If you have the instrument and
              the itch, I have the structure. No shame about rusty hands.
            </p>
            <a
              href="/?book=lesson#start"
              className="mt-8 inline-flex h-12 w-fit items-center rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-background/90"
            >
              Book a weekly hour
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
