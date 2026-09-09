import {
  ListChecks,
  MapPin,
  Music2,
  UserRound,
  Users,
  Wifi,
} from "lucide-react";

const FEATURES = [
  {
    icon: Music2,
    title: "Songs you want to play",
    body: "We take the record apart and build the chords, riffs, and feel that song actually needs.",
  },
  {
    icon: UserRound,
    title: "Built around you",
    body: "Kids, adults, returning players. The hour follows the person in front of me, not a script.",
  },
  {
    icon: ListChecks,
    title: "Work for the week",
    body: "You leave with a short list — a few focused minutes, not a pile of exercises.",
  },
  {
    icon: Users,
    title: "One student at a time",
    body: "Private hour. Beginner through advanced. We do not rush, and we do not stall.",
  },
  {
    icon: Wifi,
    title: "In person or live online",
    body: "Same teacher, same plan. North Haven and Wallingford, or live video when you cannot come in.",
  },
  {
    icon: MapPin,
    title: "Local, weekly",
    body: "A standing hour on the calendar. School of Rock North Haven, in person nearby, or online.",
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
              The hour, then the week.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5">
            Every lesson works the same way: listen, slow down the stuck part,
            play it until it holds, and send you home with work you will do.
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
            alt="Brian Nolan sitting at home with a Telecaster across his lap and a laptop on the table"
            className="aspect-4/3 h-full w-full object-cover object-top lg:aspect-auto lg:min-h-80"
            width={1200}
            height={1600}
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col justify-center p-8 text-hero-foreground md:p-12">
            <p className="text-sm font-medium tracking-wide text-hero-muted">Who it is for</p>
            <h3 className="mt-3 font-display text-3xl leading-snug">
              Starting out, coming back, or leveling up.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-hero-muted">
              Kids, adults, rusty hands. If you have a guitar, we have a weekly
              hour. No shame about where you are starting.
            </p>
            <a
              href="/#book-lesson"
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
