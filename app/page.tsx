import { HeroSection } from "@/components/sections/hero-section";
import { InfrastructureSection } from "@/components/sections/infrastructure-section";
import { LotsCatalog } from "@/components/sections/lots-catalog";
import { ProofSection } from "@/components/sections/proof-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <LotsCatalog />
      <InfrastructureSection />
      <ProofSection />
      <FinalCtaSection />
    </main>
  );
}
