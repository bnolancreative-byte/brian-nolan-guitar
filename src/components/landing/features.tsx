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
    body: "We take the recording apart and build the chords, riffs, and feel that song actually needs.",
  },
  {
    icon: UserRound,
    title: "Built around you",
    body: "Kids, adults, and people coming back after years off. The hour follows who’s in the chair.",
  },
  {
    icon: ListChecks,
    title: "Notes for the week",
    body: "You leave with a short list you can actually open before the next hour.",
  },
  {
    icon: Users,
    title: "One student at a time",
    body: "Private hour. Beginner through advanced. We don’t rush, and we don’t stall.",
  },
  {
    icon: Wifi,
    title: "In person or live online",
    body: "Same teacher, same plan. North Haven and Wallingford, or live video when you can’t come in.",
  },
  {
    icon: MapPin,
    title: "A weekly time",
    body: "A standing hour on the calendar — School of Rock North Haven, nearby in person, or online.",
  },
];

export function Features() {
  return (
    <section id="lessons" className="bg-background" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">The hour</p>
            <h2 id="features-heading" className="mt-3 font-display text-title">
              Play in the lesson. Practice in the week.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5">
            Every lesson works the same way: we play, we slow down the stuck
            part, we play it until it holds, and you go home with work for the
            week.
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
            <p className="text-sm font-medium tracking-wide text-hero-muted">Who it’s for</p>
            <h3 className="mt-3 font-display text-3xl leading-snug">
              Starting out, coming back, or leveling up.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-hero-muted">
              Kids, adults, rusty hands. If you have a guitar, I have a weekly
              hour.
            </p>
            <a
              href="/#book-lesson"
              className="mt-8 inline-flex h-12 w-fit items-center rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
            >
              Book a weekly lesson
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
