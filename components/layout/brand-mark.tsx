import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Future Imóveis"
      className={cn("block h-9 w-auto", className)}
    >
      <img src="/brand/future-logo.svg" alt="" className="brand-mark-image h-full w-auto" />
    </span>
  );
}
