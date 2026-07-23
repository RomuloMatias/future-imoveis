import { getSiteContent } from "@/lib/content";
import { FormSection, FormField } from "@/components/admin/form-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateSettingsAction } from "./actions";

export default async function GeralPage({
  searchParams,
}: {
  searchParams: { status?: string; message?: string };
}) {
  const { settings } = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Geral e WhatsApp</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
        Informações institucionais usadas em todo o site.
      </p>

      <div className="mt-6">
        <FormMessage status={searchParams.status} message={searchParams.message} />

        <form action={updateSettingsAction} className="flex flex-col gap-5">
          <FormSection title="Identidade">
            <FormField label="Nome do site" name="siteName" defaultValue={settings.siteName} required />
            <FormField label="Nome do empreendimento" name="projectName" defaultValue={settings.projectName} required />
            <FormField label="CRECI" name="creci" defaultValue={settings.creci} required />
            <FormField label="Domínio (com https://)" name="domain" defaultValue={settings.domain} required />
          </FormSection>

          <FormSection title="WhatsApp">
            <FormField
              label="Número do WhatsApp"
              name="whatsappNumber"
              defaultValue={settings.whatsappNumber}
              required
              hint="Só números, com DDI e DDD. Ex: 5585999999999"
            />
            <FormField label="Texto do botão no menu" name="headerCtaText" defaultValue={settings.headerCtaText} required />
            <FormField
              as="textarea"
              label="Mensagem padrão (botão do menu)"
              name="whatsappMessageDefault"
              defaultValue={settings.whatsappMessageDefault}
              required
            />
          </FormSection>

          <FormSection title="SEO (Google e compartilhamento)">
            <FormField label="Título (aba do navegador)" name="seoTitle" defaultValue={settings.seoTitle} required />
            <FormField as="textarea" label="Descrição" name="seoDescription" defaultValue={settings.seoDescription} required />
          </FormSection>

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
