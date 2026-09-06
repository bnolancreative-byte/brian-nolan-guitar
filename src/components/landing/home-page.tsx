import { Features } from "@/components/landing/features";
import { Gigs } from "@/components/landing/gigs";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { StartSection } from "@/components/landing/start-section";
import { Testimonials } from "@/components/landing/testimonials";
import { ValueProp } from "@/components/landing/value-prop";

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
    </div>
  );
}
