export function SubmitButton({
  children = "Salvar alterações",
  formAction,
}: {
  children?: React.ReactNode;
  formAction?: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red px-5 font-display text-xs font-bold uppercase tracking-[0.1em] text-cta-primary-text shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
    >
      {children}
    </button>
  );
}
