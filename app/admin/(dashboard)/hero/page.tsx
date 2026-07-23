import { getSiteContent } from "@/lib/content";
import { FormSection, FormField } from "@/components/admin/form-field";
import { VideoUploadField } from "@/components/admin/video-upload-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateHeroAction } from "./actions";

export default async function HeroPage({
  searchParams,
}: {
  searchParams: { status?: string; message?: string };
}) {
  const { hero } = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Topo (Hero)</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
        Primeira seção que o visitante vê ao abrir o site.
      </p>

      <div className="mt-6">
        <FormMessage status={searchParams.status} message={searchParams.message} />

        <form action={updateHeroAction} className="flex flex-col gap-5">
          <FormSection title="Título e texto" description="Use *palavra* para destacar uma palavra em vermelho no título.">
            <FormField label="Selo (acima do título)" name="badgeText" defaultValue={hero.badgeText} required />
            <FormField
              as="textarea"
              label="Título"
              name="heading"
              defaultValue={hero.heading}
              required
              hint="Ex: Seu lote na *Praia da Lagoinha* está disponível agora."
            />
            <FormField as="textarea" label="Parágrafo" name="paragraph" defaultValue={hero.paragraph} required />
          </FormSection>

          <FormSection title="Botão principal e localização">
            <FormField label="Texto do botão" name="primaryCtaText" defaultValue={hero.primaryCtaText} required />
            <FormField label="Link do botão" name="primaryCtaHref" defaultValue={hero.primaryCtaHref} required hint="Ex: #lotes" />
            <FormField label="Cidade" name="locationLabel" defaultValue={hero.locationLabel} required />
            <FormField label="Destaque da localização" name="locationHighlight" defaultValue={hero.locationHighlight} required />
          </FormSection>

          <FormSection title="Vídeo de fundo">
            <VideoUploadField label="Vídeo" name="videoUrl" currentUrl={hero.videoUrl} hint="MP4, até 100MB." />
            <FormField label="Selo sobre o vídeo" name="videoBadgeText" defaultValue={hero.videoBadgeText} required />
          </FormSection>

          <FormSection title="Cartão flutuante (sobre o vídeo)">
            <FormField label="Selo" name="floatingEyebrow" defaultValue={hero.floatingEyebrow} required />
            <FormField label="Título" name="floatingTitle" defaultValue={hero.floatingTitle} required />
            <FormField label="Status" name="floatingStatus" defaultValue={hero.floatingStatus} required />
            <FormField label="Texto à esquerda no rodapé" name="floatingFooterLeft" defaultValue={hero.floatingFooterLeft} required />
            <FormField label="Texto à direita no rodapé" name="floatingFooterRight" defaultValue={hero.floatingFooterRight} required />
            <FormField label="Selinho de localização" name="floatingLocationBadge" defaultValue={hero.floatingLocationBadge} required />
          </FormSection>

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
