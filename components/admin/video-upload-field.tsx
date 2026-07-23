"use client";

import { useState } from "react";

export function VideoUploadField({
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
    <div className="mobile:col-span-2">
      <span className="block text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-ink-soft">{hint}</span> : null}

      <div className="mt-2 flex flex-col gap-3 mobile:flex-row mobile:items-center">
        {preview ? (
          <video
            src={preview}
            muted
            playsInline
            controls
            className="h-28 w-48 shrink-0 rounded-xl border border-stone bg-[#18191a] object-cover"
          />
        ) : (
          <div className="flex h-28 w-48 shrink-0 items-center justify-center rounded-xl border border-dashed border-stone bg-stone-soft text-xs text-ink-soft">
            Sem vídeo
          </div>
        )}

        <input type="hidden" name={`${name}__current`} value={currentUrl ?? ""} />
        <input
          type="file"
          name={name}
          accept="video/mp4,video/webm,video/quicktime"
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
