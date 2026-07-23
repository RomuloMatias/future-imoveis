import { HeroSection } from "@/components/sections/hero-section";
import { InfrastructureSection } from "@/components/sections/infrastructure-section";
import { LotsCatalog } from "@/components/sections/lots-catalog";
import { ProofSection } from "@/components/sections/proof-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader settings={content.settings} />
      <HeroSection content={content.hero} />
      <LotsCatalog
        content={content.lotsCatalog}
        lots={content.lots}
        projectName={content.settings.projectName}
        whatsappNumber={content.settings.whatsappNumber}
      />
      <InfrastructureSection content={content.infrastructure} />
      <ProofSection content={content.proof} />
      <FinalCtaSection content={content.finalCta} whatsappNumber={content.settings.whatsappNumber} />
    </main>
  );
}
