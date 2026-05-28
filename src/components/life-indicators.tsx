import type {
  Career,
  LifeIndicatorValue,
  LifeIndicators,
} from "@/data/careers";
import { cn } from "@/lib/utils";

export type LifeIndicatorKey = keyof LifeIndicators;

type LifeIndicatorDefinition = {
  key: LifeIndicatorKey;
  label: string;
};

export const lifeIndicatorDefinitions: LifeIndicatorDefinition[] = [
  { key: "ruhe", label: "Ruhe" },
  { key: "menschen", label: "Menschen" },
  { key: "bewegung", label: "Bewegung" },
  { key: "struktur", label: "Struktur" },
  { key: "sichtbaresErgebnis", label: "Sichtbar" },
];

const indicatorWeight: Record<LifeIndicatorValue, number> = {
  low: 1,
  medium: 3,
  high: 5,
};

const indicatorPriority: LifeIndicatorKey[] = [
  "ruhe",
  "struktur",
  "sichtbaresErgebnis",
  "bewegung",
  "menschen",
];
const segmentWidths = ["basis-[16%]", "basis-[22%]", "basis-[19%]", "basis-[25%]", "basis-[18%]"];
const segmentHeights = ["h-1", "h-1.5", "h-1", "h-1.5", "h-1"];

export function getIndicatorWeight(value: LifeIndicatorValue) {
  return indicatorWeight[value];
}

export function getPrimaryLifeIndicators(career: Career, limit = 2) {
  return [...lifeIndicatorDefinitions]
    .sort((a, b) => {
      const weightDiff =
        getIndicatorWeight(career.lifeIndicators[b.key]) -
        getIndicatorWeight(career.lifeIndicators[a.key]);

      return (
        weightDiff ||
        indicatorPriority.indexOf(a.key) - indicatorPriority.indexOf(b.key)
      );
    })
    .slice(0, limit);
}

export function LifeIndicatorLine({
  className,
  label,
  value,
}: {
  className?: string;
  label: string;
  value: LifeIndicatorValue;
}) {
  const activeSegments = getIndicatorWeight(value);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="w-24 shrink-0 truncate text-xs text-muted-foreground sm:w-44">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="flex flex-1 items-center gap-1.5"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            className={cn(
              "rounded-full bg-white/[0.06] transition duration-700 ease-out",
              segmentWidths[index],
              segmentHeights[index],
              index < activeSegments && "bg-primary/40",
              index === activeSegments - 1 && "bg-primary/50",
            )}
            key={`${label}-${index}`}
          />
        ))}
      </span>
    </div>
  );
}

export function MiniLifeIndicators({
  career,
  className,
  limit = 2,
}: {
  career: Career;
  className?: string;
  limit?: number;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {getPrimaryLifeIndicators(career, limit).map((indicator) => (
        <LifeIndicatorLine
          key={indicator.key}
          label={indicator.label.toLowerCase()}
          value={career.lifeIndicators[indicator.key]}
        />
      ))}
    </div>
  );
}

export function LifeIndicatorSnapshot({
  career,
  className,
}: {
  career: Career;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.025] p-4 sm:grid-cols-2",
        className,
      )}
    >
      {lifeIndicatorDefinitions.map((indicator) => (
        <LifeIndicatorLine
          key={indicator.key}
          label={indicator.label}
          value={career.lifeIndicators[indicator.key]}
        />
      ))}
    </div>
  );
}
