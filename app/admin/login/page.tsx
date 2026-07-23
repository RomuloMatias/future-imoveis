import { AlertCircle } from "lucide-react";
import { loginAction } from "@/app/admin/login/actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; redirectTo?: string };
}) {
  const redirectTo = searchParams.redirectTo ?? "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-soft px-4">
      <div className="w-full max-w-sm rounded-2xl border border-stone bg-surface p-6 shadow-card">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-ink">Future Imóveis</p>
        <h1 className="mt-1 font-display text-lg font-extrabold uppercase text-ink">Painel de conteúdo</h1>

        {searchParams.error === "invalid" ? (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red/30 bg-red/10 px-3 py-2.5 text-sm text-red-deep">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Usuário ou senha incorretos.
          </div>
        ) : null}
        {searchParams.error === "config" ? (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red/30 bg-red/10 px-3 py-2.5 text-sm text-red-deep">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Login ainda não configurado. Defina ADMIN_USERNAME e ADMIN_PASSWORD no servidor.
          </div>
        ) : null}

        <form action={loginAction} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <label className="block">
            <span className="block text-sm font-semibold text-ink">Usuário</span>
            <input
              name="username"
              required
              autoFocus
              autoComplete="username"
              className="mt-1.5 w-full rounded-xl border border-stone bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-red focus:ring-1 focus:ring-red"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-ink">Senha</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border border-stone bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-red focus:ring-1 focus:ring-red"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-red font-display text-xs font-bold uppercase tracking-[0.1em] text-cta-primary-text"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
