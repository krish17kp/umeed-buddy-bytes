import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { CTASection } from "@/components/sections/cta";

import { CrisisBanner } from "@/components/ui/crisis-banner";
import { MentalHealthDisclaimer } from "@/components/ui/disclaimer";

const Index = () => {
  return (
    <div className="min-h-screen bg-calm-gradient">
      <header />

      <main>
        <HeroSection />

        {/* Crisis support - always visible */}
        <section className="py-8 bg-background/50">
          <div className="container">
            <CrisisBanner />
          </div>
        </section>

        <FeaturesSection />

        {/* Mental health disclaimer */}
        <section className="py-8">
          <div className="container">
            <MentalHealthDisclaimer />
          </div>
        </section>

        <CTASection />
      </main>

      <footer />
    </div>
  );
};

export default Index;
