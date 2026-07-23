import { FormField } from "@/components/admin/form-field";
import { FormMessage } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { changePasswordAction } from "./actions";

export default function SenhaPage({
  searchParams,
}: {
  searchParams: { status?: string; message?: string };
}) {
  return (
    <div>
      <h1 className="font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink">Minha senha</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-ink-soft">Altere a senha de acesso ao painel.</p>

      <div className="mt-6 max-w-md">
        <FormMessage status={searchParams.status} message={searchParams.message} />

        <form action={changePasswordAction} className="flex flex-col gap-4 rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
          <FormField label="Senha atual" name="currentPassword" type="password" required />
          <FormField label="Nova senha" name="newPassword" type="password" required hint="Mínimo de 8 caracteres." />
          <FormField label="Confirmar nova senha" name="confirmPassword" type="password" required />
          <div>
            <SubmitButton>Trocar senha</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
