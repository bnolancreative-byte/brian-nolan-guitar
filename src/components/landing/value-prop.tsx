import { Button } from "@/components/ui/button";

const STEPS = [
  {
    step: "01",
    title: "Tell me what you want to play",
    body: "A standard, a solo, a plateau. Jazz is the home base — rock, blues, and the song on your phone all count.",
  },
  {
    step: "02",
    title: "Take the first hour",
    body: "Sixty minutes, $60. I listen, watch your hands, and teach something you can use that night. If the fit is right, we keep the weekly slot.",
  },
  {
    step: "03",
    title: "Leave with work for the week",
    body: "Warm-ups, song work, and a short plan you can actually open. The hour is the lesson. The week is where you get good.",
  },
];

export function ValueProp() {
  return (
    <section className="border-b border-border bg-background" aria-labelledby="value-heading">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            Why study with Brian
          </p>
          <h2 id="value-heading" className="mt-3 font-display text-title text-foreground">
            A working jazz guitarist, not a content feed.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            I teach the way I play: ears first, hands honest, theory only when
            it serves the tune. Private lessons in North Haven and Wallingford,
            or live online if you are farther out.
          </p>
          <Button asChild className="mt-8">
            <a href="/#book-lesson">Book a weekly hour</a>
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
