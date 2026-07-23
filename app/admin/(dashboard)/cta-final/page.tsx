import { getSiteContent } from "@/lib/content";
import { FormSection, FormField } from "@/components/admin/form-field";
import { VideoUploadField } from "@/components/admin/video-upload-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateFinalCtaAction } from "./actions";

export default async function CtaFinalPage({
  searchParams,
}: {
  searchParams: { status?: string; message?: string };
}) {
  const { finalCta } = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Chamada final</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">Última seção da página, antes do rodapé.</p>

      <div className="mt-6">
        <FormMessage status={searchParams.status} message={searchParams.message} />

        <form action={updateFinalCtaAction} className="flex flex-col gap-5">
          <FormSection title="Texto" description="Use *palavra* para destacar uma palavra em vermelho no título.">
            <FormField label="Selo" name="eyebrow" defaultValue={finalCta.eyebrow} required />
            <FormField as="textarea" label="Título" name="heading" defaultValue={finalCta.heading} required />
            <FormField as="textarea" label="Parágrafo" name="paragraph" defaultValue={finalCta.paragraph} required />
          </FormSection>

          <FormSection title="Botões">
            <FormField label="Texto do botão principal" name="primaryCtaText" defaultValue={finalCta.primaryCtaText} required />
            <FormField label="Texto do link do WhatsApp" name="secondaryCtaText" defaultValue={finalCta.secondaryCtaText} required />
            <FormField
              as="textarea"
              label="Mensagem enviada no WhatsApp"
              name="whatsappMessage"
              defaultValue={finalCta.whatsappMessage}
              required
            />
            <FormField label="Texto de rodapé" name="footerText" defaultValue={finalCta.footerText} required />
          </FormSection>

          <FormSection title="Vídeo de fundo">
            <VideoUploadField label="Vídeo" name="videoUrl" currentUrl={finalCta.videoUrl} hint="MP4, até 100MB." />
          </FormSection>

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
