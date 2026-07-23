type BaseProps = {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: string;
  defaultValue?: string | number;
};

type TextareaProps = BaseProps & {
  as: "textarea";
  defaultValue?: string;
  rows?: number;
};

export function FormField(props: InputProps | TextareaProps) {
  const { label, name, hint, required } = props;

  return (
    <label className={`block ${props.as === "textarea" ? "mobile:col-span-2" : ""}`}>
      <span className="block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-red"> *</span> : null}
      </span>
      {hint ? <span className="mt-0.5 block text-xs text-ink-soft">{hint}</span> : null}
      {props.as === "textarea" ? (
        <textarea
          name={name}
          defaultValue={props.defaultValue}
          required={required}
          rows={props.rows ?? 3}
          className="mt-1.5 w-full rounded-xl border border-stone bg-paper px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-red focus:ring-1 focus:ring-red"
        />
      ) : (
        <input
          type={props.type ?? "text"}
          name={name}
          defaultValue={props.defaultValue}
          required={required}
          className="mt-1.5 w-full rounded-xl border border-stone bg-paper px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-red focus:ring-1 focus:ring-red"
        />
      )}
    </label>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-2.5">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 shrink-0 rounded border-stone text-red focus:ring-red"
      />
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint ? <span className="block text-xs text-ink-soft">{hint}</span> : null}
      </span>
    </label>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-ink-soft">{hint}</span> : null}
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-xl border border-stone bg-paper px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none focus:border-red focus:ring-1 focus:ring-red"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone bg-surface p-5 shadow-card tablet:p-6">
      <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.08em] text-ink">{title}</h2>
      {description ? <p className="mt-1 text-sm text-ink-soft">{description}</p> : null}
      <div className="mt-5 grid gap-4 mobile:grid-cols-2">{children}</div>
    </section>
  );
}
