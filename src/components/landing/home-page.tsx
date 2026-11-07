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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MobileBookBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("start");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-3 backdrop-blur-md md:hidden",
        hidden && "hidden",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <Button asChild className="h-11">
          <a href="/#book-lesson">Book a lesson</a>
        </Button>
        <Button asChild variant="outline" className="h-11">
          <a href="/#book-gig">Book a gig</a>
        </Button>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <div id="top" className="min-h-dvh bg-background">
      <SiteHeader />
      <main id="main" tabIndex={-1} className="pb-24 outline-none md:pb-0">
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
