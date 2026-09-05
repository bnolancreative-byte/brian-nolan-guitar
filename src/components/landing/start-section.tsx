import { StartForm } from "@/components/landing/start-form";
import { SITE } from "@/lib/site";

export function StartSection() {
  return (
    <section id="start" className="bg-hero text-hero-foreground" aria-labelledby="start-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-sm font-medium tracking-wide text-hero-muted">Start here</p>
          <h2 id="start-heading" className="mt-3 font-display text-title text-hero-foreground">
            Book a weekly hour, or a date.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-hero-muted">
            Lessons are $60 per hour, weekly. Gigs — solo, Weekend Update, or
            Lowlight Collective — are quoted by the room. After you submit, send
            the note from your phone so it reaches me.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-hero-foreground">Lessons</dt>
              <dd className="mt-1 text-sm leading-relaxed text-hero-muted">
                $60 per hour, weekly standing slot. New Haven County or live online.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-hero-foreground">Gigs</dt>
              <dd className="mt-1 text-sm leading-relaxed text-hero-muted">
                Tell me the room, the date, and which act. I will quote the night.
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-hero-foreground">Payment</dt>
              <dd className="mt-1 text-sm leading-relaxed text-hero-muted">
                Lessons: {SITE.payment.lessons} Gigs: {SITE.payment.gigs}
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-sm text-hero-muted">
            <a
              href={SITE.instagram.href}
              className="text-hero-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {SITE.instagram.label}
            </a>
            {" · "}
            <a
              href={SITE.facebook.href}
              className="text-hero-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {SITE.facebook.label}
            </a>
          </p>
        </div>
        <StartForm />
      </div>
    </section>
  );
}
