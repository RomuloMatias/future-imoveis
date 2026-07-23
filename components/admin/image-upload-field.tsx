"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

export function ImageUploadField({
  label,
  name,
  currentUrl,
  hint,
}: {
  label: string;
  name: string;
  currentUrl?: string;
  hint?: string;
}) {
  const [preview, setPreview] = useState<string | undefined>(currentUrl);

  return (
    <div>
      <span className="block text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-ink-soft">{hint}</span> : null}

      <div className="mt-2 flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-stone bg-stone-soft">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageOff className="h-5 w-5 text-graphite-soft" aria-hidden="true" />
          )}
        </div>

        <input type="hidden" name={`${name}__current`} value={currentUrl ?? ""} />
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="block w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-stone-soft file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:text-ink hover:file:bg-stone"
        />
      </div>
    </div>
  );
}
