"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { CareerDecisionLayer } from "@/components/career-decision-layer";
import {
  LifeIndicatorLine,
  MiniLifeIndicators,
  getIndicatorWeight,
  lifeIndicatorDefinitions,
} from "@/components/life-indicators";
import { PracticalSignals } from "@/components/practical-signals";
import { SaveCareerButton } from "@/components/save-career-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  type Career,
  careers,
  getSituationsForCareer,
} from "@/data/careers";
import { cn } from "@/lib/utils";
import {
  readSavedCareerSlugs,
  writeSavedCareerSlugs,
} from "@/lib/saved-careers";
import {
  EXPLORATION_MEMORY_EVENT,
  getAdaptiveCareerSuggestions,
  getAdaptiveFilterOrder,
  getExplorationProfile,
  trackCompare,
  trackFilterUse,
} from "@/lib/exploration-memory";

type EmotionalFilter = {
  label: string;
  tone: string;
  keywords: string[];
  situations: string[];
  slugs: string[];
};

type CareerSearchDocument = {
  aliasTokens: Set<string>;
  explicitKeywords: Set<string>;
  slug: string;
  textTokens: Set<string>;
  title: string;
  titleTokens: Set<string>;
};

type ExplorationRow = {
  id: string;
  headline: string;
  note: string;
  slugs: string[];
  comparePair?: [string, string];
  compareLabel?: string;
};

const emotionalFilters: EmotionalFilter[] = [
  {
    label: "Ich will meine Ruhe",
    tone: "ruhe",
    keywords: ["ruhig", "ruhe", "allein", "konzentration", "weniger reden", "still"],
    situations: [
      "Wenn Menschen dich schnell leer machen",
      "Wenn du lieber ruhig gut bist als laut auffällig",
      "Wenn du nicht acht Stunden Smalltalk willst",
    ],
    slugs: [
      "fachinformatiker-systemintegration",
      "bauzeichner",
      "fachkraft-lagerlogistik",
      "kaufmann-bueromanagement",
      "tierpfleger",
    ],
  },
  {
    label: "Ich will etwas Echtes",
    tone: "echtes",
    keywords: ["echt", "sinnvoll", "nah", "helfen", "menschen", "alltag"],
    situations: [
      "Wenn du etwas Echtes statt Bürogefühl willst",
      "Wenn du etwas willst, das nicht komplett sinnlos wirkt",
      "Wenn du gern nah dran bist, aber nicht im Mittelpunkt",
    ],
    slugs: [
      "pflegefachkraft",
      "notfallsanitaeter",
      "medizinische-fachangestellte",
      "erzieher",
      "tierpfleger",
    ],
  },
  {
    label: "Ich will nicht nur sitzen",
    tone: "bewegung",
    keywords: ["bewegung", "unterwegs", "werkstatt", "körperlich", "stehen", "draußen"],
    situations: [
      "Wenn du am Ende vom Tag sehen willst, dass etwas fertig ist",
      "Wenn du etwas Echtes statt Bürogefühl willst",
    ],
    slugs: [
      "elektroniker",
      "koch",
      "veranstaltungstechniker",
      "fachkraft-lagerlogistik",
      "zugbegleiter",
      "tischler",
    ],
  },
  {
    label: "Menschen sind okay, aber nicht 8 Stunden",
    tone: "menschen",
    keywords: ["kontakt", "menschen", "smalltalk", "abstand", "hintergrund"],
    situations: [
      "Wenn Menschen dich schnell leer machen",
      "Wenn du nicht acht Stunden Smalltalk willst",
    ],
    slugs: [
      "fachkraft-lagerlogistik",
      "elektroniker",
      "fachinformatiker-systemintegration",
      "florist",
      "tischler",
    ],
  },
  {
    label: "Ich will sehen, dass etwas fertig wird",
    tone: "struktur",
    keywords: ["fertig", "sichtbar", "gemacht", "bauen", "reparieren"],
    situations: ["Wenn du am Ende vom Tag sehen willst, dass etwas fertig ist"],
    slugs: [
      "elektroniker",
      "tischler",
      "florist",
      "koch",
      "industriemechaniker",
      "mediengestalter",
    ],
  },
  {
    label: "Ich will kreativ sein, aber nicht fake",
    tone: "ueberraschung",
    keywords: ["kreativ", "gestalten", "visuell", "schön", "details"],
    situations: ["Wenn du etwas Schönes machen willst, ohne kitschig zu werden"],
    slugs: ["mediengestalter", "florist", "friseur", "tischler"],
  },
  {
    label: "Ich brauche klare Abläufe",
    tone: "struktur",
    keywords: ["struktur", "abläufe", "ordnung", "sortieren", "überblick"],
    situations: [
      "Wenn du schnell von Chaos müde wirst",
      "Wenn du lieber ruhig gut bist als laut auffällig",
    ],
    slugs: [
      "fachkraft-lagerlogistik",
      "kaufmann-bueromanagement",
      "bauzeichner",
      "medizinische-fachangestellte",
    ],
  },
  {
    label: "Ich will lieber machen als reden",
    tone: "bewegung",
    keywords: ["machen", "handwerk", "reparieren", "werkzeug", "praktisch"],
    situations: [
      "Wenn Schule nie richtig zu dir gepasst hat",
      "Wenn du lieber Dinge verstehst als präsentierst",
    ],
    slugs: [
      "elektroniker",
      "tischler",
      "mechatroniker",
      "industriemechaniker",
      "koch",
    ],
  },
];

const explorationRows: ExplorationRow[] = [
  {
    id: "quiet",
    headline: "Ruhiger als viele denken",
    note: "Nicht komplett allein. Aber oft genug Raum, um nicht dauernd zu reagieren.",
    slugs: [
      "fachinformatiker-systemintegration",
      "bauzeichner",
      "kaufmann-bueromanagement",
      "tierpfleger",
      "florist",
    ],
    comparePair: ["fachinformatiker-systemintegration", "bauzeichner"],
    compareLabel: "Wie anders fühlt sich das an?",
  },
  {
    id: "less-people",
    headline: "Weniger Menschen als erwartet",
    note: "Kontakt ist da. Er bestimmt aber nicht jede Minute.",
    slugs: [
      "elektroniker",
      "fachkraft-lagerlogistik",
      "tischler",
      "mechatroniker",
      "mediengestalter",
    ],
  },
  {
    id: "visible",
    headline: "Dinge sichtbar fertig machen",
    note: "Am Ende steht etwas, läuft etwas oder sieht anders aus als vorher.",
    slugs: [
      "elektroniker",
      "tischler",
      "koch",
      "florist",
      "friseur",
      "veranstaltungstechniker",
    ],
    comparePair: ["elektroniker", "tischler"],
    compareLabel: "Nicht dieselbe Arbeit. Aber ähnliches Gefühl.",
  },
  {
    id: "movement",
    headline: "Mehr Bewegung, weniger Meetings",
    note: "Tage, die eher über Wege, Hände und direkte Dinge funktionieren.",
    slugs: [
      "elektroniker",
      "fachkraft-lagerlogistik",
      "zugbegleiter",
      "veranstaltungstechniker",
      "koch",
    ],
    comparePair: ["elektroniker", "fachkraft-lagerlogistik"],
    compareLabel: "Wie anders fühlt sich das zu Elektroniker an?",
  },
  {
    id: "structure",
    headline: "Für Leute, die schnell müde von Chaos werden",
    note: "Nicht stressfrei. Aber mit Abläufen, an denen man sich festhalten kann.",
    slugs: [
      "fachkraft-lagerlogistik",
      "kaufmann-bueromanagement",
      "bauzeichner",
      "medizinische-fachangestellte",
      "fachinformatiker-systemintegration",
    ],
  },
  {
    id: "repair",
    headline: "Menschen, die lieber reparieren als präsentieren",
    note: "Erst schauen, messen, testen. Dann reden, wenn es wieder Sinn ergibt.",
    slugs: [
      "elektroniker",
      "mechatroniker",
      "industriemechaniker",
      "fachinformatiker-systemintegration",
      "tischler",
    ],
    comparePair: ["mechatroniker", "fachinformatiker-systemintegration"],
    compareLabel: "Gleiches Suchen, anderer Tagesrhythmus.",
  },
  {
    id: "everyday",
    headline: "Mehr Alltag als Karrieregefühl",
    note: "Nicht glänzend. Eher ein Tag, der irgendwann vertrauter wird.",
    slugs: [
      "verkaeufer",
      "medizinische-fachangestellte",
      "fachkraft-lagerlogistik",
      "zugbegleiter",
      "pflegefachkraft",
    ],
  },
];

const searchIntentGroups = [
  {
    id: "less-talking",
    phrases: [
      "nicht den ganzen tag reden",
      "wenig reden",
      "weniger reden",
      "nicht so viel smalltalk",
      "wenig menschen",
      "nicht dauernd menschen",
    ],
    tokens: ["wenig", "reden", "smalltalk", "menschen"],
    slugs: [
      "fachinformatiker-systemintegration",
      "bauzeichner",
      "fachkraft-lagerlogistik",
      "tischler",
      "tierpfleger",
    ],
  },
  {
    id: "quiet",
    phrases: ["etwas ruhiges", "was ruhiges", "zu laut", "ich will ruhe"],
    tokens: ["ruhig", "ruhe", "leise"],
    slugs: [
      "bauzeichner",
      "fachinformatiker-systemintegration",
      "kaufmann-bueromanagement",
      "florist",
      "tierpfleger",
    ],
  },
  {
    id: "not-sitting",
    phrases: ["nicht nur sitzen", "nicht den ganzen tag sitzen", "mehr bewegung"],
    tokens: ["sitzen", "bewegung", "unterwegs"],
    slugs: [
      "elektroniker",
      "fachkraft-lagerlogistik",
      "zugbegleiter",
      "veranstaltungstechniker",
      "koch",
    ],
  },
  {
    id: "real",
    phrases: ["etwas echtes", "kein bürogefühl", "nichts echtes", "mehr alltag"],
    tokens: ["echt", "echtes", "buero", "buero gefuehl", "alltag"],
    slugs: [
      "pflegefachkraft",
      "notfallsanitaeter",
      "elektroniker",
      "tierpfleger",
      "medizinische-fachangestellte",
    ],
  },
  {
    id: "structure",
    phrases: [
      "chaos nervt",
      "chaos nervt mich",
      "ich brauche struktur",
      "klare abläufe",
      "klare ablaeufe",
      "nicht ständig reagieren",
      "nicht staendig reagieren",
    ],
    tokens: ["chaos", "struktur", "ablaeufe", "ordnung"],
    slugs: [
      "fachkraft-lagerlogistik",
      "kaufmann-bueromanagement",
      "bauzeichner",
      "fachinformatiker-systemintegration",
      "medizinische-fachangestellte",
    ],
  },
  {
    id: "hands",
    phrases: ["etwas mit händen", "etwas mit haenden", "mit den händen", "praktisch arbeiten"],
    tokens: ["haende", "handwerk", "praktisch", "werkzeug"],
    slugs: [
      "elektroniker",
      "tischler",
      "mechatroniker",
      "florist",
      "industriemechaniker",
    ],
  },
  {
    id: "meetings",
    phrases: ["keine meetings", "nicht ständig meetings", "nicht staendig meetings"],
    tokens: ["meetings", "praesentieren", "präsentieren"],
    slugs: [
      "elektroniker",
      "fachkraft-lagerlogistik",
      "tischler",
      "mechatroniker",
      "tierpfleger",
    ],
  },
];

export default function WegePage() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareNotice, setCompareNotice] = useState("");
  const [allComparedSaved, setAllComparedSaved] = useState(false);
  const [adaptiveFilters, setAdaptiveFilters] = useState(emotionalFilters);
  const [adaptiveNudge, setAdaptiveNudge] = useState("");
  const [adaptiveReady, setAdaptiveReady] = useState(false);
  const [adaptiveRefresh, setAdaptiveRefresh] = useState(0);

  useLockedBodyScroll(compareOpen);

  useEffect(() => {
    const syncExplorationDrift = () => {
      const profile = getExplorationProfile();

      setAdaptiveFilters(getAdaptiveFilterOrder(emotionalFilters));
      setAdaptiveReady(true);
      setAdaptiveRefresh((current) => current + 1);

      if (profile.isQuietLeaning) {
        setAdaptiveNudge("Du bleibst gerade oft bei ruhigeren Wegen hängen.");
      } else if (profile.isPracticalLeaning) {
        setAdaptiveNudge("Im Moment ziehen dich eher direktere Dinge an.");
      } else if (profile.isPeopleLeaning) {
        setAdaptiveNudge("Du kreist gerade eher um direkte Arbeit mit Menschen.");
      } else {
        setAdaptiveNudge("");
      }
    };

    const frame = window.requestAnimationFrame(syncExplorationDrift);
    window.addEventListener(EXPLORATION_MEMORY_EVENT, syncExplorationDrift);
    window.addEventListener("storage", syncExplorationDrift);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(EXPLORATION_MEMORY_EVENT, syncExplorationDrift);
      window.removeEventListener("storage", syncExplorationDrift);
    };
  }, []);

  const careerDocuments = useMemo(
    () => new Map(careers.map((career) => [career.slug, buildCareerDocument(career)])),
    [],
  );

  const resultState = useMemo(() => {
    const selectedFilters = emotionalFilters.filter((filter) =>
      activeFilters.includes(filter.label),
    );

    const intentSlugs = getSearchIntentSlugs(query);
    const searchMatchedCareers = careers.filter((career) => {
      if (intentSlugs.size > 0 && intentSlugs.has(career.slug)) return true;
      return careerMatchesSearch(career, query, careerDocuments.get(career.slug));
    });

    const strictMatches = searchMatchedCareers.filter((career) =>
      careerMatchesFilters(
        career,
        selectedFilters,
        careerDocuments.get(career.slug),
        "and",
      ),
    );

    if (strictMatches.length > 0 || selectedFilters.length === 0) {
      return {
        careers: strictMatches,
        fallback: false,
      };
    }

    return {
      careers: getCloseMatches(searchMatchedCareers, selectedFilters, careerDocuments),
      fallback: true,
    };
  }, [activeFilters, careerDocuments, query]);

  const filteredCareers = useMemo(
    () => {
      void adaptiveRefresh;
      if (!adaptiveReady) return resultState.careers;
      return getAdaptiveCareerSuggestions(resultState.careers);
    },
    [adaptiveReady, adaptiveRefresh, resultState.careers],
  );
  const explorationSurfaceRows = useMemo(
    () => getExplorationRows(filteredCareers, adaptiveNudge),
    [adaptiveNudge, filteredCareers],
  );

  const comparedCareers = compareSlugs
    .map((slug) => careers.find((career) => career.slug === slug))
    .filter((career): career is Career => Boolean(career));

  function toggleFilter(label: string) {
    const filter = emotionalFilters.find((item) => item.label === label);

    setActiveFilters((current) => {
      if (current.includes(label)) {
        return current.filter((item) => item !== label);
      }

      trackFilterUse(filter?.tone ?? label);
      return [...current, label];
    });
  }

  function toggleCompare(slug: string) {
    setCompareNotice("");
    setAllComparedSaved(false);

    setCompareSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= 3) {
        setCompareNotice("Drei reichen erstmal.");
        return current;
      }

      trackCompare([slug]);
      return [...current, slug];
    });
  }

  function saveComparedCareers() {
    const savedSlugs = readSavedCareerSlugs();
    writeSavedCareerSlugs([...compareSlugs, ...savedSlugs]);
    trackCompare(compareSlugs);
    setAllComparedSaved(true);
  }

  function openInlineCompare(pair: [string, string]) {
    trackCompare(pair);
    setAllComparedSaved(false);
    setCompareNotice("");
    setCompareSlugs(pair);
    setCompareOpen(true);
  }

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-5xl px-5 pb-36 pt-12 sm:px-8">
        <div className="relative max-w-3xl">
          <Image
            src="/logo-mark.png"
            alt=""
            width={132}
            height={123}
            className="mark-breathe pointer-events-none absolute -right-8 -top-10 hidden w-28 sm:block"
            priority
          />
          <Badge className="mb-7 text-primary">Ohne richtige Suchbegriffe</Badge>
          <h1 className="text-5xl font-semibold leading-[0.98] sm:text-7xl">
            Wege
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Nicht nach Branche. Eher nach Gefühl. Such nach einem Beruf, einer
            Stimmung oder einfach nach dem, was du im Alltag nicht mehr willst.
          </p>
        </div>

        <div className="sticky top-3 z-20 mt-10 sm:top-5">
          <div className="glass-surface flex items-center gap-3 rounded-[1.45rem] px-4 py-3 sm:px-5">
            <Search className="size-5 shrink-0 text-primary/80" />
            <input
              aria-label="Wege durchsuchen"
              className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Such nach Beruf, Gefühl oder Alltag..."
              type="search"
              value={query}
            />
          </div>
        </div>

        <div className="scrollbar-hide -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {adaptiveFilters.map((filter) => {
            const active = activeFilters.includes(filter.label);

            return (
              <button
                aria-pressed={active}
                className={cn(
                  "choice-surface inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm text-muted-foreground transition duration-500 ease-out hover:-translate-y-0.5 hover:text-foreground active:translate-y-0",
                  active && "border-primary/30 bg-primary/10 text-foreground",
                )}
                key={filter.label}
                onClick={() => toggleFilter(filter.label)}
                type="button"
              >
                <span className="wj-marker scale-75" data-tone={filter.tone} />
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            {filteredCareers.length}{" "}
            {filteredCareers.length === 1 ? "Weg" : "Wege"}
          </p>
          {adaptiveNudge && !query && activeFilters.length === 0 ? (
            <p className="max-w-[18rem] text-right text-primary/80">
              {adaptiveNudge}
            </p>
          ) : null}
          {activeFilters.length || query ? (
            <button
              className="rounded-full px-3 py-1.5 transition hover:bg-white/[0.055] hover:text-foreground"
              onClick={() => {
                setQuery("");
                setActiveFilters([]);
              }}
              type="button"
            >
              wieder lockern
            </button>
          ) : null}
        </div>

        {resultState.fallback ? (
          <Card className="mt-7 p-5 sm:p-6">
            <p className="text-xl font-semibold leading-snug">
              Das ist eine seltene Mischung.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Wir zeigen dir Wege, die zumindest nah dran sind.
            </p>
          </Card>
        ) : null}

        {filteredCareers.length > 0 ? (
          <div className="mt-8 space-y-4 sm:space-y-5">
            {filteredCareers.map((career, index) => (
              <div key={career.slug}>
                <CareerExplorerCard
                  career={career}
                  compareSelected={compareSlugs.includes(career.slug)}
                  onCompare={() => toggleCompare(career.slug)}
                  prominent={index === 0 && Boolean(query || activeFilters.length)}
                />
                {shouldShowExplorationRow(index, filteredCareers.length) ? (
                  <ExplorationSurfaceRow
                    careers={careersForRow(
                      explorationSurfaceRows[
                        Math.floor(index / 3) % explorationSurfaceRows.length
                      ],
                      filteredCareers,
                    )}
                    className={cn(index % 2 === 0 ? "sm:ml-[8%]" : "sm:mr-[8%]")}
                    onCompare={openInlineCompare}
                    row={
                      explorationSurfaceRows[
                        Math.floor(index / 3) % explorationSurfaceRows.length
                      ]
                    }
                  />
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <Card className="mt-10 max-w-2xl p-7 sm:p-9">
            <p className="text-2xl font-semibold leading-snug">
              Nichts gefunden, was direkt passt.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Vielleicht suchst du nicht nach dem richtigen Wort. Versuch eher
              ein Gefühl: Ruhe, Menschen, Bewegung, Chaos, kreativ, draußen.
            </p>
          </Card>
        )}
      </section>

      {compareSlugs.length > 0 ? (
        <CompareBar
          allSaved={allComparedSaved}
          count={compareSlugs.length}
          notice={compareNotice}
          onClear={() => {
            setCompareSlugs([]);
            setCompareNotice("");
            setAllComparedSaved(false);
          }}
          onOpen={() => setCompareOpen(true)}
          onSaveAll={saveComparedCareers}
        />
      ) : null}

      <AnimatePresence>
        {compareOpen ? (
          <CompareDialog
            careers={comparedCareers}
            onClose={() => setCompareOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </AppShell>
  );
}

function useLockedBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const previousHtmlOverscroll =
      document.documentElement.style.overscrollBehavior;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.paddingRight = previousBodyStyles.paddingRight;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

function ExplorationSurfaceRow({
  careers,
  className,
  onCompare,
  row,
}: {
  careers: Career[];
  className?: string;
  onCompare: (pair: [string, string]) => void;
  row: ExplorationRow;
}) {
  const comparePair = row.comparePair;
  const canCompare =
    comparePair && comparePair.every((slug) => careers.some((career) => career.slug === slug));

  return (
    <section
      className={cn(
        "my-8 border-y border-white/10 py-6 sm:my-10 sm:max-w-3xl sm:py-7",
        className,
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xl font-semibold leading-snug text-foreground/95 sm:text-2xl">
            {row.headline}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {row.note}
          </p>
        </div>
        {canCompare ? (
          <button
            className="group inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-left text-sm text-primary/85 transition duration-500 ease-out hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white/[0.065] hover:text-primary sm:self-auto"
            onClick={() => onCompare(comparePair)}
            type="button"
          >
            {row.compareLabel ?? "Kurz nebeneinander legen"}
            <ArrowRight className="size-4 transition duration-500 group-hover:translate-x-0.5" />
          </button>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {careers.map((career) => (
          <Link
            className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-foreground"
            href={`/careers/${career.slug}`}
            key={`${row.id}-${career.slug}`}
          >
            {career.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

function getExplorationRows(careerList: Career[], adaptiveNudge: string) {
  const visibleSlugs = new Set(careerList.map((career) => career.slug));
  const matchedRows = explorationRows
    .map((row) => ({
      ...row,
      matchCount: row.slugs.filter((slug) => visibleSlugs.has(slug)).length,
    }))
    .filter((row) => row.matchCount >= 2)
    .sort((a, b) => b.matchCount - a.matchCount);

  const ambientRow: ExplorationRow | null = adaptiveNudge
    ? {
        id: "ambient-drift",
        headline: adaptiveNudge,
        note: "Nur eine kleine Spur im Moment. Du kannst jederzeit ganz anders weitergehen.",
        slugs: careerList.slice(0, 5).map((career) => career.slug),
      }
    : null;

  const rows = [
    ...(ambientRow ? [ambientRow] : []),
    ...matchedRows.map((row) => ({
      id: row.id,
      headline: row.headline,
      note: row.note,
      slugs: row.slugs,
      comparePair: row.comparePair,
      compareLabel: row.compareLabel,
    })),
  ];

  return rows.length > 0 ? rows : explorationRows.slice(0, 3);
}

function shouldShowExplorationRow(index: number, total: number) {
  return index > 0 && index % 3 === 2 && index < total - 1;
}

function careersForRow(row: ExplorationRow, visibleCareers: Career[]) {
  const visibleSlugs = new Set(visibleCareers.map((career) => career.slug));
  const rowCareers = row.slugs
    .filter((slug) => visibleSlugs.has(slug))
    .map((slug) => careers.find((career) => career.slug === slug))
    .filter((career): career is Career => Boolean(career));

  return rowCareers.length >= 2
    ? rowCareers.slice(0, 5)
    : visibleCareers.slice(0, 4);
}

function CareerExplorerCard({
  career,
  compareSelected,
  onCompare,
  prominent,
}: {
  career: Career;
  compareSelected: boolean;
  onCompare: () => void;
  prominent: boolean;
}) {
  return (
    <Card
      className={cn(
        "p-5 transition duration-700 ease-out hover:-translate-y-1 hover:bg-white/[0.075] active:translate-y-0 sm:p-6",
        prominent && "energy-surface",
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            {career.tags.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h2 className="text-2xl font-semibold leading-tight">
            {career.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {career.short}
          </p>
          <MiniLifeIndicators
            career={career}
            className="mt-5 max-w-xs opacity-80"
          />
          <PracticalSignals career={career} className="mt-4" />
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:min-w-44">
          <button
            className={cn(
              "rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.07] hover:text-foreground",
              "hover:-translate-y-0.5 active:translate-y-0",
              compareSelected && "border-primary/25 bg-primary/10 text-primary",
            )}
            onClick={onCompare}
            type="button"
          >
            {compareSelected ? "Ausgewählt" : "Vergleichen"}
          </button>
          <SaveCareerButton
            compact
            savedLabel="gemerkt"
            slug={career.slug}
            unsavedLabel="später merken"
          />
        </div>
      </div>

      <Link
        className="mt-7 inline-flex items-center gap-2 text-sm text-foreground transition duration-500 hover:text-primary"
        href={`/careers/${career.slug}`}
      >
        kurz reinschauen
        <ArrowRight className="size-4 text-primary" />
      </Link>
    </Card>
  );
}

function CompareBar({
  allSaved,
  count,
  notice,
  onClear,
  onOpen,
  onSaveAll,
}: {
  allSaved: boolean;
  count: number;
  notice: string;
  onClear: () => void;
  onOpen: () => void;
  onSaveAll: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-3xl rounded-[1.4rem] border border-white/10 bg-[#161912]/85 p-3 shadow-[0_-18px_60px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition duration-700 ease-out hover:-translate-y-0.5 hover:border-white/15 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              {count === 1
                ? "Noch einen Weg auswählen"
                : `${count} Wege ausgewählt`}
            </p>
            {notice ? (
              <p className="mt-1 text-xs text-muted-foreground">{notice}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
            <button
              className="rounded-full border border-primary/20 bg-primary/[0.12] px-3 py-2 text-sm text-primary transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-primary/[0.18] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
              disabled={count < 2}
              onClick={onOpen}
              type="button"
            >
              Vergleichen
            </button>
            <button
              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-muted-foreground transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-white/[0.07] hover:text-foreground active:translate-y-0"
              onClick={onSaveAll}
              type="button"
            >
              {allSaved ? "gemerkt" : "Alle merken"}
            </button>
            <button
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-white/[0.055] hover:text-foreground active:translate-y-0"
              onClick={onClear}
              type="button"
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareDialog({
  careers,
  onClose,
}: {
  careers: Career[];
  onClose: () => void;
}) {
  const nextCareers = getAdaptiveCareerSuggestions(
    allCareersExcept(careers.map((career) => career.slug)),
    3,
  );

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-end overflow-hidden overscroll-contain bg-black/55 px-3 pt-8 backdrop-blur-md sm:items-center sm:justify-center sm:p-6"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="glass-surface compare-sheet-scroll max-h-[calc(100dvh-0.75rem)] w-full rounded-t-[1.7rem] rounded-b-none px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-5 shadow-[0_-18px_70px_rgba(0,0,0,0.48)] sm:max-h-[88vh] sm:max-w-5xl sm:rounded-[1.7rem] sm:p-7 sm:shadow-[0_24px_90px_rgba(0,0,0,0.5)]"
        exit={{ y: 28, opacity: 0, scale: 0.985 }}
        initial={{ y: 34, opacity: 0, scale: 0.985 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 pr-2">
            <p className="text-sm text-primary">Vergleich</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              Nicht besser oder schlechter. Nur anders.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Kein Ranking. Eher ein ruhiger Blick darauf, wie sich die Wege im
              Alltag unterscheiden könnten.
            </p>
          </div>
          <button
            aria-label="Vergleich schließen"
            className="sticky top-0 z-10 shrink-0 rounded-full border border-white/10 bg-[#1b2118]/80 p-2.5 text-muted-foreground shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-foreground"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-8 space-y-7">
          <CompareIndicatorRows careers={careers} />

          <section className="border-t border-white/10 pt-6">
            <p className="text-sm text-primary">Nach dem Tag</p>
            <div className="mt-4 space-y-3">
              {careers.map((career) => (
                <div
                  className="grid gap-2 border-t border-white/10 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[12rem_1fr]"
                  key={`compare-after-day-${career.slug}`}
                >
                  <p className="text-sm font-medium text-foreground/90">
                    {career.title}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {career.realism.afterDay}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <CareerDecisionLayer careers={careers} compact />
        </div>

        {nextCareers.length > 0 ? (
          <div className="mt-9 border-t border-white/10 pt-6">
            <p className="text-sm text-primary">
              Von hier gehen viele eher weiter Richtung...
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {nextCareers.map((career) => (
                <Link
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
                  href={`/careers/${career.slug}`}
                  key={`compare-next-${career.slug}`}
                >
                  {career.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function allCareersExcept(slugs: string[]) {
  return careers.filter((career) => !slugs.includes(career.slug));
}

function CompareIndicatorRows({ careers }: { careers: Career[] }) {
  return (
    <section className="rounded-[1.25rem] border border-white/10 bg-white/[0.025] p-4 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-primary">Alltag auf einen Blick</p>
        <p className="text-xs text-muted-foreground">
          Leise Hinweise, keine Bewertung.
        </p>
      </div>

      <div className="mt-5 space-y-6">
        {lifeIndicatorDefinitions.map((indicator) => {
          const sortedCareers = [...careers].sort((a, b) => {
            const weightDiff =
              getIndicatorWeight(b.lifeIndicators[indicator.key]) -
              getIndicatorWeight(a.lifeIndicators[indicator.key]);

            return weightDiff || careers.indexOf(a) - careers.indexOf(b);
          });

          return (
            <div
              className="grid gap-3 border-t border-white/10 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr]"
              key={indicator.key}
            >
              <p className="text-sm font-medium text-foreground/90">
                {indicator.label}
              </p>
              <div className="space-y-2.5">
                {sortedCareers.map((career) => (
                  <LifeIndicatorLine
                    className="rounded-[0.85rem] bg-white/[0.018] px-3 py-2"
                    key={`${indicator.key}-${career.slug}`}
                    label={career.title}
                    value={career.lifeIndicators[indicator.key]}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function tokenizeText(value: string) {
  return normalizeText(value)
    .split(/[^a-z0-9]+/g)
    .filter(Boolean);
}

function buildCareerDocument(career: Career): CareerSearchDocument {
  const situations = getSituationsForCareer(career.slug);
  const explicitValues = [
    career.title,
    career.slug,
    ...career.tags,
    ...(career.searchKeywords ?? []),
    career.discoveryGroup,
    ...situations.map((situation) => situation.prompt),
    ...situations.flatMap((situation) => tokenizeText(situation.prompt)),
    ...career.emotionalPathways.map((pathway) => pathway.prompt),
    ...career.emotionalPathways.flatMap((pathway) => tokenizeText(pathway.prompt)),
  ];

  const textValues = [
    ...explicitValues,
    career.short,
    career.atmosphere,
    career.secretlyLike,
    career.annoys,
    career.comfortableFor,
    career.practicalSignals.join(" "),
    career.realism.afterDay,
    career.realism.entry.join(" "),
    career.realism.localTexture,
    career.realism.underestimated.join(" "),
    career.discoveryNote,
    career.whyItMightFit,
    career.observations.join(" "),
    career.typicalTuesday.map((item) => `${item.time} ${item.text}`).join(" "),
    career.emotionalPathways
      .map((pathway) => `${pathway.prompt} ${pathway.note}`)
      .join(" "),
    situations.map((situation) => `${situation.prompt} ${situation.note}`).join(" "),
  ];

  return {
    aliasTokens: new Set((career.searchKeywords ?? []).flatMap(tokenizeText)),
    explicitKeywords: new Set(explicitValues.flatMap(tokenizeText)),
    slug: normalizeText(career.slug),
    textTokens: new Set(textValues.flatMap(tokenizeText)),
    title: normalizeText(career.title),
    titleTokens: new Set(tokenizeText(career.title)),
  };
}

function getSearchIntentSlugs(query: string) {
  const normalizedQuery = normalizeText(query);
  const queryTokens = new Set(tokenizeText(query));
  const slugs = new Set<string>();

  if (!normalizedQuery) return slugs;

  for (const group of searchIntentGroups) {
    const phraseMatch = group.phrases.some((phrase) =>
      normalizedQuery.includes(normalizeText(phrase)),
    );
    const tokenMatches = group.tokens.filter((token) =>
      queryTokens.has(normalizeText(token)),
    ).length;

    if (phraseMatch || tokenMatches >= 2) {
      group.slugs.forEach((slug) => slugs.add(slug));
    }
  }

  return slugs;
}

function careerMatchesSearch(
  career: Career,
  query: string,
  document: CareerSearchDocument | undefined,
) {
  if (!document) return false;

  const queryTokens = tokenizeText(query);
  if (queryTokens.length === 0) return true;

  return queryTokens.every((token) => {
    const isShort = token.length < 3;
    const matchingEmotionalFilters = emotionalFilters.filter((filter) =>
      filter.keywords.some((keyword) => tokenizeText(keyword).includes(token)),
    );

    if (isShort) {
      return document.explicitKeywords.has(token) || document.titleTokens.has(token);
    }

    if (knownSearchAliasTokens.has(token)) {
      return (
        document.aliasTokens.has(token) ||
        [...document.titleTokens].some((titleToken) => titleToken.startsWith(token)) ||
        document.slug.split("-").some((slugToken) => slugToken.startsWith(token))
      );
    }

    if (matchingEmotionalFilters.length > 0) {
      return careerMatchesFilters(
        career,
        matchingEmotionalFilters,
        document,
        "or",
      );
    }

    if (
      document.title.includes(token) ||
      document.slug.includes(token) ||
      document.explicitKeywords.has(token)
    ) {
      return true;
    }

    return [...document.textTokens].some(
      (textToken) => textToken === token || textToken.startsWith(token),
    );
  });
}

function careerMatchesFilters(
  career: Career,
  selectedFilters: EmotionalFilter[],
  document: CareerSearchDocument | undefined,
  mode: "and" | "or",
) {
  if (!document || selectedFilters.length === 0) return true;

  const matcher = (filter: EmotionalFilter) => {
    return filter.slugs.includes(career.slug);
  };

  return mode === "and"
    ? selectedFilters.every(matcher)
    : selectedFilters.some(matcher);
}

function getCloseMatches(
  candidateCareers: Career[],
  selectedFilters: EmotionalFilter[],
  documents: Map<string, CareerSearchDocument>,
) {
  return candidateCareers.filter((career) =>
    careerMatchesFilters(career, selectedFilters, documents.get(career.slug), "or"),
  );
}

const knownSearchAliasTokens = new Set(
  careers.flatMap((career) => career.searchKeywords ?? []).flatMap(tokenizeText),
);
