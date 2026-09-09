import { Button } from "@/components/ui/button";

const STEPS = [
  {
    step: "01",
    title: "Tell me what you want to play",
    body: "Bring a song, a part that isn’t working, or just say you want to get better. That’s where we start.",
  },
  {
    step: "02",
    title: "The first hour",
    body: "The lesson is 60 minutes and costs $60. I listen, watch your hands, and teach something you can use that night. If we both want to continue, we set a weekly time.",
  },
  {
    step: "03",
    title: "Work for the week",
    body: "You leave with a short list of what to practice. Next week we start from there.",
  },
];

export function ValueProp() {
  return (
    <section className="border-b border-border bg-background" aria-labelledby="value-heading">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            Lessons
          </p>
          <h2 id="value-heading" className="mt-3 font-display text-title text-foreground">
            How lessons work.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            I listen first. Then we fix the part that isn’t working. I only
            bring in theory when it helps the song. I teach in North Haven and
            Wallingford, and online.
          </p>
          <Button asChild className="mt-8">
            <a href="/#book-lesson">Book a weekly lesson</a>
          </Button>
        </div>
        <ol className="grid gap-4 lg:col-span-7">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl bg-card p-5 shadow-border sm:gap-6 sm:p-6"
            >
              <span className="font-display text-2xl text-muted-foreground">{item.step}</span>
              <div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
