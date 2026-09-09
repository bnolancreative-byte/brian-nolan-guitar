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
    title: "Repertoire first",
    body: "I work from the recording and build the chords, technique, and feel the piece requires.",
  },
  {
    icon: UserRound,
    title: "Tailored instruction",
    body: "I plan each lesson for the student in the room — children, adults, and returning players.",
  },
  {
    icon: ListChecks,
    title: "A weekly practice plan",
    body: "I end each hour with focused assignments you can complete before the next lesson.",
  },
  {
    icon: Users,
    title: "Private lessons",
    body: "I teach one student per hour, beginner through advanced, at a pace that holds.",
  },
  {
    icon: Wifi,
    title: "In person or live online",
    body: "I offer the same instruction in North Haven and Wallingford, or by live video when you cannot come in.",
  },
  {
    icon: MapPin,
    title: "A standing weekly time",
    body: "I reserve a weekly hour, including School of Rock North Haven, nearby in-person lessons, or online.",
  },
];

export function Features() {
  return (
    <section id="lessons" className="bg-background" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Approach</p>
            <h2 id="features-heading" className="mt-3 font-display text-title">
              A structured hour and a clear assignment.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5">
            I follow the same sequence in every lesson: listen, isolate the
            difficulty, play it until it is reliable, and assign practice for
            the week ahead.
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
            <p className="text-sm font-medium tracking-wide text-hero-muted">Students</p>
            <h3 className="mt-3 font-display text-3xl leading-snug">
              Beginners, returning players, and advancing students.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-hero-muted">
              I teach children and adults. If you have an instrument, I have a
              weekly hour.
            </p>
            <a
              href="/#book-lesson"
              className="mt-8 inline-flex h-12 w-fit items-center rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-background/90"
            >
              Request a weekly lesson
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
