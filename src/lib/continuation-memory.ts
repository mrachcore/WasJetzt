import type { Career } from "@/data/careers";
import { getExplorationProfile, type ExplorationTendency } from "@/lib/exploration-memory";
import { readSavedCareerSlugs } from "@/lib/saved-careers";

export const CONTINUATION_CONTEXT_KEY = "wasjetzt.continuationContext";
export const CONTINUATION_CONTEXT_EVENT = "wasjetzt:continuation-context-changed";

type ContinuationContext = {
  lastHomepageEmotion?: string;
  lastResultDirection?: string;
  lastWegeFilters?: string[];
  updatedAt?: string;
};

export type ContinuationSnapshot = {
  dominantDirection: string;
  enoughHistory: boolean;
  lastHomepageEmotion?: string;
  lastResultDirection?: string;
  lastWegeFilters: string[];
  recentlyComparedCareers: Career[];
  recentlyViewedCareers: Career[];
  savedCareers: Career[];
  summary: string;
};

const directionLabels: Record<ExplorationTendency, string> = {
  bewegung: "bei bewegteren Arbeitsleben",
  chaos: "bei unruhigeren, echten Momenten",
  direkt: "bei direkter Arbeit",
  drinnen: "bei Arbeitsleben drinnen",
  "draußen": "bei Arbeitsleben mit mehr Draußen",
  kreativ: "bei gestaltenden Wegen",
  menschen: "bei Arbeitsleben mit Menschen",
  praktisch: "bei praktischen Wegen",
  ruhe: "bei ruhigeren Arbeitsleben",
  sichtbar: "bei Dingen, die sichtbar fertig werden",
  struktur: "bei strukturierteren Arbeitsleben",
};

export function getContinuationContext(sourceCareers: Career[]): ContinuationSnapshot {
  const exploration = getExplorationProfile();
  const context = readContinuationContext();
  const savedSlugs = readSavedCareerSlugs();
  const savedCareers = slugsToCareers(savedSlugs, sourceCareers);
  const recentlyViewedCareers = slugsToCareers(
    exploration.memory.viewedCareers,
    sourceCareers,
  );
  const recentlyComparedCareers = slugsToCareers(
    exploration.memory.comparedCareers,
    sourceCareers,
  );
  const dominantDirection =
    context.lastResultDirection ??
    getQuietDirectionLabel(exploration.dominantTendencies) ??
    "";
  const enoughHistory =
    savedCareers.length > 0 ||
    recentlyViewedCareers.length >= 2 ||
    recentlyComparedCareers.length >= 2 ||
    Boolean(dominantDirection || context.lastHomepageEmotion || context.lastWegeFilters?.length);

  return {
    dominantDirection,
    enoughHistory,
    lastHomepageEmotion: context.lastHomepageEmotion,
    lastResultDirection: context.lastResultDirection,
    lastWegeFilters: context.lastWegeFilters ?? [],
    recentlyComparedCareers,
    recentlyViewedCareers,
    savedCareers,
    summary: getContinuationSummary({
      dominantDirection,
      lastHomepageEmotion: context.lastHomepageEmotion,
      lastResultDirection: context.lastResultDirection,
      lastWegeFilters: context.lastWegeFilters ?? [],
      recentlyViewedCareers,
      savedCareers,
    }),
  };
}

export function getRecentArbeitsleben(sourceCareers: Career[]) {
  const exploration = getExplorationProfile();

  return slugsToCareers(exploration.memory.viewedCareers, sourceCareers);
}

export function getQuietDirectionLabel(tendencies: ExplorationTendency[]) {
  return tendencies.map((tendency) => directionLabels[tendency]).find(Boolean) ?? "";
}

export function rememberHomepageEmotion(label: string) {
  writeContinuationContext({ ...readContinuationContext(), lastHomepageEmotion: label });
}

export function rememberResultDirection(label: string) {
  writeContinuationContext({ ...readContinuationContext(), lastResultDirection: label });
}

export function rememberWegeFilters(labels: string[]) {
  writeContinuationContext({ ...readContinuationContext(), lastWegeFilters: labels });
}

function getContinuationSummary({
  dominantDirection,
  lastHomepageEmotion,
  lastResultDirection,
  lastWegeFilters,
  recentlyViewedCareers,
  savedCareers,
}: {
  dominantDirection: string;
  lastHomepageEmotion?: string;
  lastResultDirection?: string;
  lastWegeFilters: string[];
  recentlyViewedCareers: Career[];
  savedCareers: Career[];
}) {
  if (lastResultDirection) {
    return `Du hattest dir zuletzt die Richtung ${lastResultDirection} aufgehoben.`;
  }

  if (savedCareers[0]) {
    return `Du hast dir ${savedCareers[0].title} gemerkt.`;
  }

  if (dominantDirection) {
    return `Du warst gerade eher ${dominantDirection}.`;
  }

  if (lastWegeFilters[0]) {
    return `Du warst zuletzt bei ${lastWegeFilters[0].toLowerCase()}.`;
  }

  if (lastHomepageEmotion) {
    return `Du bist zuletzt von "${lastHomepageEmotion}" losgegangen.`;
  }

  if (recentlyViewedCareers[0]) {
    return `Du warst vorhin bei ${recentlyViewedCareers[0].title}.`;
  }

  return "";
}

function readContinuationContext(): ContinuationContext {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(CONTINUATION_CONTEXT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<ContinuationContext>;

    return {
      lastHomepageEmotion:
        typeof parsed.lastHomepageEmotion === "string"
          ? parsed.lastHomepageEmotion
          : undefined,
      lastResultDirection:
        typeof parsed.lastResultDirection === "string"
          ? parsed.lastResultDirection
          : undefined,
      lastWegeFilters: Array.isArray(parsed.lastWegeFilters)
        ? parsed.lastWegeFilters.filter((item): item is string => typeof item === "string")
        : [],
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : undefined,
    };
  } catch {
    return {};
  }
}

function writeContinuationContext(context: ContinuationContext) {
  if (typeof window === "undefined") return context;

  const nextContext = {
    ...context,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CONTINUATION_CONTEXT_KEY, JSON.stringify(nextContext));
  window.dispatchEvent(
    new CustomEvent(CONTINUATION_CONTEXT_EVENT, { detail: nextContext }),
  );

  return nextContext;
}

function slugsToCareers(slugs: string[], sourceCareers: Career[]) {
  return slugs
    .map((slug) => sourceCareers.find((career) => career.slug === slug))
    .filter((career): career is Career => Boolean(career));
}
