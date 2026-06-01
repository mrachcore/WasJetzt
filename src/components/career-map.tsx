"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ContinuationLine } from "@/components/continuation-line";
import { MiniLifeIndicators, getIndicatorWeight } from "@/components/life-indicators";
import { PracticalSignals } from "@/components/practical-signals";
import type { Career, LifeIndicators } from "@/data/careers";
import { cn } from "@/lib/utils";
import {
  EXPLORATION_MEMORY_EVENT,
  getExplorationProfile,
  trackPathwayClick,
  type ExplorationProfile,
} from "@/lib/exploration-memory";

type MapCareer = Career & {
  map: {
    x: number;
    y: number;
    visible: number;
  };
};

type AxisKey = "ruhe" | "menschen" | "bewegung" | "struktur" | "sichtbaresErgebnis";

type ExplorationTrail = {
  id: string;
  prompt: string;
  careers: MapCareer[];
};

const fieldSize = {
  height: 720,
  width: 1040,
};

const positionNudges: Record<string, { x: number; y: number }> = {
  "fachinformatiker-systemintegration": { x: -5, y: -3 },
  bauzeichner: { x: 4, y: -6 },
  mediengestalter: { x: 9, y: 8 },
  pflegefachkraft: { x: -2, y: -4 },
  "medizinische-fachangestellte": { x: 8, y: 1 },
  erzieher: { x: -9, y: 8 },
  elektroniker: { x: -5, y: 7 },
  mechatroniker: { x: 6, y: -5 },
  industriemechaniker: { x: 8, y: 8 },
  tischler: { x: -10, y: -2 },
  "fachkraft-lagerlogistik": { x: 4, y: 7 },
  koch: { x: -2, y: 10 },
  veranstaltungstechniker: { x: 10, y: 7 },
  zugbegleiter: { x: 9, y: 4 },
  tierpfleger: { x: -7, y: 10 },
  florist: { x: -3, y: 4 },
  friseur: { x: 5, y: -5 },
  verkaeufer: { x: -6, y: 7 },
  "kaufmann-bueromanagement": { x: 6, y: 7 },
  notfallsanitaeter: { x: -8, y: 6 },
};

const signalLabels: Record<AxisKey, string> = {
  ruhe: "ruhig",
  menschen: "menschennah",
  bewegung: "bewegter",
  struktur: "strukturiert",
  sichtbaresErgebnis: "sichtbar",
};

export function CareerMap({ careers }: { careers: Career[] }) {
  const mapCareers = useMemo(() => careers.map(toMapCareer), [careers]);
  const searchParams = useSearchParams();
  const requestedCareerSlug = searchParams.get("career");
  const requestedValidSlug = mapCareers.some(
    (career) => career.slug === requestedCareerSlug,
  )
    ? requestedCareerSlug
    : null;
  const [manualSelectedSlug, setManualSelectedSlug] = useState<string | null>(
    null,
  );
  const selectedSlug =
    manualSelectedSlug ?? requestedValidSlug ?? mapCareers[0]?.slug ?? "";
  const [expandedTrailSlug, setExpandedTrailSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [profile, setProfile] = useState<ExplorationProfile | null>(null);

  useEffect(() => {
    const syncProfile = () => setProfile(getExplorationProfile());

    syncProfile();
    window.addEventListener(EXPLORATION_MEMORY_EVENT, syncProfile);
    window.addEventListener("storage", syncProfile);

    return () => {
      window.removeEventListener(EXPLORATION_MEMORY_EVENT, syncProfile);
      window.removeEventListener("storage", syncProfile);
    };
  }, []);

  const selectedCareer =
    mapCareers.find((career) => career.slug === selectedSlug) ?? mapCareers[0];
  const hoveredCareer = hoveredSlug
    ? mapCareers.find((career) => career.slug === hoveredSlug)
    : null;
  const neighbors = useMemo(
    () => getClosestCareers(selectedCareer, mapCareers, 5),
    [mapCareers, selectedCareer],
  );
  const closestSlugs = new Set(neighbors.slice(0, 3).map((career) => career.slug));
  const trails = useMemo(
    () => getExplorationTrails(selectedCareer, mapCareers),
    [mapCareers, selectedCareer],
  );
  const neighborSlugs = new Set(neighbors.map((career) => career.slug));
  const trailSlugs = new Set(
    trails.flatMap((trail) => trail.careers.map((career) => career.slug)),
  );
  const adaptiveSlugs = new Set(
    profile?.hasAdaptiveConfidence
      ? getAdaptiveMapCareers(mapCareers, profile).map((career) => career.slug)
      : [],
  );
  const trailSummary = selectedCareer
    ? getTrailSummary(selectedCareer, profile)
    : "";
  const showMoreTrails = expandedTrailSlug === selectedSlug;
  const visibleTrails = showMoreTrails ? trails : trails.slice(0, 3);
  const hiddenTrailCount = Math.max(0, trails.length - 3);

  function selectCareer(slug: string) {
    setManualSelectedSlug(slug);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/karte?career=${slug}`);
    }
  }

  function selectTrailCareer(career: MapCareer, trail: ExplorationTrail) {
    trackPathwayClick(
      trail.prompt,
      trail.careers.map((trailCareer) => trailCareer.slug),
    );
    selectCareer(career.slug);
  }

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div className="glass-surface overflow-hidden rounded-[1.6rem]">
        <div className="border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>Ruhe</span>
            <span>Menschen</span>
          </div>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-muted-foreground/75">
            Links ruhiger. Rechts mehr Menschen. Oben strukturierter. Unten bewegter.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center text-xs text-muted-foreground/80 [writing-mode:vertical-rl] sm:left-5">
            Struktur
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-4 z-10 flex items-center text-xs text-muted-foreground/80 [writing-mode:vertical-rl] sm:right-5">
            Bewegung
          </div>

          <div className="career-map-scroll overflow-auto overscroll-contain">
            <div
              className="relative min-h-[620px] min-w-[860px]"
              style={{
                height: fieldSize.height,
                width: fieldSize.width,
              }}
            >
              <div className="pointer-events-none absolute inset-10 rounded-[2rem] border border-white/[0.05] bg-[radial-gradient(circle_at_24%_20%,rgba(239,231,207,0.055),transparent_24%),radial-gradient(circle_at_76%_72%,rgba(156,174,177,0.052),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.023),rgba(255,255,255,0.008))]" />
              <div className="pointer-events-none absolute left-1/2 top-16 h-[calc(100%-8rem)] w-px bg-white/[0.055]" />
              <div className="pointer-events-none absolute left-16 top-1/2 h-px w-[calc(100%-8rem)] bg-white/[0.055]" />

              {selectedCareer ? (
                <div
                  className="pointer-events-none absolute rounded-full border border-primary/20 bg-primary/[0.055] transition-all duration-700"
                  style={{
                    height: 230,
                    left: selectedCareer.map.x - 115,
                    top: selectedCareer.map.y - 115,
                    width: 230,
                  }}
                />
              ) : null}

              {mapCareers.map((career, index) => {
                const selected = career.slug === selectedCareer?.slug;
                const nearby = neighborSlugs.has(career.slug);
                const closest = closestSlugs.has(career.slug);
                const inTrail = trailSlugs.has(career.slug);
                const adaptive = adaptiveSlugs.has(career.slug);
                const dimmed =
                  selectedCareer && !selected && !nearby && !inTrail && !adaptive;

                return (
                  <button
                    aria-pressed={selected}
                    className={cn(
                      "group absolute w-32 -translate-x-1/2 -translate-y-1/2 rounded-[0.95rem] border border-white/12 bg-[#192217]/88 px-3 py-2 text-left shadow-[0_9px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-500 ease-out hover:-translate-y-[calc(50%+0.2rem)] hover:border-primary/32 hover:bg-[#202b1e]/92 focus-visible:z-30",
                      selected && "z-30 border-primary/55 bg-primary/[0.18] text-foreground shadow-[0_12px_34px_rgba(0,0,0,0.24)]",
                      closest && !selected && "z-20 border-primary/42 bg-white/[0.1]",
                      nearby && !selected && !closest && "z-20 border-primary/28 bg-white/[0.072]",
                      inTrail && !selected && !nearby && "border-white/18 bg-white/[0.058]",
                      adaptive && !selected && "border-primary/35 bg-primary/[0.075]",
                      dimmed && "opacity-45",
                    )}
                    key={career.slug}
                    onBlur={() => setHoveredSlug(null)}
                    onClick={() => selectCareer(career.slug)}
                    onFocus={() => setHoveredSlug(career.slug)}
                    onMouseEnter={() => setHoveredSlug(career.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    style={{
                      left: career.map.x,
                      top: career.map.y,
                    }}
                    type="button"
                  >
                    <span
                      className="wj-marker mb-2 scale-[0.62]"
                      data-tone={markerTone(career)}
                    />
                    <span className="block text-sm font-semibold leading-tight text-foreground/95">
                      {career.title}
                    </span>
                    <span className="mt-1 block text-[0.7rem] leading-4 text-muted-foreground/95">
                      {primarySignalText(career.lifeIndicators)}
                    </span>
                    <span className="mt-2 hidden border-t border-white/10 pt-2 text-[0.68rem] leading-4 text-muted-foreground group-hover:block group-focus-visible:block">
                      {career.laterNotices[index % career.laterNotices.length]}
                    </span>
                    {adaptive ? (
                      <span className="mt-2 block h-1 w-8 rounded-full bg-primary/45" />
                    ) : null}
                    <span className="sr-only">{index + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <aside className="glass-soft rounded-[1.45rem] p-5 lg:sticky lg:top-24">
        {profile?.hasAdaptiveConfidence ? (
          <div className="mb-5 rounded-[1rem] border border-primary/15 bg-primary/[0.06] px-3.5 py-3 text-sm leading-6 text-primary/85">
            Vielleicht kommst du hier öfter vorbei.
          </div>
        ) : null}

        {selectedCareer ? (
          <>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-primary/80" />
              <div>
                <p className="text-xs text-primary/85">Gerade hier</p>
                <h2 className="mt-1 text-2xl font-semibold leading-tight">
                  {selectedCareer.title}
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {selectedCareer.short}
            </p>
            <ContinuationLine careerSlug={selectedCareer.slug} className="mt-4" />

            <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.03] p-3.5">
              <p className="text-xs text-primary/85">Das merkst du erst später</p>
              <p className="mt-2 text-sm leading-6 text-foreground/88">
                {(hoveredCareer ?? selectedCareer).laterNotices[0]}
              </p>
            </div>

            <div className="mt-4 border-l border-primary/20 pl-4">
              <p className="text-xs text-primary/85">
                Was man dort öfter sagt
              </p>
              <p className="mt-2 text-lg font-semibold leading-7 text-foreground/90">
                {(hoveredCareer ?? selectedCareer).realSentences[0]}
              </p>
            </div>

            <MiniLifeIndicators career={selectedCareer} className="mt-5" limit={3} />
            <PracticalSignals career={selectedCareer} className="mt-5" />

            {trails.length > 0 ? (
              <section className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm text-primary">Von hier aus</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {trailSummary}
                </p>
                <div className="mt-5 space-y-4">
                  {visibleTrails.map((trail) => (
                    <div
                      className="rounded-[1.05rem] border border-white/10 bg-white/[0.025] p-3.5"
                      key={trail.id}
                    >
                      <p className="text-sm font-medium leading-5 text-foreground/90">
                        {trail.prompt}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {trail.careers.map((career) => (
                          <button
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
                            key={`${trail.id}-${career.slug}`}
                            onClick={() => selectTrailCareer(career, trail)}
                            type="button"
                          >
                            {career.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {trails.length > 3 ? (
                  <button
                    className="mt-4 rounded-full px-3 py-1.5 text-sm text-primary/80 transition duration-500 hover:bg-white/[0.055] hover:text-primary"
                    onClick={() =>
                      setExpandedTrailSlug((current) =>
                        current === selectedSlug ? null : selectedSlug,
                      )
                    }
                    type="button"
                  >
                    {showMoreTrails
                      ? "weniger Richtungen"
                      : `mehr Richtungen (${hiddenTrailCount})`}
                  </button>
                ) : null}
              </section>
            ) : null}

            <section className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm text-primary">Warum das nah liegt</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {getNearReasons(selectedCareer, neighbors[0]).map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </section>

            <Link
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.12] px-4 py-2 text-sm text-primary transition duration-500 hover:-translate-y-0.5 hover:bg-primary/[0.18]"
              href={`/careers/${selectedCareer.slug}`}
            >
              Alltag ansehen
              <ArrowRight className="size-4" />
            </Link>
          </>
        ) : null}
      </aside>
    </div>
  );
}

function toMapCareer(career: Career): MapCareer {
  const ruhe = getIndicatorWeight(career.lifeIndicators.ruhe);
  const menschen = getIndicatorWeight(career.lifeIndicators.menschen);
  const bewegung = getIndicatorWeight(career.lifeIndicators.bewegung);
  const struktur = getIndicatorWeight(career.lifeIndicators.struktur);
  const sichtbar = getIndicatorWeight(career.lifeIndicators.sichtbaresErgebnis);
  const nudge = positionNudges[career.slug] ?? { x: 0, y: 0 };

  return {
    ...career,
    map: {
      x: clamp(140, 900, 520 + (menschen - ruhe) * 76 + nudge.x * 4),
      y: clamp(120, 600, 360 + (bewegung - struktur) * 64 + nudge.y * 3),
      visible: sichtbar,
    },
  };
}

function getClosestCareers(
  selected: MapCareer | undefined,
  careers: MapCareer[],
  limit: number,
) {
  if (!selected) return [];

  return careers
    .filter((career) => career.slug !== selected.slug)
    .map((career, index) => ({
      career,
      distance:
        Math.hypot(career.map.x - selected.map.x, career.map.y - selected.map.y) +
        Math.abs(career.map.visible - selected.map.visible) * 18,
      index,
    }))
    .sort((a, b) => a.distance - b.distance || a.index - b.index)
    .slice(0, limit)
    .map(({ career }) => career);
}

function getAdaptiveMapCareers(careers: MapCareer[], profile: ExplorationProfile) {
  return [...careers]
    .map((career, index) => ({
      career,
      index,
      score:
        axisScore(career.lifeIndicators.ruhe, profile.memory.tendencies.ruhe) +
        axisScore(career.lifeIndicators.menschen, profile.memory.tendencies.menschen) +
        axisScore(career.lifeIndicators.bewegung, profile.memory.tendencies.bewegung) +
        axisScore(career.lifeIndicators.struktur, profile.memory.tendencies.struktur) +
        axisScore(
          career.lifeIndicators.sichtbaresErgebnis,
          profile.memory.tendencies.sichtbar,
        ),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 5)
    .map(({ career }) => career);
}

function getExplorationTrails(
  selected: MapCareer | undefined,
  careers: MapCareer[],
) {
  if (!selected) return [];

  const trailCandidates: ExplorationTrail[] = [
    ...selected.emotionalPathways.map((pathway) => ({
      id: `pathway-${pathway.prompt}`,
      prompt: pathway.prompt,
      careers: pathway.slugs
        .map((slug) => careers.find((career) => career.slug === slug))
        .filter((career): career is MapCareer => Boolean(career)),
    })),
    ...getSignalTrailDefinitions(selected).map((definition) => ({
      id: `signal-${definition.key}`,
      prompt: definition.prompt,
      careers: rankCareersForTrail(selected, careers, definition.keys, definition.preferLowPeople),
    })),
  ];

  const seenPrompts = new Set<string>();
  const seenTrailKeys = new Set<string>();

  return trailCandidates
    .map((trail) => ({
      ...trail,
      careers: uniqueCareers(trail.careers)
        .filter((career) => career.slug !== selected.slug)
        .slice(0, 3),
    }))
    .filter((trail) => {
      if (trail.careers.length < 2 || seenPrompts.has(trail.prompt)) return false;

      const trailKey = trail.careers.map((career) => career.slug).join("|");
      if (seenTrailKeys.has(trailKey)) return false;

      seenPrompts.add(trail.prompt);
      seenTrailKeys.add(trailKey);
      return true;
    })
    .slice(0, 5);
}

function getSignalTrailDefinitions(selected: MapCareer) {
  const indicators = selected.lifeIndicators;
  const definitions: {
    key: string;
    keys: AxisKey[];
    preferLowPeople?: boolean;
    prompt: string;
  }[] = [];

  if (getIndicatorWeight(indicators.ruhe) >= 3) {
    definitions.push({
      key: "ruhe",
      keys: ["ruhe", "struktur"],
      preferLowPeople: true,
      prompt: "Wenn dir daran eher die Ruhe gefällt",
    });
  }

  if (getIndicatorWeight(indicators.struktur) >= 3) {
    definitions.push({
      key: "ordnung",
      keys: ["struktur", "ruhe"],
      prompt: "Wenn du Dinge gern ordnest",
    });
  }

  if (getIndicatorWeight(indicators.menschen) <= 3) {
    definitions.push({
      key: "problemloesen",
      keys: ["struktur", "bewegung", "sichtbaresErgebnis"],
      preferLowPeople: true,
      prompt: "Wenn Problemlösen wichtiger ist als Reden",
    });
  }

  if (getIndicatorWeight(indicators.menschen) >= 5) {
    definitions.push({
      key: "naehe",
      keys: ["menschen", "bewegung"],
      prompt: "Wenn dir echte Nähe im Alltag wichtig ist",
    });
  }

  if (getIndicatorWeight(indicators.bewegung) >= 5) {
    definitions.push({
      key: "bewegung",
      keys: ["bewegung", "sichtbaresErgebnis"],
      prompt: "Wenn du lieber in Bewegung bleibst",
    });
  }

  if (getIndicatorWeight(indicators.sichtbaresErgebnis) >= 5) {
    definitions.push({
      key: "sichtbar",
      keys: ["sichtbaresErgebnis", "bewegung"],
      prompt: "Wenn du sehen willst, was am Ende anders ist",
    });
  }

  return definitions;
}

function rankCareersForTrail(
  selected: MapCareer,
  careers: MapCareer[],
  keys: AxisKey[],
  preferLowPeople = false,
) {
  return careers
    .filter((career) => career.slug !== selected.slug)
    .map((career, index) => {
      const signalScore = keys.reduce((score, key) => {
        const selectedWeight = getIndicatorWeight(selected.lifeIndicators[key]);
        const careerWeight = getIndicatorWeight(career.lifeIndicators[key]);
        return score + careerWeight * 1.2 - Math.abs(selectedWeight - careerWeight) * 0.8;
      }, 0);
      const peoplePenalty = preferLowPeople
        ? getIndicatorWeight(career.lifeIndicators.menschen) * 0.7
        : 0;
      const distancePenalty =
        Math.hypot(career.map.x - selected.map.x, career.map.y - selected.map.y) / 115;

      return {
        career,
        index,
        score: signalScore - peoplePenalty - distancePenalty,
      };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 5)
    .map(({ career }) => career);
}

function uniqueCareers(careers: MapCareer[]) {
  const seen = new Set<string>();

  return careers.filter((career) => {
    if (seen.has(career.slug)) return false;
    seen.add(career.slug);
    return true;
  });
}

function getTrailSummary(
  selected: MapCareer,
  profile: ExplorationProfile | null,
) {
  if (profile?.hasAdaptiveConfidence) {
    if (profile.isQuietLeaning) {
    return "Du landest gerade eher bei ruhigen Wegen.";
    }

    if (profile.isPracticalLeaning) {
      return "Du bleibst gerade eher bei praktischen Tagen.";
    }

    if (profile.isPeopleLeaning) {
      return "Du bleibst öfter dort stehen, wo Menschen nah dran sind.";
    }
  }

  const indicators = selected.lifeIndicators;

  if (getIndicatorWeight(indicators.struktur) >= 5) {
    return "Von hier geht es schnell Richtung Struktur.";
  }

  if (getIndicatorWeight(indicators.ruhe) >= 5) {
    return "Du bist gerade in einer ruhigeren Gegend.";
  }

  if (getIndicatorWeight(indicators.menschen) >= 5) {
    return "Von hier wird der Alltag schnell menschennäher.";
  }

  if (getIndicatorWeight(indicators.bewegung) >= 5) {
    return "Von hier gehen viele Wege eher in Bewegung.";
  }

  return "Von hier liegen ein paar andere Tage nah.";
}

function axisScore(value: "low" | "medium" | "high", tendency = 0) {
  return getIndicatorWeight(value) * Math.max(0, tendency);
}

function getNearReasons(selected: Career, neighbor: Career | undefined) {
  if (!neighbor) return ["Sie liegen im Alltag nah beieinander."];

  const reasons: string[] = [];
  const keys: AxisKey[] = [
    "ruhe",
    "menschen",
    "struktur",
    "bewegung",
    "sichtbaresErgebnis",
  ];

  for (const key of keys) {
    const selectedWeight = getIndicatorWeight(selected.lifeIndicators[key]);
    const neighborWeight = getIndicatorWeight(neighbor.lifeIndicators[key]);

    if (Math.abs(selectedWeight - neighborWeight) <= 1 && reasons.length < 3) {
      reasons.push(`Beide eher ${signalLabels[key]}.`);
    }
  }

  if (
    getIndicatorWeight(selected.lifeIndicators.menschen) <= 1 &&
    getIndicatorWeight(neighbor.lifeIndicators.menschen) <= 1
  ) {
    reasons.push("Wenig Menschenkontakt.");
  }

  return reasons.slice(0, 3);
}

function primarySignalText(indicators: LifeIndicators) {
  const keys: AxisKey[] = [
    "ruhe",
    "menschen",
    "bewegung",
    "struktur",
    "sichtbaresErgebnis",
  ];

  return keys
    .filter((key) => getIndicatorWeight(indicators[key]) >= 5)
    .slice(0, 2)
    .map((key) => signalLabels[key])
    .join(" / ");
}

function markerTone(career: Career) {
  if (
    getIndicatorWeight(career.lifeIndicators.menschen) >
    getIndicatorWeight(career.lifeIndicators.ruhe)
  ) {
    return "menschen";
  }

  if (
    getIndicatorWeight(career.lifeIndicators.bewegung) >
    getIndicatorWeight(career.lifeIndicators.struktur)
  ) {
    return "bewegung";
  }

  return "struktur";
}

function clamp(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}
