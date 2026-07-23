import { getSiteContent } from "@/lib/content";
import { FormSection, FormField } from "@/components/admin/form-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { updateProofAction } from "./actions";

export default async function CondicoesPage({
  searchParams,
}: {
  searchParams: { status?: string; message?: string };
}) {
  const { proof } = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Condições</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
        Números da região e o bloco de financiamento direto.
      </p>

      <div className="mt-6">
        <FormMessage status={searchParams.status} message={searchParams.message} />

        <form action={updateProofAction} className="flex flex-col gap-5">
          <FormSection title="Texto de introdução">
            <FormField label="Selo" name="eyebrow" defaultValue={proof.eyebrow} required />
            <FormField as="textarea" label="Título" name="heading" defaultValue={proof.heading} required />
            <FormField as="textarea" label="Parágrafo" name="paragraph" defaultValue={proof.paragraph} required />
          </FormSection>

          <section className="rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-ink">
              Números da região (3 fixos)
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {proof.statistics.map((statistic, index) => (
                <div key={index} className="grid gap-3 rounded-xl border border-stone bg-paper p-4 mobile:grid-cols-4">
                  <FormField label="Prefixo" name={`statistic-${index}-prefix`} defaultValue={statistic.prefix} />
                  <FormField label="Valor" name={`statistic-${index}-value`} type="number" defaultValue={statistic.value} required />
                  <FormField label="Sufixo" name={`statistic-${index}-suffix`} defaultValue={statistic.suffix} required />
                  <FormField label="Legenda" name={`statistic-${index}-label`} defaultValue={statistic.label} required />
                </div>
              ))}
            </div>
          </section>

          <FormSection title="Bloco de financiamento">
            <FormField label="Selo" name="financingEyebrow" defaultValue={proof.financingEyebrow} required />
            <FormField as="textarea" label="Título" name="financingHeading" defaultValue={proof.financingHeading} required />
            <FormField as="textarea" label="Parágrafo" name="financingParagraph" defaultValue={proof.financingParagraph} required />
            <FormField label="Texto acima do preço" name="priceLabel" defaultValue={proof.priceLabel} required />
            <FormField label="Preço em destaque" name="priceValue" defaultValue={proof.priceValue} required />
            <FormField label="Observação abaixo do preço" name="priceNote" defaultValue={proof.priceNote} required />
          </FormSection>

          <section className="rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-ink">
              Itens da lista (3 fixos)
            </h2>
            <div className="mt-5 flex flex-col gap-3">
              {proof.bullets.map((bullet, index) => (
                <FormField key={index} label={`Item ${index + 1}`} name={`bullet-${index}`} defaultValue={bullet} required />
              ))}
            </div>
          </section>

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
