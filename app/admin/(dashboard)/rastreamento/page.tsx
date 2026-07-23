import { FormField, FormSection } from "@/components/admin/form-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { getSiteContent } from "@/lib/content";
import { updateTrackingAction } from "./actions";

export default async function TrackingPage({ searchParams }: { searchParams: { status?: string; message?: string } }) {
  const { tracking } = await getSiteContent();
  return (
    <div>
      <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Rastreamento</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
        Configure somente os serviços usados. Um campo vazio mantém aquela integração desativada.
      </p>
      <div className="mt-6">
        <FormMessage status={searchParams.status} message={searchParams.message} />
        <form action={updateTrackingAction} className="flex flex-col gap-5">
          <FormSection title="Google" description="Se configurar GA4 ou Ads pelo GTM, não repita o mesmo ID abaixo.">
            <FormField label="Google Tag Manager" name="gtmId" defaultValue={tracking.gtmId} hint="Ex: GTM-XXXXXXX" />
            <FormField label="Google Analytics 4" name="ga4Id" defaultValue={tracking.ga4Id} hint="Ex: G-XXXXXXXXXX" />
            <FormField label="Google Ads" name="googleAdsId" defaultValue={tracking.googleAdsId} hint="Ex: AW-123456789" />
          </FormSection>
          <FormSection title="Outras plataformas">
            <FormField label="Meta Pixel (Facebook)" name="metaPixelId" defaultValue={tracking.metaPixelId} hint="Somente o ID numérico" />
            <FormField label="Microsoft Clarity" name="clarityId" defaultValue={tracking.clarityId} hint="ID do projeto" />
          </FormSection>
          <div><SubmitButton /></div>
        </form>
      </div>
    </div>
  );
}
