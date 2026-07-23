import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { FormSection, FormField } from "@/components/admin/form-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { ListItemActions } from "@/components/admin/list-item-actions";
import {
  updateLotsCatalogAction,
  createLotAction,
  moveLotUpAction,
  moveLotDownAction,
  deleteLotAction,
} from "./actions";

export default async function LotesPage({
  searchParams,
}: {
  searchParams: { status?: string; message?: string };
}) {
  const { lotsCatalog, lots } = await getSiteContent();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Lotes</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">
          Cadastre quantos lotes quiser. No site, os cards se organizam automaticamente em
          linhas de 3 no desktop.
        </p>
      </div>

      <FormMessage status={searchParams.status} message={searchParams.message} />

      <form action={updateLotsCatalogAction} className="flex flex-col gap-5">
        <FormSection title="Textos da vitrine de lotes">
          <FormField label="Selo" name="eyebrow" defaultValue={lotsCatalog.eyebrow} required />
          <FormField as="textarea" label="Título" name="heading" defaultValue={lotsCatalog.heading} required />
          <FormField as="textarea" label="Parágrafo" name="paragraph" defaultValue={lotsCatalog.paragraph} required />
          <FormField as="textarea" label="Observação (rodapé)" name="footnote" defaultValue={lotsCatalog.footnote} required />
          <FormField
            as="textarea"
            label="Mensagem do WhatsApp (por lote)"
            name="whatsappMessageTemplate"
            defaultValue={lotsCatalog.whatsappMessageTemplate}
            required
            hint="Use {lote} para inserir o nome do lote na mensagem."
          />
        </FormSection>
        <div>
          <SubmitButton>Salvar textos</SubmitButton>
        </div>
      </form>

      <section className="rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
        <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-ink">Lotes cadastrados</h2>

        <div className="mt-5 flex flex-col gap-3">
          {lots.length === 0 ? <p className="text-sm text-ink-soft">Nenhum lote cadastrado ainda.</p> : null}
          {lots.map((lot, index) => (
            <form
              key={lot.id}
              className="flex flex-col gap-3 rounded-xl border border-stone bg-paper p-4 mobile:flex-row mobile:items-center mobile:justify-between"
            >
              <input type="hidden" name="id" value={lot.id} />
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-extrabold uppercase text-ink">{lot.name || "(sem nome)"}</p>
                <p className="mt-0.5 truncate text-xs text-ink-soft">
                  {lot.area || "—"} · {lot.price || "—"} · {lot.status}
                  {lot.featured ? " · Destaque" : ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/lotes/${lot.id}`}
                  className="rounded-lg border border-stone px-3 py-1.5 text-xs font-semibold uppercase text-ink hover:bg-stone-soft"
                >
                  Editar
                </Link>
                <ListItemActions
                  moveUpAction={index > 0 ? moveLotUpAction : undefined}
                  moveDownAction={index < lots.length - 1 ? moveLotDownAction : undefined}
                  deleteAction={deleteLotAction}
                  deleteConfirmMessage={`Remover "${lot.name}"? Essa ação não pode ser desfeita.`}
                />
              </div>
            </form>
          ))}
        </div>

        <form action={createLotAction} className="mt-5 flex flex-col gap-2 border-t border-stone pt-5 mobile:flex-row mobile:items-end">
          <label className="block flex-1">
            <span className="block text-sm font-semibold text-ink">Novo lote</span>
            <input
              name="name"
              required
              placeholder="Ex: Lote 08 — Quadra C"
              className="mt-1.5 w-full rounded-xl border border-stone bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-red focus:ring-1 focus:ring-red"
            />
          </label>
          <SubmitButton>+ Adicionar lote</SubmitButton>
        </form>
      </section>
    </div>
  );
}
