import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Weekly lesson",
    price: SITE.lessonRate,
    cadence: SITE.lessonCadence,
    blurb: "A reserved weekly hour with the same teacher and written notes after each lesson.",
    featured: true,
    features: [
      "60-minute private lesson",
      "$60 flat. No packages.",
      "Rock, blues, and jazz, according to the repertoire",
      "In person in North Haven and Wallingford, or live online",
      "Written notes for the week",
    ],
    cta: "Book a weekly hour",
    href: "/#book-lesson",
  },
  {
    name: "Live booking",
    price: "Quote",
    cadence: "by date and room",
    blurb: "Solo voice and guitar, a six-piece band, or an intimate jazz group. Provide the venue and the date for a written quote.",
    featured: false,
    features: [
      "Solo performance, acoustic or electric, with voice",
      "Weekend Update, a six-piece band led by Brian Nolan",
      "Lowlight Collective, an intimate jazz group he also leads",
      "New Haven County and nearby",
    ],
    cta: "Request a date",
    href: "/#book-gig",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-border bg-secondary/40" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">Booking</p>
          <h2 id="pricing-heading" className="mt-3 font-display text-title">
            $60 per hour, billed weekly.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Private lessons are a reserved weekly hour with no trial fee and no
            monthly package. Performances are quoted by room and date.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 lg:grid-cols-2">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={cn(
                "flex flex-col rounded-2xl p-6",
                tier.featured
                  ? "bg-hero text-hero-foreground shadow-border"
                  : "bg-card text-card-foreground shadow-border",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-wide">{tier.name}</h3>
                {tier.featured ? <Badge variant="inverse">Lessons</Badge> : null}
              </div>
              <p
                className={cn(
                  "mt-6 font-display text-5xl tracking-tight",
                  tier.featured ? "text-hero-foreground" : "text-foreground",
                )}
              >
                {tier.price}
              </p>
              <p
                className={cn(
                  "mt-1 text-sm",
                  tier.featured ? "text-hero-muted" : "text-muted-foreground",
                )}
              >
                {tier.cadence}
              </p>
              <p
                className={cn(
                  "mt-4 text-sm leading-relaxed",
                  tier.featured ? "text-hero-muted" : "text-muted-foreground",
                )}
              >
                {tier.blurb}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        tier.featured ? "text-hero-foreground" : "text-foreground",
                      )}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className={tier.featured ? "text-hero-foreground" : "text-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-8 w-full"
                variant={tier.featured ? "inverse" : "default"}
                size="lg"
              >
                <a href={tier.href}>{tier.cta}</a>
              </Button>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-card p-6 shadow-border">
            <h3 className="text-sm font-semibold tracking-wide">How you pay for lessons</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {SITE.lessonRate} {SITE.lessonCadence}. {SITE.payment.lessons}
            </p>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-border">
            <h3 className="text-sm font-semibold tracking-wide">How you pay for gigs</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {SITE.payment.gigs}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
