"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

type Action = (formData: FormData) => void | Promise<void>;

export function ListItemActions({
  moveUpAction,
  moveDownAction,
  deleteAction,
  deleteConfirmMessage = "Remover este item?",
}: {
  moveUpAction?: Action;
  moveDownAction?: Action;
  deleteAction?: Action;
  deleteConfirmMessage?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {moveUpAction ? (
        <button
          type="submit"
          formAction={moveUpAction}
          aria-label="Mover para cima"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone bg-paper text-ink-soft hover:bg-stone-soft"
        >
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ) : null}
      {moveDownAction ? (
        <button
          type="submit"
          formAction={moveDownAction}
          aria-label="Mover para baixo"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone bg-paper text-ink-soft hover:bg-stone-soft"
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ) : null}
      {deleteAction ? (
        <button
          type="submit"
          formAction={deleteAction}
          aria-label="Excluir"
          onClick={(event) => {
            if (!confirm(deleteConfirmMessage)) event.preventDefault();
          }}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red/30 bg-paper text-red hover:bg-red/10"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
