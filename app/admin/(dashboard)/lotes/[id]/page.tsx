import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content";
import { FormSection, FormField, CheckboxField } from "@/components/admin/form-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { ListItemActions } from "@/components/admin/list-item-actions";
import {
  updateLotAction,
  addLotPhotosAction,
  updateLotPhotoAction,
  moveLotPhotoUpAction,
  moveLotPhotoDownAction,
  deleteLotPhotoAction,
} from "./actions";

export default async function LotEditPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { status?: string; message?: string };
}) {
  const content = await getSiteContent();
  const lot = content.lots.find((item) => item.id === params.id);
  if (!lot) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Editar lote</h1>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{lot.name}</p>
      </div>

      <FormMessage status={searchParams.status} message={searchParams.message} />

      <form action={updateLotAction} className="flex flex-col gap-5">
        <input type="hidden" name="id" value={lot.id} />
        <FormSection title="Dados do lote">
          <FormField label="Nome / identificação" name="name" defaultValue={lot.name} required hint='Ex: "Lote 14 — Quadra B"' />
          <FormField label="Metragem" name="area" defaultValue={lot.area} required hint='Ex: "200 m²"' />
          <FormField label="Preço" name="price" defaultValue={lot.price} required hint='Ex: "R$ 59.900"' />
          <FormField label="Condição de pagamento" name="payment" defaultValue={lot.payment} required />
          <FormField label="Status" name="status" defaultValue={lot.status} required hint='Ex: "Disponível" ou "Últimas unidades"' />
          <FormField label="Benefício / diferencial" name="benefit" defaultValue={lot.benefit} required hint='Ex: "A 2 min do mar"' />
        </FormSection>

        <div className="rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
          <CheckboxField
            label="Destacar este lote"
            name="featured"
            defaultChecked={lot.featured}
            hint="Aparece com cor diferenciada no card, no site."
          />
        </div>

        <div>
          <SubmitButton />
        </div>
      </form>

      <section className="rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
        <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-ink">Galeria de fotos</h2>
        <p className="mt-1 text-sm text-ink-soft">A primeira foto é a que aparece primeiro no carrossel do site.</p>

        <div className="mt-5 flex flex-col gap-3">
          {lot.gallery.length === 0 ? <p className="text-sm text-ink-soft">Nenhuma foto ainda.</p> : null}
          {lot.gallery.map((slide, photoIndex) => (
            <form
              key={photoIndex}
              className="flex flex-col gap-3 rounded-xl border border-stone bg-paper p-4 tablet:flex-row tablet:items-start"
            >
              <input type="hidden" name="id" value={lot.id} />
              <input type="hidden" name="photoIndex" value={photoIndex} />
              {slide.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.src} alt="" className="h-20 w-28 shrink-0 rounded-lg border border-stone object-cover" />
              ) : (
                <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg border border-dashed border-stone bg-stone-soft text-xs text-ink-soft">
                  Sem foto
                </div>
              )}
              <div className="grid flex-1 gap-2 mobile:grid-cols-3">
                <label className="block">
                  <span className="block text-xs font-semibold text-ink">Legenda</span>
                  <input
                    name="label"
                    defaultValue={slide.label}
                    className="mt-1 w-full rounded-lg border border-stone bg-paper px-2.5 py-1.5 text-sm text-ink outline-none focus:border-red focus:ring-1 focus:ring-red"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold text-ink">Descrição</span>
                  <input
                    name="description"
                    defaultValue={slide.description}
                    className="mt-1 w-full rounded-lg border border-stone bg-paper px-2.5 py-1.5 text-sm text-ink outline-none focus:border-red focus:ring-1 focus:ring-red"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold text-ink">Texto alternativo</span>
                  <input
                    name="alt"
                    defaultValue={slide.alt}
                    className="mt-1 w-full rounded-lg border border-stone bg-paper px-2.5 py-1.5 text-sm text-ink outline-none focus:border-red focus:ring-1 focus:ring-red"
                  />
                </label>
              </div>
              <div className="flex items-center gap-2 tablet:flex-col tablet:items-end">
                <SubmitButton formAction={updateLotPhotoAction}>Salvar</SubmitButton>
                <ListItemActions
                  moveUpAction={photoIndex > 0 ? moveLotPhotoUpAction : undefined}
                  moveDownAction={photoIndex < lot.gallery.length - 1 ? moveLotPhotoDownAction : undefined}
                  deleteAction={deleteLotPhotoAction}
                  deleteConfirmMessage="Remover esta foto?"
                />
              </div>
            </form>
          ))}
        </div>

        <form action={addLotPhotosAction} className="mt-5 border-t border-stone pt-5">
          <input type="hidden" name="id" value={lot.id} />
          <label className="block">
            <span className="block text-sm font-semibold text-ink">Adicionar fotos</span>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              className="mt-1.5 block w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-stone-soft file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:text-ink hover:file:bg-stone"
            />
          </label>
          <div className="mt-3">
            <SubmitButton>Enviar fotos</SubmitButton>
          </div>
        </form>
      </section>
    </div>
  );
}
