import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const STATS = [
  { label: "One-to-one lessons" },
  { label: "$60 per hour, weekly" },
  { label: "North Haven and Wallingford" },
];

export function Hero() {
  return (
    <section className="bg-hero text-hero-foreground" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <Badge variant="inverse" className="rise-in">
            {SITE.teacher} · {SITE.region}
          </Badge>
          <h1
            id="hero-heading"
            className="rise-in rise-in-1 mt-6 font-display text-display text-hero-foreground"
          >
            Private guitar lessons from a working musician.
          </h1>
          <p className="rise-in rise-in-2 mt-6 max-w-xl text-lg leading-relaxed text-hero-muted">
            Brian Nolan is a guitarist and private teacher in {SITE.towns}.
            Lessons are one-to-one. Performances include solo sets, Weekend
            Update, and Lowlight Collective.
          </p>
          <div className="rise-in rise-in-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="inverse" size="lg" className="min-h-12">
              <a href="/#book-lesson">
                Book a weekly hour — $60
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="inverseOutline" size="lg" className="min-h-12">
              <a href="/#book-gig">Book a gig</a>
            </Button>
          </div>
          <ul className="rise-in rise-in-4 mt-10 flex flex-col gap-2 text-sm text-hero-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
            {STATS.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-hero-foreground/70" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <figure className="rise-in rise-in-2">
          <img
            src="/images/brian-hero.jpg"
            alt="Brian Nolan sitting at a table with a butterscotch Telecaster and a laptop"
            className="aspect-4/5 w-full rounded-2xl object-cover object-top sm:aspect-4/5 lg:aspect-4/5"
            width={536}
            height={572}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <figcaption className="mt-3 text-sm text-hero-muted">
            Brian Nolan with a Telecaster.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
