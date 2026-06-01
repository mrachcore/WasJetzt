import type { Career, Situation } from "@/data/careers";

export const EXPLORATION_MEMORY_KEY = "wasjetzt.explorationMemory";
export const EXPLORATION_MEMORY_EVENT = "wasjetzt:exploration-memory-changed";

export const explorationTendencies = [
  "ruhe",
  "menschen",
  "bewegung",
  "struktur",
  "kreativ",
  "direkt",
  "praktisch",
  "chaos",
  "sichtbar",
  "drinnen",
  "draußen",
] as const;

export type ExplorationTendency = (typeof explorationTendencies)[number];

type TendencyScores = Partial<Record<ExplorationTendency, number>>;

type ExplorationMemory = {
  version: 1;
  viewedCareers: string[];
  savedCareers: string[];
  comparedCareers: string[];
  openedObservations: string[];
  selectedFilters: string[];
  clickedPathways: string[];
  clickedSituations: string[];
  tendencies: TendencyScores;
  updatedAt: string;
};

type ExplorationSeed = "bewegung-praktisch" | "menschen-direkt" | "ruhe-struktur";

export type ExplorationProfile = {
  adaptiveTone: "none" | "people" | "practical" | "quiet";
  dominantTendencies: ExplorationTendency[];
  hasAdaptiveConfidence: boolean;
  isQuietLeaning: boolean;
  isPracticalLeaning: boolean;
  isPeopleLeaning: boolean;
  memory: ExplorationMemory;
  signalStrength: number;
};

export type ExplorationDebugSnapshot = ExplorationProfile & {
  suggestions: Pick<Career, "slug" | "title">[];
};

const emptyMemory: ExplorationMemory = {
  version: 1,
  viewedCareers: [],
  savedCareers: [],
  comparedCareers: [],
  openedObservations: [],
  selectedFilters: [],
  clickedPathways: [],
  clickedSituations: [],
  tendencies: {},
  updatedAt: "",
};

export const explorationSignalWeights = {
  careerView: 0.22,
  careerSave: 1.05,
  compare: 0.68,
  filterUse: 0.72,
  observationOpen: 0.34,
  pathwayClick: 0.52,
  situationClick: 0.46,
} as const;

export const explorationScoreCaps = {
  min: -2,
  max: 6,
} as const;

export const explorationConfidenceThreshold = {
  dominantScore: 1.8,
  signalStrength: 2.6,
  totalPositiveScore: 3.2,
} as const;

const writeDecayFactor = 0.965;

const careerTendencies: Record<string, TendencyScores> = {
  "fachinformatiker-systemintegration": {
    ruhe: 1.4,
    struktur: 1.2,
    drinnen: 1,
    chaos: -0.3,
  },
  bauzeichner: { ruhe: 1.3, struktur: 1.3, drinnen: 1, sichtbar: 0.4 },
  "kaufmann-bueromanagement": { ruhe: 0.8, struktur: 1.5, drinnen: 1 },
  mediengestalter: { kreativ: 1.4, ruhe: 0.6, sichtbar: 0.8, drinnen: 1 },
  florist: { kreativ: 1.2, menschen: 0.5, sichtbar: 1, praktisch: 0.7 },
  friseur: { kreativ: 0.9, menschen: 1.2, sichtbar: 1.1, direkt: 0.7 },
  elektroniker: {
    bewegung: 1.3,
    praktisch: 1.4,
    sichtbar: 1.1,
    direkt: 0.7,
  },
  tischler: {
    bewegung: 0.9,
    praktisch: 1.5,
    sichtbar: 1.3,
    kreativ: 0.4,
  },
  mechatroniker: { praktisch: 1.4, struktur: 0.7, bewegung: 0.8 },
  industriemechaniker: { praktisch: 1.4, bewegung: 0.8, struktur: 0.7 },
  "fachkraft-lagerlogistik": {
    bewegung: 1,
    struktur: 1.4,
    praktisch: 1.1,
    sichtbar: 0.7,
  },
  koch: { bewegung: 1.2, praktisch: 1.2, chaos: 1, sichtbar: 0.8 },
  veranstaltungstechniker: {
    bewegung: 1.2,
    praktisch: 1,
    chaos: 1,
    sichtbar: 0.9,
  },
  pflegefachkraft: { menschen: 1.5, direkt: 1, praktisch: 0.8, chaos: 0.7 },
  notfallsanitaeter: {
    menschen: 1.1,
    bewegung: 1.2,
    direkt: 1.5,
    chaos: 1.1,
  },
  "medizinische-fachangestellte": {
    menschen: 1.2,
    struktur: 0.8,
    direkt: 0.8,
    drinnen: 1,
  },
  erzieher: { menschen: 1.5, direkt: 0.7, chaos: 0.8 },
  verkaeufer: { menschen: 1.2, direkt: 0.8, bewegung: 0.5 },
  zugbegleiter: { menschen: 1, bewegung: 1.1, direkt: 0.8, chaos: 0.7 },
  tierpfleger: {
    ruhe: 0.8,
    praktisch: 1,
    bewegung: 0.8,
    menschen: -0.2,
  },
};

const filterTendencies: Record<string, TendencyScores> = {
  ruhe: { ruhe: 1.2, struktur: 0.5, menschen: -0.2 },
  menschen: { menschen: 0.7, ruhe: 0.4 },
  bewegung: { bewegung: 1.2, praktisch: 0.8 },
  struktur: { struktur: 1.2, ruhe: 0.5, chaos: -0.2 },
  echtes: { direkt: 0.8, menschen: 0.8, praktisch: 0.4 },
  ueberraschung: { kreativ: 0.9, sichtbar: 0.5 },
};

function hasStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readMemory(): ExplorationMemory {
  if (!hasStorage()) return { ...emptyMemory };

  try {
    const raw = window.localStorage.getItem(EXPLORATION_MEMORY_KEY);
    if (!raw) return { ...emptyMemory };

    const parsed = JSON.parse(raw) as Partial<ExplorationMemory>;

    return {
      ...emptyMemory,
      ...parsed,
      tendencies: sanitizeTendencies(parsed.tendencies),
      viewedCareers: sanitizeStringArray(parsed.viewedCareers),
      savedCareers: sanitizeStringArray(parsed.savedCareers),
      comparedCareers: sanitizeStringArray(parsed.comparedCareers),
      openedObservations: sanitizeStringArray(parsed.openedObservations),
      selectedFilters: sanitizeStringArray(parsed.selectedFilters),
      clickedPathways: sanitizeStringArray(parsed.clickedPathways),
      clickedSituations: sanitizeStringArray(parsed.clickedSituations),
      version: 1,
    };
  } catch {
    return { ...emptyMemory };
  }
}

function writeMemory(memory: ExplorationMemory) {
  if (!hasStorage()) return memory;

  const nextMemory = {
    ...memory,
    tendencies: softenTendencies(memory.tendencies),
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(EXPLORATION_MEMORY_KEY, JSON.stringify(nextMemory));
  window.dispatchEvent(
    new CustomEvent(EXPLORATION_MEMORY_EVENT, { detail: nextMemory }),
  );

  return nextMemory;
}

function updateMemory(
  listKey:
    | "clickedPathways"
    | "clickedSituations"
    | "comparedCareers"
    | "openedObservations"
    | "savedCareers"
    | "selectedFilters"
    | "viewedCareers",
  value: string,
  tendencies: TendencyScores,
) {
  const memory = readMemory();

  return writeMemory({
    ...memory,
    [listKey]: prependRecent(memory[listKey], value),
    tendencies: addTendencies(decayTendencies(memory.tendencies), tendencies),
  });
}

function prependRecent(values: string[], value: string) {
  return [value, ...values.filter((item) => item !== value)].slice(0, 48);
}

function addTendencies(current: TendencyScores, incoming: TendencyScores) {
  const next = { ...current };

  for (const tendency of explorationTendencies) {
    const value = incoming[tendency] ?? 0;
    if (value !== 0) {
      next[tendency] = (next[tendency] ?? 0) + value;
    }
  }

  return next;
}

function decayTendencies(tendencies: TendencyScores) {
  return scaleTendencies(tendencies, writeDecayFactor);
}

function softenTendencies(tendencies: TendencyScores) {
  const next: TendencyScores = {};

  for (const tendency of explorationTendencies) {
    const value = tendencies[tendency] ?? 0;
    if (Math.abs(value) > 0.05) {
      next[tendency] = Math.max(
        explorationScoreCaps.min,
        Math.min(explorationScoreCaps.max, Number(value.toFixed(3))),
      );
    }
  }

  return next;
}

function sanitizeTendencies(value: unknown) {
  if (!value || typeof value !== "object") return {};

  const next: TendencyScores = {};
  const record = value as Record<string, unknown>;

  for (const tendency of explorationTendencies) {
    const score = record[tendency];
    if (typeof score === "number" && Number.isFinite(score)) {
      next[tendency] = score;
    }
  }

  return next;
}

function sanitizeStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function getCareerTendencies(slug: string, weight: number) {
  return scaleTendencies(careerTendencies[slug] ?? {}, weight);
}

function getFilterTendencies(toneOrLabel: string, weight: number) {
  return scaleTendencies(filterTendencies[toneOrLabel] ?? {}, weight);
}

function scaleTendencies(tendencies: TendencyScores, weight: number) {
  const next: TendencyScores = {};

  for (const tendency of explorationTendencies) {
    const value = tendencies[tendency];
    if (value) next[tendency] = value * weight;
  }

  return next;
}

function scoreCareer(career: Career, profile: ExplorationProfile) {
  const tendencies = careerTendencies[career.slug] ?? {};
  const openedObservationBoost = profile.memory.openedObservations.some((item) =>
    item.startsWith(`${career.slug}:`),
  )
    ? 0.42
    : 0;

  return openedObservationBoost + explorationTendencies.reduce((total, tendency) => {
    return total + (profile.memory.tendencies[tendency] ?? 0) * (tendencies[tendency] ?? 0);
  }, 0);
}

function scoreSituation(situation: Situation, profile: ExplorationProfile) {
  return situation.slugs.reduce((total, slug) => {
    const tendencies = careerTendencies[slug] ?? {};

    return (
      total +
      explorationTendencies.reduce((sum, tendency) => {
        return (
          sum +
          (profile.memory.tendencies[tendency] ?? 0) *
            (tendencies[tendency] ?? 0)
        );
      }, 0)
    );
  }, 0);
}

export function trackCareerView(slug: string) {
  return updateMemory(
    "viewedCareers",
    slug,
    getCareerTendencies(slug, explorationSignalWeights.careerView),
  );
}

export function trackCareerSave(slug: string) {
  return updateMemory(
    "savedCareers",
    slug,
    getCareerTendencies(slug, explorationSignalWeights.careerSave),
  );
}

export function trackCompare(slugs: string[]) {
  let memory = readMemory();

  for (const slug of slugs) {
    memory = {
      ...memory,
      comparedCareers: prependRecent(memory.comparedCareers, slug),
      tendencies: addTendencies(
        decayTendencies(memory.tendencies),
        getCareerTendencies(slug, explorationSignalWeights.compare),
      ),
    };
  }

  return writeMemory(memory);
}

export function trackFilterUse(toneOrLabel: string) {
  return updateMemory(
    "selectedFilters",
    toneOrLabel,
    getFilterTendencies(toneOrLabel, explorationSignalWeights.filterUse),
  );
}

export function trackObservationOpen(slug: string, observation: string) {
  return updateMemory(
    "openedObservations",
    `${slug}:${observation}`,
    getCareerTendencies(slug, explorationSignalWeights.observationOpen),
  );
}

export function trackPathwayClick(prompt: string, slugs: string[]) {
  const tendencies = slugs.reduce(
    (score, slug) =>
      addTendencies(
        score,
        getCareerTendencies(
          slug,
          explorationSignalWeights.pathwayClick / Math.max(1, slugs.length),
        ),
      ),
    {} as TendencyScores,
  );

  return updateMemory("clickedPathways", prompt, tendencies);
}

export function trackSituationClick(situation: Situation) {
  const tendencies = situation.slugs.reduce(
    (score, slug) =>
      addTendencies(
        score,
        getCareerTendencies(
          slug,
          explorationSignalWeights.situationClick /
            Math.max(1, situation.slugs.length),
        ),
      ),
    {} as TendencyScores,
  );

  return updateMemory("clickedSituations", situation.prompt, tendencies);
}

export function resetExplorationMemory() {
  return writeMemory({ ...emptyMemory });
}

export function seedExplorationProfile(seed: ExplorationSeed) {
  const seededMemory: Record<ExplorationSeed, ExplorationMemory> = {
    "ruhe-struktur": {
      ...emptyMemory,
      viewedCareers: [
        "fachinformatiker-systemintegration",
        "bauzeichner",
        "kaufmann-bueromanagement",
      ],
      savedCareers: ["bauzeichner"],
      comparedCareers: [
        "fachinformatiker-systemintegration",
        "fachkraft-lagerlogistik",
      ],
      selectedFilters: ["ruhe", "struktur"],
      clickedPathways: ["Wenn dir daran eher die Ruhe gefÃ¤llt"],
      clickedSituations: ["Wenn Menschen dich schnell leer machen"],
      tendencies: {
        drinnen: 1.7,
        ruhe: 4.2,
        struktur: 4.4,
      },
    },
    "bewegung-praktisch": {
      ...emptyMemory,
      viewedCareers: ["elektroniker", "tischler", "veranstaltungstechniker"],
      savedCareers: ["elektroniker"],
      comparedCareers: ["elektroniker", "tischler"],
      selectedFilters: ["bewegung"],
      clickedPathways: ["Wenn dir daran eher das Sichtbare gefÃ¤llt"],
      clickedSituations: ["Wenn du am Ende vom Tag sehen willst, dass etwas fertig ist"],
      tendencies: {
        bewegung: 4.4,
        praktisch: 4.5,
        sichtbar: 3.6,
      },
    },
    "menschen-direkt": {
      ...emptyMemory,
      viewedCareers: [
        "pflegefachkraft",
        "notfallsanitaeter",
        "medizinische-fachangestellte",
      ],
      savedCareers: ["notfallsanitaeter"],
      comparedCareers: ["pflegefachkraft", "notfallsanitaeter"],
      selectedFilters: ["echtes", "menschen"],
      clickedPathways: ["Wenn dir daran eher die NÃ¤he gefÃ¤llt"],
      clickedSituations: ["Wenn du etwas willst, das nicht komplett sinnlos wirkt"],
      tendencies: {
        direkt: 4.1,
        menschen: 4.6,
        praktisch: 1.2,
      },
    },
  };

  return writeMemory(seededMemory[seed]);
}

export function getExplorationProfile(): ExplorationProfile {
  const memory = readMemory();
  const signalStrength = getSignalStrength(memory);
  const totalPositiveScore = explorationTendencies.reduce(
    (total, tendency) => total + Math.max(0, memory.tendencies[tendency] ?? 0),
    0,
  );
  const dominantTendencies = explorationTendencies
    .filter((tendency) => (memory.tendencies[tendency] ?? 0) > 0.8)
    .sort((a, b) => (memory.tendencies[b] ?? 0) - (memory.tendencies[a] ?? 0))
    .slice(0, 3);
  const dominantScore = dominantTendencies[0]
    ? (memory.tendencies[dominantTendencies[0]] ?? 0)
    : 0;
  const quietScore = (memory.tendencies.ruhe ?? 0) + (memory.tendencies.struktur ?? 0);
  const practicalScore =
    (memory.tendencies.bewegung ?? 0) +
    (memory.tendencies.praktisch ?? 0) +
    (memory.tendencies.sichtbar ?? 0);
  const peopleScore =
    (memory.tendencies.menschen ?? 0) + (memory.tendencies.direkt ?? 0);
  const hasAdaptiveConfidence =
    signalStrength >= explorationConfidenceThreshold.signalStrength &&
    dominantScore >= explorationConfidenceThreshold.dominantScore &&
    totalPositiveScore >= explorationConfidenceThreshold.totalPositiveScore;
  const isQuietLeaning =
    hasAdaptiveConfidence && quietScore > practicalScore + 1.1 && quietScore > peopleScore + 0.8;
  const isPracticalLeaning =
    hasAdaptiveConfidence && practicalScore > quietScore + 0.9 && practicalScore > peopleScore + 0.5;
  const isPeopleLeaning =
    hasAdaptiveConfidence && peopleScore > quietScore + 0.8 && peopleScore > practicalScore + 0.4;

  return {
    adaptiveTone: isQuietLeaning
      ? "quiet"
      : isPracticalLeaning
        ? "practical"
        : isPeopleLeaning
          ? "people"
          : "none",
    dominantTendencies,
    hasAdaptiveConfidence,
    isQuietLeaning,
    isPracticalLeaning,
    isPeopleLeaning,
    memory,
    signalStrength,
  };
}

function getSignalStrength(memory: ExplorationMemory) {
  return (
    memory.viewedCareers.length * 0.35 +
    memory.savedCareers.length * 1.45 +
    memory.comparedCareers.length * 1 +
    memory.openedObservations.length * 0.55 +
    memory.selectedFilters.length * 0.95 +
    memory.clickedPathways.length * 0.9 +
    memory.clickedSituations.length * 0.85
  );
}

export function getAdaptiveCareerSuggestions<T extends Career>(
  sourceCareers: T[],
  limit = sourceCareers.length,
) {
  const profile = getExplorationProfile();

  if (!profile.hasAdaptiveConfidence) return sourceCareers.slice(0, limit);

  return [...sourceCareers]
    .map((career, index) => ({
      career,
      index,
      score: scoreCareer(career, profile),
    }))
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;

      if (Math.abs(scoreDiff) < 0.45) return a.index - b.index;
      return scoreDiff;
    })
    .slice(0, limit)
    .map(({ career }) => career);
}

export function getAdaptiveSituations<T extends Situation>(sourceSituations: T[]) {
  const profile = getExplorationProfile();

  if (!profile.hasAdaptiveConfidence) return sourceSituations;

  return [...sourceSituations]
    .map((situation, index) => ({
      index,
      score: scoreSituation(situation, profile),
      situation,
    }))
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;

      if (Math.abs(scoreDiff) < 0.6) return a.index - b.index;
      return scoreDiff;
    })
    .map(({ situation }) => situation);
}

export function getAdaptiveFilterOrder<T extends { label: string; tone: string }>(
  filters: T[],
) {
  const profile = getExplorationProfile();

  if (!profile.hasAdaptiveConfidence) return filters;

  return [...filters]
    .map((filter, index) => {
      const tendencies = filterTendencies[filter.tone] ?? {};
      const score = explorationTendencies.reduce((total, tendency) => {
        return (
          total +
          (profile.memory.tendencies[tendency] ?? 0) * (tendencies[tendency] ?? 0)
        );
      }, 0);

      return { filter, index, score };
    })
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;

      if (Math.abs(scoreDiff) < 0.5) return a.index - b.index;
      return scoreDiff;
    })
    .map(({ filter }) => filter);
}

export function getExplorationDebugSnapshot(sourceCareers: Career[]) {
  const profile = getExplorationProfile();

  return {
    ...profile,
    suggestions: getAdaptiveCareerSuggestions(sourceCareers, 8).map((career) => ({
      slug: career.slug,
      title: career.title,
    })),
  } satisfies ExplorationDebugSnapshot;
}
