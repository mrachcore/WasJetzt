import type { Career } from "@/data/careers";
import { cn } from "@/lib/utils";

export function PracticalSignals({
  career,
  className,
  label = "meistens",
  limit = 3,
}: {
  career: Career;
  className?: string;
  label?: string;
  limit?: number;
}) {
  return (
    <div className={cn("text-xs text-muted-foreground", className)}>
      <span className="text-primary/75">{label}:</span>{" "}
      <span className="text-muted-foreground/90">
        {career.practicalSignals.slice(0, limit).join(" · ")}
      </span>
    </div>
  );
}
