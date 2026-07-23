import { AlertCircle, CheckCircle2 } from "lucide-react";

export function FormMessage({
  status,
  message,
}: {
  status?: string;
  message?: string;
}) {
  if (status !== "success" && status !== "error") return null;

  const isSuccess = status === "success";

  return (
    <div
      className={`mb-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
        isSuccess ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red/30 bg-red/10 text-red-deep"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <span>{message ?? (isSuccess ? "Alterações salvas." : "Não foi possível salvar.")}</span>
    </div>
  );
}
