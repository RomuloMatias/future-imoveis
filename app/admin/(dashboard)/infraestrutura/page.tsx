import { getSiteContent } from "@/lib/content";
import { FormSection, FormField, SelectField } from "@/components/admin/form-field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { ListItemActions } from "@/components/admin/list-item-actions";
import { iconRegistry } from "@/lib/icons";
import {
  updateInfrastructureTextAction,
  addExperienceAction,
  updateExperienceAction,
  moveExperienceUpAction,
  moveExperienceDownAction,
  deleteExperienceAction,
  addTechnicalFeatureAction,
  updateTechnicalFeatureAction,
  moveTechnicalFeatureUpAction,
  moveTechnicalFeatureDownAction,
  deleteTechnicalFeatureAction,
} from "./actions";

const iconOptions = Object.entries(iconRegistry).map(([value, { label }]) => ({ value, label }));

export default async function InfraestruturaPage({
  searchParams,
}: {
  searchParams: { status?: string; message?: string };
}) {
  const { infrastructure } = await getSiteContent();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Infraestrutura</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
          Experiências de lazer e itens técnicos do empreendimento.
        </p>
      </div>

      <FormMessage status={searchParams.status} message={searchParams.message} />

      <form action={updateInfrastructureTextAction} className="flex flex-col gap-5">
        <FormSection title="Texto de introdução">
          <FormField label="Selo" name="eyebrow" defaultValue={infrastructure.eyebrow} required />
          <FormField as="textarea" label="Título" name="heading" defaultValue={infrastructure.heading} required />
          <FormField as="textarea" label="Parágrafo" name="paragraph" defaultValue={infrastructure.paragraph} required />
        </FormSection>

        <FormSection title="Bloco de itens técnicos">
          <FormField label="Selo" name="technicalEyebrow" defaultValue={infrastructure.technicalEyebrow} required />
          <FormField as="textarea" label="Título" name="technicalHeading" defaultValue={infrastructure.technicalHeading} required />
        </FormSection>

        <FormSection title="Banner de validação ambiental">
          <FormField label="Título" name="bannerTitle" defaultValue={infrastructure.bannerTitle} required />
          <FormField as="textarea" label="Descrição" name="bannerDescription" defaultValue={infrastructure.bannerDescription} required />
        </FormSection>

        <div>
          <SubmitButton>Salvar textos</SubmitButton>
        </div>
      </form>

      <section className="rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
        <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-ink">Experiências de lazer</h2>
        <p className="mt-1 text-sm text-ink-soft">Os cards de lazer com foto (piscina, beach tennis, etc.).</p>

        <div className="mt-5 flex flex-col gap-3">
          {infrastructure.experiences.map((experience, index) => (
            <form
              key={index}
              className="flex flex-col gap-3 rounded-xl border border-stone bg-paper p-4 tablet:flex-row tablet:items-start"
            >
              <input type="hidden" name="index" value={index} />
              <div className="tablet:w-56 tablet:shrink-0">
                <ImageUploadField label="Foto" name="image" currentUrl={experience.image} />
              </div>
              <div className="grid flex-1 gap-2 mobile:grid-cols-2">
                <FormField label="Título" name="title" defaultValue={experience.title} required />
                <SelectField label="Ícone (se não houver foto)" name="icon" defaultValue={experience.icon} options={iconOptions} />
                <div className="mobile:col-span-2">
                  <FormField as="textarea" label="Descrição" name="description" defaultValue={experience.description} required rows={2} />
                </div>
              </div>
              <div className="flex items-center gap-2 tablet:flex-col tablet:items-end">
                <SubmitButton formAction={updateExperienceAction}>Salvar</SubmitButton>
                <ListItemActions
                  moveUpAction={index > 0 ? moveExperienceUpAction : undefined}
                  moveDownAction={index < infrastructure.experiences.length - 1 ? moveExperienceDownAction : undefined}
                  deleteAction={deleteExperienceAction}
                  deleteConfirmMessage="Remover esta experiência?"
                />
              </div>
            </form>
          ))}
        </div>

        <form action={addExperienceAction} className="mt-5 border-t border-stone pt-5">
          <SubmitButton>+ Adicionar experiência</SubmitButton>
        </form>
      </section>

      <section className="rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
        <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-ink">Itens técnicos</h2>
        <p className="mt-1 text-sm text-ink-soft">Lista curta com ícone (portaria, vagas, paisagismo, etc.).</p>

        <div className="mt-5 flex flex-col gap-3">
          {infrastructure.technicalFeatures.map((feature, index) => (
            <form
              key={index}
              className="flex flex-col gap-3 rounded-xl border border-stone bg-paper p-4 tablet:flex-row tablet:items-start"
            >
              <input type="hidden" name="index" value={index} />
              <div className="grid flex-1 gap-2 mobile:grid-cols-3">
                <FormField label="Título" name="title" defaultValue={feature.title} required />
                <FormField label="Descrição" name="description" defaultValue={feature.description} required />
                <SelectField label="Ícone" name="icon" defaultValue={feature.icon} options={iconOptions} />
              </div>
              <div className="flex items-center gap-2 tablet:flex-col tablet:items-end">
                <SubmitButton formAction={updateTechnicalFeatureAction}>Salvar</SubmitButton>
                <ListItemActions
                  moveUpAction={index > 0 ? moveTechnicalFeatureUpAction : undefined}
                  moveDownAction={index < infrastructure.technicalFeatures.length - 1 ? moveTechnicalFeatureDownAction : undefined}
                  deleteAction={deleteTechnicalFeatureAction}
                  deleteConfirmMessage="Remover este item?"
                />
              </div>
            </form>
          ))}
        </div>

        <form action={addTechnicalFeatureAction} className="mt-5 border-t border-stone pt-5">
          <SubmitButton>+ Adicionar item técnico</SubmitButton>
        </form>
      </section>
    </div>
  );
}
