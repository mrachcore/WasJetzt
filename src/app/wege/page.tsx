"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, X } from "lucide-react";

import { AppShell } from "@/components/app-shell";
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

export default function WegePage() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareNotice, setCompareNotice] = useState("");
  const [allComparedSaved, setAllComparedSaved] = useState(false);

  const careerDocuments = useMemo(
    () => new Map(careers.map((career) => [career.slug, buildCareerDocument(career)])),
    [],
  );

  const resultState = useMemo(() => {
    const selectedFilters = emotionalFilters.filter((filter) =>
      activeFilters.includes(filter.label),
    );

    const searchMatchedCareers = careers.filter((career) =>
      careerMatchesSearch(career, query, careerDocuments.get(career.slug)),
    );

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

  const filteredCareers = resultState.careers;

  const comparedCareers = compareSlugs
    .map((slug) => careers.find((career) => career.slug === slug))
    .filter((career): career is Career => Boolean(career));

  function toggleFilter(label: string) {
    setActiveFilters((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
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

      return [...current, slug];
    });
  }

  function saveComparedCareers() {
    const savedSlugs = readSavedCareerSlugs();
    writeSavedCareerSlugs([...compareSlugs, ...savedSlugs]);
    setAllComparedSaved(true);
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
          {emotionalFilters.map((filter) => {
            const active = activeFilters.includes(filter.label);

            return (
              <button
                aria-pressed={active}
                className={cn(
                  "choice-surface inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:text-foreground",
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
          <div className="mt-8 grid gap-4">
            {filteredCareers.map((career, index) => (
              <CareerExplorerCard
                career={career}
                compareSelected={compareSlugs.includes(career.slug)}
                key={career.slug}
                onCompare={() => toggleCompare(career.slug)}
                prominent={index === 0 && Boolean(query || activeFilters.length)}
              />
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

      {compareOpen ? (
        <CompareDialog
          careers={comparedCareers}
          onClose={() => setCompareOpen(false)}
        />
      ) : null}
    </AppShell>
  );
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
        "p-5 transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-white/[0.075] sm:p-6",
        prominent && "energy-surface",
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            {career.tags.slice(0, 4).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h2 className="text-2xl font-semibold leading-tight">
            {career.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {career.short}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-primary/85">
            Warum anschauen: {career.discoveryNote}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:min-w-44">
          <button
            className={cn(
              "rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.07] hover:text-foreground",
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
      <div className="mx-auto max-w-3xl rounded-[1.4rem] border border-white/10 bg-[#161912]/85 p-3 shadow-[0_-18px_60px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-4">
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
              className="rounded-full border border-primary/20 bg-primary/[0.12] px-3 py-2 text-sm text-primary transition duration-300 hover:bg-primary/[0.18] disabled:cursor-not-allowed disabled:opacity-45"
              disabled={count < 2}
              onClick={onOpen}
              type="button"
            >
              Vergleichen
            </button>
            <button
              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-muted-foreground transition duration-300 hover:bg-white/[0.07] hover:text-foreground"
              onClick={onSaveAll}
              type="button"
            >
              {allSaved ? "Aufgehoben" : "Alle merken"}
            </button>
            <button
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition duration-300 hover:bg-white/[0.055] hover:text-foreground"
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
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 px-3 pb-3 pt-10 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6">
      <div className="glass-surface max-h-[88vh] w-full overflow-y-auto rounded-[1.7rem] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.5)] sm:max-w-5xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
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
            className="rounded-full border border-white/10 bg-white/[0.045] p-2 text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-8 space-y-7">
          {compareRows.map((row) => (
            <section key={row.label}>
              <p className="text-sm font-medium text-primary">{row.label}</p>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                {careers.map((career) => (
                  <div
                    className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4"
                    key={`${row.label}-${career.slug}`}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {career.title}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {row.getText(career)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

const compareRows = [
  {
    label: "Routine",
    getText: (career: Career) => getCompareSignal(career, "routine"),
  },
  {
    label: "Körperlich",
    getText: (career: Career) => getCompareSignal(career, "physical"),
  },
  {
    label: "Menschenkontakt",
    getText: (career: Career) => getCompareSignal(career, "people"),
  },
  {
    label: "Stress / Druck",
    getText: (career: Career) => getCompareSignal(career, "pressure"),
  },
  {
    label: "Sichtbares Ergebnis",
    getText: (career: Career) => getCompareSignal(career, "visible"),
  },
  {
    label: "Bewerbung / Ausbildung easy",
    getText: (career: Career) => getCompareSignal(career, "entry"),
  },
  {
    label: "Was wahrscheinlich nervt",
    getText: (career: Career) => career.annoys,
  },
  {
    label: "Warum Leute bleiben",
    getText: (career: Career) => career.secretlyLike,
  },
];

function getCompareSignal(
  career: Career,
  kind:
    | "entry"
    | "people"
    | "physical"
    | "pressure"
    | "routine"
    | "visible",
) {
  const peopleHeavy = [
    "pflegefachkraft",
    "notfallsanitaeter",
    "erzieher",
    "medizinische-fachangestellte",
    "verkaeufer",
    "friseur",
    "zugbegleiter",
  ];
  const quietRoutine = [
    "fachinformatiker-systemintegration",
    "bauzeichner",
    "kaufmann-bueromanagement",
    "mediengestalter",
  ];
  const physicalHeavy = [
    "elektroniker",
    "fachkraft-lagerlogistik",
    "koch",
    "tischler",
    "veranstaltungstechniker",
    "zugbegleiter",
    "tierpfleger",
  ];
  const pressureHeavy = [
    "pflegefachkraft",
    "notfallsanitaeter",
    "koch",
    "veranstaltungstechniker",
    "zugbegleiter",
  ];
  const clearEntry = [
    "fachinformatiker-systemintegration",
    "elektroniker",
    "pflegefachkraft",
    "fachkraft-lagerlogistik",
    "mechatroniker",
    "erzieher",
    "verkaeufer",
    "koch",
    "medizinische-fachangestellte",
    "kaufmann-bueromanagement",
  ];
  const visibleHeavy = [
    "elektroniker",
    "tischler",
    "koch",
    "florist",
    "friseur",
    "mediengestalter",
    "fachkraft-lagerlogistik",
  ];

  if (kind === "people") {
    return peopleHeavy.includes(career.slug)
      ? "Viel. Nicht immer tief, aber oft direkt und nah dran."
      : "Eher punktuell. Du kannst öfter bei einer Sache bleiben.";
  }

  if (kind === "routine") {
    return quietRoutine.includes(career.slug)
      ? "Mehr sortierte Strecken. Viel passiert über Tickets, Pläne, Listen oder wiederkehrende Abläufe."
      : "Der Tag ist wechselhafter. Du musst öfter reagieren, statt nur sauber abzuarbeiten.";
  }

  if (kind === "physical") {
    return physicalHeavy.includes(career.slug)
      ? "Deutlich. Dein Körper merkt meistens, dass du gearbeitet hast."
      : "Eher mäßig. Mehr Kopf, Blick oder Gespräch als dauernd unterwegs.";
  }

  if (kind === "pressure") {
    return pressureHeavy.includes(career.slug)
      ? "Druck kommt oft direkt: Menschen warten, Zeit läuft, Dinge müssen jetzt klappen."
      : "Druck ist eher leiser. Fehler nerven, aber meistens brennt nicht sofort alles.";
  }

  if (kind === "entry") {
    return clearEntry.includes(career.slug)
      ? "Oft klarer Ausbildungsweg und meist gut auffindbar. Region und Betrieb machen trotzdem viel aus."
      : "Meist verständlicher Einstieg, aber Angebote und Praktika hängen stärker von Ort, Saison und Betrieb ab.";
  }

  return visibleHeavy.includes(career.slug)
    ? "Oft ziemlich sichtbar. Am Ende ist etwas fertig, repariert oder verändert."
    : "Nicht immer direkt sichtbar. Manchmal merkt man es erst, wenn es fehlt.";
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
