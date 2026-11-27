import { SITE, bookLessonHref } from "@/lib/site";

const STEPS = [
  {
    step: "1",
    title: "Tell me what you want to play",
    body: "Bring a song, a part that isn’t working, or just say you want to get better. That’s where we start.",
  },
  {
    step: "2",
    title: "The first hour",
    body: "The lesson is 60 minutes and costs $60. I listen, watch your hands, and teach something you can use that night. If we both want to continue, we set a weekly time.",
  },
  {
    step: "3",
    title: "Work for the week",
    body: "You leave with a short list of what to practice. Next week we start from there.",
  },
];

const DETAILS = [
  {
    term: "Price",
    detail: `${SITE.lessonRate} an hour, once a week. No trial fee and no monthly package.`,
  },
  {
    term: "The hour",
    detail:
      "We play. We slow down the part that’s stuck. We play it again until it holds. At the end I write down what to practice before next week.",
  },
  {
    term: "Where",
    detail: `In person in ${SITE.towns}, including ${SITE.school}, or on a live video call if you can’t come in.`,
  },
  {
    term: "Who",
    detail:
      "Kids and adults. Beginners, people who already play, and people coming back after years off. Private lessons only, beginner through advanced. We go at your pace.",
  },
  {
    term: "What we play",
    detail:
      "Tell me the song. We learn the chords, the riff, and how it should feel. Rock, blues, and jazz, depending on the song. I only bring in theory when it helps the song.",
  },
  {
    term: "Paying",
    detail: `${SITE.payment.lessons} ${SITE.cancel.lessons}`,
  },
];

export function Features() {
  return (
    <section
      id="lessons"
      className="scroll-mt-20 border-t border-border bg-background"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-sm font-medium tracking-wide text-muted-foreground">
              Lessons
            </p>
            <h2 id="features-heading" className="mt-3 font-display text-title">
              How lessons work.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              I listen first. Then we fix the part that isn’t working. I only bring in theory when
              it helps the song. I teach in {SITE.towns}, and online.
            </p>
            <a
              href={bookLessonHref()}
              className="mt-8 inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book guitar lessons
            </a>
          </div>
          <ol className="grid gap-0 lg:col-span-7">
            {STEPS.map((item) => (
              <li
                key={item.step}
                className="grid grid-cols-[auto_1fr] gap-4 border-t border-border py-6 first:border-t-0 first:pt-0"
              >
                <span className="font-display text-3xl text-brass" aria-hidden="true">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <h3 className="font-display text-3xl tracking-tight">What you get in an hour.</h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            We play. We slow down the part that’s stuck. We play it again until it holds. You go
            home with a few things to practice.
          </p>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {DETAILS.map((item) => (
              <div key={item.term} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <dt className="text-sm font-semibold text-foreground">{item.term}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-2xl bg-hero lg:grid-cols-2">
          <img
            src="/images/brian-prep.jpg"
            alt="Brian Nolan with a guitar strap, looking at a laptop, a butterscotch Telecaster beside him"
            className="aspect-4/3 h-full w-full object-cover object-top lg:aspect-auto lg:min-h-80"
            width={1200}
            height={1600}
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-col justify-center p-8 text-hero-foreground md:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-hero-muted">
              Who it’s for
            </p>
            <h3 className="mt-3 font-display text-3xl leading-snug">
              Kids, adults, and people coming back.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-hero-muted">
              If you have a guitar, we can find a weekly hour. Beginners are welcome.
            </p>
            <a
              href={bookLessonHref()}
              className="mt-8 inline-flex h-12 w-fit items-center rounded-md bg-background px-6 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
            >
              Book a weekly lesson
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
