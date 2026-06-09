"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { DayMomentPlayer } from "@/components/day-moment-player";
import {
  MiniLifeIndicators,
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
import { getNextWorkday } from "@/data/workday-flow";
import { ambientArbeitsweltFragments } from "@/data/work-life-fragments";
import { cn } from "@/lib/utils";
import {
  readSavedCareerSlugs,
  writeSavedCareerSlugs,
} from "@/lib/saved-careers";
import { rememberWegeFilters } from "@/lib/continuation-memory";
import {
  EXPLORATION_MEMORY_EVENT,
  getAdaptiveCareerSuggestions,
  getAdaptiveFilterOrder,
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
      "klare abläufe",
      "nicht ständig reagieren",
      "nicht staendig reagieren",
    ],
    tokens: ["chaos", "struktur", "abläufe", "ordnung"],
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
    phrases: ["etwas mit händen", "etwas mit händen", "mit den händen", "praktisch arbeiten"],
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
  const [adaptiveReady, setAdaptiveReady] = useState(false);
  const [adaptiveRefresh, setAdaptiveRefresh] = useState(0);

  useLockedBodyScroll(compareOpen);

  useEffect(() => {
    const syncExplorationDrift = () => {
      setAdaptiveFilters(getAdaptiveFilterOrder(emotionalFilters));
      setAdaptiveReady(true);
      setAdaptiveRefresh((current) => current + 1);
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

  const comparedCareers = compareSlugs
    .map((slug) => careers.find((career) => career.slug === slug))
    .filter((career): career is Career => Boolean(career));

  function toggleFilter(label: string) {
    const filter = emotionalFilters.find((item) => item.label === label);

    setActiveFilters((current) => {
      if (current.includes(label)) {
        const nextFilters = current.filter((item) => item !== label);
        rememberWegeFilters(nextFilters);
        return nextFilters;
      }

      trackFilterUse(filter?.tone ?? label);
      const nextFilters = [...current, label];
      rememberWegeFilters(nextFilters);
      return nextFilters;
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


  return (
    <AppShell>
      <section className="mx-auto w-full max-w-5xl px-5 pb-36 pt-8 sm:px-8 sm:pt-12">
        <div className="relative max-w-3xl">
          <Image
            src="/logo-mark.png"
            alt=""
            width={132}
            height={123}
            className="mark-breathe pointer-events-none absolute -right-8 -top-10 hidden w-28 sm:block"
            priority
          />
          <Badge className="mb-5 text-primary">Alltag statt Jobtitel</Badge>
          <h1 className="text-4xl font-semibold leading-[1.02] sm:text-7xl">
            Berufe finden
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Fang mit einem Arbeitstag an. Tipp dich kurz durch ein paar
            Momente, dann schau weiter.
          </p>
          <p className="mt-5 max-w-md border-l border-white/10 pl-4 text-sm leading-6 text-muted-foreground/78">
            {ambientArbeitsweltFragments[4]}
          </p>
        </div>

        <div className="mt-8 max-w-2xl border-t border-white/10 pt-6">
          <p className="text-sm text-primary">Arbeitstage suchen</p>
          <p className="mt-3 text-xl font-semibold leading-tight sm:text-3xl">
            Such direkt nach einem Beruf oder filtere nach Alltag.
          </p>
        </div>

        <div className="sticky top-3 z-20 mt-5 sm:top-5">
          <div className="glass-surface flex items-center gap-3 rounded-[1.45rem] px-4 py-3.5 sm:px-5">
            <Search className="size-5 shrink-0 text-primary/80" />
            <input
              aria-label="Wege durchsuchen"
              className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Such nach Beruf oder Gefühl"
              type="search"
              value={query}
            />
          </div>
        </div>

        <div className="scrollbar-hide -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {adaptiveFilters.map((filter) => {
            const active = activeFilters.includes(filter.label);

            return (
              <button
                aria-pressed={active}
                className={cn(
                  "choice-surface inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/16 px-3.5 py-2 text-sm text-foreground/82 transition duration-500 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground active:translate-y-0 active:bg-primary/[0.12]",
                  active && "border-primary/45 bg-primary/[0.14] text-foreground",
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

        <div className="mt-5 flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            {filteredCareers.length}{" "}
            {filteredCareers.length === 1 ? "Beruf" : "Berufe"}
            {activeFilters.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <span
                    className="rounded-full border border-primary/20 bg-primary/[0.1] px-3 py-1 text-xs text-primary"
                    key={`active-${filter}`}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          {activeFilters.length || query ? (
            <button
              className="rounded-full px-3 py-1.5 transition hover:bg-white/[0.055] hover:text-foreground"
              onClick={() => {
                setQuery("");
                setActiveFilters([]);
                rememberWegeFilters([]);
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
              Ein paar Wege berühren trotzdem etwas davon.
            </p>
          </Card>
        ) : null}

        {filteredCareers.length > 0 ? (
          <div className="mt-6 space-y-4 sm:space-y-5">
            {filteredCareers.map((career, index) => (
              <div key={career.slug}>
                <CareerExplorerCard
                  career={career}
                  compareSelected={compareSlugs.includes(career.slug)}
                  onCompare={() => toggleCompare(career.slug)}
                  prominent={index === 0 && Boolean(query || activeFilters.length)}
                />
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

        {filteredCareers.length > 0 ? (
          <section className="mt-12 border-y border-white/10 py-7">
            <div className="mb-6 max-w-2xl">
              <p className="text-sm text-primary">Arbeitstage aus den Treffern</p>
              <p className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                Drei kurze Ausschnitte, wenn du erst fühlen willst.
              </p>
            </div>
            <div className="grid gap-4">
              {filteredCareers.slice(0, 3).map((career) => (
                <DayMomentPlayer
                  career={career}
                  className="sm:max-w-3xl"
                  compact
                  key={`wege-preview-${career.slug}`}
                  nextWorkday={getNextWorkday(career.slug, filteredCareers)}
                />
              ))}
            </div>
          </section>
        ) : null}
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
        "group relative overflow-hidden border-white/16 bg-white/[0.045] p-5 transition duration-500 ease-out hover:-translate-y-1 hover:border-primary/35 hover:bg-white/[0.085] active:translate-y-0 active:bg-primary/[0.07] sm:p-6",
        prominent && "energy-surface",
      )}
    >
      <Link
        aria-label={`${career.title} öffnen`}
        className="absolute inset-0 z-0"
        href={`/careers/${career.slug}`}
      />
      <div className="pointer-events-none relative z-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            {career.tags.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h2 className="text-2xl font-semibold leading-tight">
            <Link
              className="pointer-events-auto rounded-sm transition duration-500 group-hover:text-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/55"
              href={`/careers/${career.slug}`}
            >
              {career.title}
            </Link>
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

        <div className="pointer-events-auto flex shrink-0 flex-col gap-2 sm:min-w-44">
          <button
            className={cn(
              "min-h-11 rounded-full border border-white/16 bg-white/[0.055] px-4 py-2 text-sm text-foreground/82 transition duration-500 hover:bg-white/[0.09] hover:text-foreground",
              "hover:-translate-y-0.5 active:translate-y-0",
              compareSelected && "border-primary/35 bg-primary/[0.14] text-primary",
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
            unsavedLabel="merken"
          />
        </div>
      </div>

      <div className="pointer-events-auto relative z-20 mt-7 flex flex-wrap gap-3">
        <Link
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.14] px-4 py-2 text-sm font-medium text-primary transition duration-500 hover:-translate-y-0.5 hover:bg-primary/[0.2] active:translate-y-0"
          href={`/careers/${career.slug}`}
        >
          Beruf öffnen
          <ArrowRight className="size-4" />
        </Link>
        <Link
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/16 bg-white/[0.055] px-4 py-2 text-sm text-foreground/82 transition duration-500 hover:-translate-y-0.5 hover:bg-white/[0.09] hover:text-foreground active:translate-y-0"
          href={`/careers/${career.slug}#30-sekunden`}
        >
          30 Sekunden
        </Link>
      </div>
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
      <div className="mx-auto max-w-3xl rounded-[1.25rem] border border-white/10 bg-[#161912]/88 p-3 shadow-[0_-18px_60px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              {count === 1 ? "Noch einen Beruf wählen" : `${count} Berufe`}
            </p>
            {notice ? (
              <p className="mt-1 text-xs text-muted-foreground">{notice}</p>
            ) : null}
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
            <button
              className="rounded-full border border-primary/20 bg-primary/[0.12] px-3 py-2 text-sm text-primary transition duration-500 hover:bg-primary/[0.18] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={count < 2}
              onClick={onOpen}
              type="button"
            >
              Vergleichen
            </button>
            <button
              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.07] hover:text-foreground"
              onClick={onSaveAll}
              type="button"
            >
              {allSaved ? "gemerkt" : "Merken"}
            </button>
            <button
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.055] hover:text-foreground"
              onClick={onClear}
              type="button"
            >
              Zurück
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
  return (
    <div className="fixed inset-0 z-50 flex items-end overflow-hidden bg-black/55 px-3 pt-8 backdrop-blur-md sm:items-center sm:justify-center sm:p-6">
      <div className="glass-surface compare-sheet-scroll max-h-[calc(100dvh-0.75rem)] w-full rounded-t-[1.7rem] px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-5 shadow-[0_-18px_70px_rgba(0,0,0,0.48)] sm:max-h-[88vh] sm:max-w-5xl sm:rounded-[1.7rem] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-primary">Vergleichen</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
              Was fühlt sich anders an?
            </h2>
          </div>
          <button
            aria-label="Vergleich schließen"
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {careers.map((career) => (
            <section
              className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4"
              key={`compare-${career.slug}`}
            >
              <h3 className="text-xl font-semibold leading-tight">
                <Link
                  className="rounded-sm transition duration-500 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/55"
                  href={`/careers/${career.slug}`}
                >
                  {career.title}
                </Link>
              </h3>
              <div className="mt-4 space-y-3">
                {career.realDifferences.slice(0, 3).map((difference) => (
                  <p
                    className="text-sm font-semibold leading-6 text-foreground/88"
                    key={difference}
                  >
                    {difference}
                  </p>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  className="rounded-full border border-primary/20 bg-primary/[0.1] px-3.5 py-2 text-sm text-primary transition duration-500 hover:bg-primary/[0.16]"
                  href={`/careers/${career.slug}`}
                >
                  öffnen
                </Link>
                <Link
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
                  href={`/karte?career=${career.slug}`}
                >
                  Karte
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
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
    career.laterNotices.join(" "),
    career.realSentences.join(" "),
    career.realDifferences.join(" "),
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
