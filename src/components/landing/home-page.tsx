import { useEffect, useState } from "react";
import { Features } from "@/components/landing/features";
import { Gigs } from "@/components/landing/gigs";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { StartSection } from "@/components/landing/start-section";
import { Testimonials } from "@/components/landing/testimonials";
import { ValueProp } from "@/components/landing/value-prop";
import { cn } from "@/lib/utils";

function overlapsBar(el: Element) {
  const rect = el.getBoundingClientRect();
  const barTop = window.innerHeight - 96;
  return rect.bottom > barTop && rect.top < window.innerHeight;
}

function MobileBookBar() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const nodes = [
        ...document.querySelectorAll("#book-lesson button[type='submit'], #book-gig button[type='submit']"),
        document.querySelector("footer"),
      ].filter((node): node is Element => Boolean(node));
      setBlocked(nodes.some(overlapsBar));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pt-2 transition-transform duration-200 ease-out md:hidden",
        blocked && "pointer-events-none translate-y-full",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={blocked}
    >
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2 rounded-2xl bg-hero p-2 shadow-[0_10px_40px_rgb(0_0_0/0.28)]">
        <a
          href="/#book-lesson"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-background text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
        >
          Book a lesson
        </a>
        <a
          href="/#book-gig"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-hero-foreground/35 text-sm font-medium text-hero-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
        >
          Book a gig
        </a>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <div id="top" className="min-h-dvh bg-background">
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <ValueProp />
        <Features />
        <Gigs />
        <Pricing />
        <Testimonials />
        <StartSection />
      </main>
      <SiteFooter />
      <MobileBookBar />
    </div>
  );
}
