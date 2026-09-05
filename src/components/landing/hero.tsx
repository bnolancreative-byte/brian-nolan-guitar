import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const STATS = [
  { label: "Jazz at the core" },
  { label: "$60 per hour, weekly" },
  { label: "New Haven County, CT" },
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
            Guitar lessons from a player who still{" "}
            <em className="italic">books the room</em>.
          </h1>
          <p className="rise-in rise-in-2 mt-6 max-w-xl text-lg leading-relaxed text-hero-muted">
            I am Brian Nolan — jazz guitarist, private teacher, and the booker
            for solo sets plus Weekend Update and Lowlight Collective around New
            Haven County. One-to-one lessons. Real gigs. No YouTube rabbit holes.
          </p>
          <div className="rise-in rise-in-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="inverse" size="lg" className="min-h-12">
              <a href="/?book=lesson#start">
                Book a weekly lesson
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="inverseOutline" size="lg" className="min-h-12">
              <a href="/?book=gig#start">Book a gig</a>
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
            src="/images/brian-hero.png"
            alt="Brian Nolan smiling with a butterscotch Telecaster in a New Haven County venue"
            className="aspect-4/5 w-full rounded-2xl object-cover object-top sm:aspect-4/5 lg:aspect-4/5"
            width={900}
            height={1125}
          />
          <figcaption className="mt-3 text-sm text-hero-muted">
            Brian Nolan — jazz guitar, private lessons, live in the county.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
