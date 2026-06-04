"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { DayMomentPlayer } from "@/components/day-moment-player";
import {
  TrackedObservationLink,
  TrackedSituationLink,
} from "@/components/exploration-tracker";
import { SavedReturnMoment } from "@/components/saved-return-moment";
import { Button } from "@/components/ui/button";
import { careers, getSituationCareers, situations } from "@/data/careers";
import {
  ambientArbeitsweltFragments,
  arbeitsweltFragments,
  getFragmentsForCareers,
  realSentencePool,
  type ArbeitsweltFragment,
} from "@/data/work-life-fragments";
import {
  EXPLORATION_MEMORY_EVENT,
  getAdaptiveCareerSuggestions,
  getAdaptiveFilterOrder,
  getAdaptiveSituations,
  getExplorationProfile,
  trackFilterUse,
} from "@/lib/exploration-memory";
import { SAVED_CAREERS_EVENT } from "@/lib/saved-careers";
import {
  CONTINUATION_CONTEXT_EVENT,
  getContinuationContext,
  rememberHomepageEmotion,
  type ContinuationSnapshot,
} from "@/lib/continuation-memory";

type HomepageNotice = ArbeitsweltFragment;

const moments = [
  {
    slug: "fachinformatiker-systemintegration",
    line: "Wenn plötzlich alles wieder funktioniert, fühlt sich das kurz unfair gut an.",
    aside: "Fachinformatiker Systemintegration",
    mood: "Ruhiger, als viele denken. Nerviger auch. Beides stimmt.",
    className: "sm:w-[86%]",
  },
  {
    slug: "mediengestalter",
    line: "Du wirst irgendwann anfangen, schlechte Logos zu bemerken.",
    aside: "Mediengestalter",
    mood: "Nicht immer kreativ im Film-Sinn. Oft eher: zehn Pixel nach links.",
    className: "sm:ml-[12%] sm:w-[74%]",
  },
  {
    slug: "fachkraft-lagerlogistik",
    line: "Manche mögen erst später, wie ruhig Ordnung sein kann.",
    aside: "Fachkraft für Lagerlogistik",
    mood: "Scanner, Paletten, Bewegung. Nicht glänzend. Aber oft klar.",
    className: "sm:ml-auto sm:w-[82%]",
  },
  {
    slug: "elektroniker",
    line: "Manche Tage werden besser, wenn am Ende wirklich etwas funktioniert.",
    aside: "Elektroniker",
    mood: "Werkzeug, Wege, Messen. Weniger reden, mehr herausfinden.",
    className: "sm:w-[82%]",
  },
  {
    slug: "notfallsanitaeter",
    line: "Nicht jeder direkte Moment ist laut. Manche brauchen nur Ruhe unter Druck.",
    aside: "Notfallsanitäter",
    mood: "Viel echter Alltag. Manchmal wach, manchmal schwer, selten abstrakt.",
    className: "sm:ml-[10%] sm:w-[78%]",
  },
  {
    slug: "veranstaltungstechniker",
    line: "Hinten passiert oft mehr, als vorne jemand merkt.",
    aside: "Veranstaltungstechniker",
    mood: "Kabel, Timing, Druck. Sichtbar wird es erst, wenn alles trägt.",
    className: "sm:ml-auto sm:w-[80%]",
  },
];

const quietInterruptions = [
  "Tage, über die fast niemand ehrlich spricht.",
  "Manche Tage wirken erst langweilig. Dann merkt man, dass genau das gut ist.",
  "Vielleicht reicht ein Tag, der dich nicht auffrisst.",
];

const quickChoices = [
  {
    label: "Ich will meine Ruhe",
    href: "/careers/bauzeichner",
    note: "ruhiger anfangen",
    tone: "ruhe",
  },
  {
    label: "Ich will etwas Echtes",
    href: "/careers/pflegefachkraft",
    note: "nah am Alltag",
    tone: "echtes",
  },
  {
    label: "Ich will nicht nur sitzen",
    href: "/careers/elektroniker",
    note: "mehr Bewegung",
    tone: "bewegung",
  },
  {
    label: "Menschen sind okay, aber nicht 8 Stunden",
    href: "/careers/fachkraft-lagerlogistik",
    note: "Kontakt mit Abstand",
    tone: "struktur",
  },
  {
    label: "Überrasch mich",
    href: "/wege",
    note: "einfach schauen",
    tone: "ueberraschung",
  },
];

const defaultHomepageSituations = [
  situations[1],
  situations[3],
  situations[4],
  situations[7],
];

const emotionalEntries = [
  {
    id: "too-many-people",
    label: "zu viele Menschen",
    observation:
      "Vielleicht geht es gerade weniger um Richtung. Eher um mehr Abstand im Tag.",
    slugs: [
      "fachinformatiker-systemintegration",
      "bauzeichner",
      "fachkraft-lagerlogistik",
      "tierpfleger",
    ],
    tone: "ruhe",
  },
  {
    id: "too-much-screen",
    label: "zu viel Bildschirm",
    observation:
      "Dann wirken Wege mit Händen, Wegen und sichtbaren Dingen oft ehrlicher.",
    slugs: ["elektroniker", "tischler", "florist", "fachkraft-lagerlogistik"],
    tone: "bewegung",
  },
  {
    id: "no-direction",
    label: "keine Richtung",
    observation:
      "Manchmal reicht ein Alltag, der nicht sofort fremd wirkt.",
    slugs: ["pflegefachkraft", "elektroniker", "bauzeichner", "mediengestalter"],
    tone: "struktur",
  },
  {
    id: "all-same",
    label: "alles klingt gleich",
    observation:
      "Dann hilft es, nicht auf Titel zu schauen, sondern auf den Tag dahinter.",
    slugs: [
      "bauzeichner",
      "mediengestalter",
      "kaufmann-bueromanagement",
      "fachkraft-lagerlogistik",
    ],
    tone: "struktur",
  },
  {
    id: "nothing-real",
    label: "ich will etwas Echtes",
    observation:
      "Dann ziehen oft Tage an, in denen jemand direkt merkt, dass du da warst.",
    slugs: [
      "pflegefachkraft",
      "notfallsanitaeter",
      "medizinische-fachangestellte",
      "erzieher",
    ],
    tone: "echtes",
  },
  {
    id: "no-idea",
    label: "keine Ahnung",
    observation:
      "Das ist okay. Nicht jede gute Richtung fühlt sich am Anfang aufregend an.",
    slugs: ["fachkraft-lagerlogistik", "elektroniker", "friseur", "tierpfleger"],
    tone: "ueberraschung",
  },
];

const heroDirections: Record<
  string,
  {
    response: string;
    directions: {
      href: string;
      label: string;
      note: string;
      tone: string;
    }[];
  }
> = {
  "too-many-people": {
    response:
      "Dann suchen wir nicht nach weniger Leben. Nur nach weniger Dauer-Performen.",
    directions: [
      {
        href: "/wege",
        label: "weniger Bühne suchen",
        note: "ruhigere Wege öffnen",
        tone: "ruhe",
      },
      {
        href: "/karte?career=bauzeichner",
        label: "mit Abstand herumgehen",
        note: "Nachbarschaften auf der Karte",
        tone: "struktur",
      },
      {
        href: "/careers/fachkraft-lagerlogistik",
        label: "einen klaren Tag ansehen",
        note: "weniger Reden, mehr Ablauf",
        tone: "bewegung",
      },
    ],
  },
  "too-much-screen": {
    response:
      "Vielleicht brauchst du nicht weniger Zukunft. Nur mehr echte Dinge vor dir.",
    directions: [
      {
        href: "/wege",
        label: "raus aus dem Bildschirm",
        note: "Wege mit Händen und Bewegung",
        tone: "bewegung",
      },
      {
        href: "/karte?career=elektroniker",
        label: "echte Dinge suchen",
        note: "auf der Karte herumgehen",
        tone: "struktur",
      },
      {
        href: "/careers/tischler",
        label: "etwas Fertiges ansehen",
        note: "ein Alltag mit Material",
        tone: "echtes",
      },
    ],
  },
  "no-direction": {
    response:
      "Keine Richtung ist kein Fehler. Dann schauen wir erst auf Tage, nicht auf Pläne.",
    directions: [
      {
        href: "/quiz",
        label: "ein paar Fragen aushalten",
        note: "kurzer Einstieg",
        tone: "ueberraschung",
      },
      {
        href: "/wege",
        label: "kleine Wahrheiten ziehen",
        note: "ein paar echte Sätze ansehen",
        tone: "struktur",
      },
      {
        href: "/karte",
        label: "ohne Ziel herumgehen",
        note: "Tage nebeneinander sehen",
        tone: "ruhe",
      },
    ],
  },
  "all-same": {
    response:
      "Dann schauen wir auf Unterschiede, die man erst im Alltag merkt.",
    directions: [
      {
        href: "/karte",
        label: "ähnliche Tage trennen",
        note: "auf der Karte schauen",
        tone: "struktur",
      },
      {
        href: "/wege",
        label: "kleine Unterschiede lesen",
        note: "Energie, Menschen, Bewegung",
        tone: "ueberraschung",
      },
      {
        href: "/quiz",
        label: "ein paar Fragen aushalten",
        note: "was nervt weniger?",
        tone: "ruhe",
      },
    ],
  },
  "nothing-real": {
    response:
      "Dann suchen wir nach Tagen, in denen etwas zurückbleibt. Nicht groß. Nur echt.",
    directions: [
      {
        href: "/wege",
        label: "näher an echte Tage",
        note: "weniger abstrakt suchen",
        tone: "echtes",
      },
      {
        href: "/karte?career=pflegefachkraft",
        label: "wo Menschen wirklich vorkommen",
        note: "nah dran anfangen",
        tone: "menschen",
      },
      {
        href: "/careers/notfallsanitaeter",
        label: "einen direkten Tag ansehen",
        note: "ruhig bleiben, wenn es zählt",
        tone: "bewegung",
      },
    ],
  },
  "no-idea": {
    response:
      "Keine Ahnung ist ein Anfang. Dann fang nicht mit einem Plan an. Fang mit einem Arbeitstag an.",
    directions: [
      {
        href: "/quiz",
        label: "ein paar Fragen aushalten",
        note: "kurzer Einstieg",
        tone: "ueberraschung",
      },
      {
        href: "/wege",
        label: "kleine Wahrheiten ziehen",
        note: "ein paar echte Sätze ansehen",
        tone: "struktur",
      },
      {
        href: "/karte",
        label: "ohne Ziel herumgehen",
        note: "Tage nebeneinander sehen",
        tone: "ruhe",
      },
    ],
  },
};

export default function Home() {
  const [adaptiveMoments, setAdaptiveMoments] = useState(moments.slice(0, 3));
  const [adaptiveChoices, setAdaptiveChoices] = useState(quickChoices);
  const [homepageSituations, setHomepageSituations] = useState(
    defaultHomepageSituations,
  );
  const [adaptiveAside, setAdaptiveAside] = useState("");
  const [continuation, setContinuation] = useState<ContinuationSnapshot | null>(
    null,
  );
  const [laterNotice, setLaterNotice] = useState<HomepageNotice | null>(null);
  const [realSentence, setRealSentence] = useState<HomepageNotice | null>(null);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  const selectedEntry = emotionalEntries.find(
    (entry) => entry.id === selectedEntryId,
  );
  const selectedHero = selectedEntry ? heroDirections[selectedEntry.id] : null;
  const continuationCareer =
    continuation?.savedCareers[0] ??
    continuation?.recentlyViewedCareers[0] ??
    continuation?.recentlyComparedCareers[0];
  const continuationHref = continuationCareer
    ? `/careers/${continuationCareer.slug}`
    : continuation?.lastWegeFilters.length
      ? "/wege"
      : "/karte";
  const continuationMapHref = continuationCareer
    ? `/karte?career=${continuationCareer.slug}`
    : "/karte";
  const selectedNotice = useMemo(() => {
    if (!selectedEntry) return laterNotice;

    const notices = getFragmentsForCareers(selectedEntry.slugs);

    if (
      laterNotice &&
      selectedEntry.slugs.includes(laterNotice.careerSlug)
    ) {
      return laterNotice;
    }

    return notices[0] ?? laterNotice;
  }, [laterNotice, selectedEntry]);
  const displayedMoments = useMemo(() => {
    if (!selectedEntry) return adaptiveMoments;

    const selectedMoments = selectedEntry.slugs
      .map((slug) => moments.find((moment) => moment.slug === slug))
      .filter((moment): moment is (typeof moments)[number] => Boolean(moment));

    return [
      ...selectedMoments,
      ...adaptiveMoments.filter(
        (moment) => !selectedEntry.slugs.includes(moment.slug),
      ),
    ].slice(0, 3);
  }, [adaptiveMoments, selectedEntry]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLaterNotice(
        arbeitsweltFragments[
          Math.floor(Math.random() * arbeitsweltFragments.length)
        ] ?? null,
      );
      setRealSentence(
        realSentencePool[Math.floor(Math.random() * realSentencePool.length)] ??
          null,
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const syncExplorationDrift = () => {
      const profile = getExplorationProfile();
      setContinuation(getContinuationContext(careers));
      const suggestedSlugs = getAdaptiveCareerSuggestions(careers).map(
        (career) => career.slug,
      );
      const momentDrift = suggestedSlugs
        .map((slug) => moments.find((moment) => moment.slug === slug))
        .filter((moment): moment is (typeof moments)[number] => Boolean(moment));

      if (profile.hasAdaptiveConfidence && momentDrift.length >= 3) {
        setAdaptiveMoments(momentDrift.slice(0, 3));
      } else {
        setAdaptiveMoments(moments.slice(0, 3));
      }

      if (profile.hasAdaptiveConfidence) {
        setAdaptiveChoices(getAdaptiveFilterOrder(quickChoices));
        setHomepageSituations(
          getAdaptiveSituations(defaultHomepageSituations).slice(0, 4),
        );
      } else {
        setAdaptiveChoices(quickChoices);
        setHomepageSituations(defaultHomepageSituations);
      }

      if (profile.isQuietLeaning) {
        setAdaptiveAside("Du landest gerade oft bei ruhigeren Wegen.");
      } else if (profile.isPracticalLeaning) {
        setAdaptiveAside("Vielleicht eher sowas.");
      } else if (profile.isPeopleLeaning) {
        setAdaptiveAside("Ein paar Wege gehen in eine ähnliche Richtung.");
      } else {
        setAdaptiveAside("");
      }
    };

    const frame = window.requestAnimationFrame(syncExplorationDrift);
    window.addEventListener(EXPLORATION_MEMORY_EVENT, syncExplorationDrift);
    window.addEventListener(SAVED_CAREERS_EVENT, syncExplorationDrift);
    window.addEventListener(CONTINUATION_CONTEXT_EVENT, syncExplorationDrift);
    window.addEventListener("storage", syncExplorationDrift);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(EXPLORATION_MEMORY_EVENT, syncExplorationDrift);
      window.removeEventListener(SAVED_CAREERS_EVENT, syncExplorationDrift);
      window.removeEventListener(CONTINUATION_CONTEXT_EVENT, syncExplorationDrift);
      window.removeEventListener("storage", syncExplorationDrift);
    };
  }, []);

  return (
    <AppShell>
      <section className="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-5xl flex-col justify-center px-5 pb-10 pt-6 sm:min-h-[calc(100vh-76px)] sm:px-8 sm:pb-14 sm:pt-10">
        <div className="relative overflow-hidden py-3 sm:py-8">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 top-8 h-72 rounded-[4rem] bg-[radial-gradient(circle_at_24%_26%,rgba(239,231,207,0.08),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(155,176,164,0.07),transparent_30%)] blur-2xl transition duration-700 ${
              selectedEntry ? "opacity-100" : "opacity-55"
            }`}
          />
          <Image
            src="/logo-mark.png"
            alt=""
            width={180}
            height={168}
            className="mark-breathe pointer-events-none absolute -right-5 -top-10 hidden w-32 opacity-50 sm:block"
            priority
          />
          <div className="relative">
            <p className="mb-5 text-sm text-primary">
              Fragen beantworten + 30 Sekunden Alltag fühlen
            </p>
            <h1 className="max-w-3xl text-[2.55rem] font-semibold leading-[0.98] sm:text-7xl">
              Fang nicht mit einem Beruf an.
              <br />
              Fang mit einem Arbeitstag an.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-xl sm:leading-9">
              Beantworte kurz ein paar Fragen. Dann probierst du Arbeitstage in
              kleinen Momenten.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/quiz">
                  Fragen starten
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="quiet" className="w-full sm:w-auto">
                <Link href="/wege">Erstmal Arbeitstage ansehen</Link>
              </Button>
              <Link
                className="inline-flex justify-center rounded-full px-3 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.055] hover:text-foreground sm:justify-start"
                href="/karte"
              >
                Karte öffnen
              </Link>
            </div>

            {!selectedEntry ? (
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-5 text-muted-foreground/35 sm:max-w-3xl">
                {ambientArbeitsweltFragments.slice(0, 4).map((fragment) => (
                  <span
                    className="max-w-[15rem] border-l border-white/10 pl-3"
                    key={fragment}
                  >
                    {fragment}
                  </span>
                ))}
              </div>
            ) : null}

            <p className="mt-14 text-xs text-primary/70 sm:mt-16">
              Oder sag kurz, was gerade nervt.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {emotionalEntries.map((entry) => {
                const active = entry.id === selectedEntryId;

                return (
                  <button
                    aria-pressed={active}
                    className={`group rounded-[999px] border px-3.5 py-2 text-left text-sm font-medium leading-snug shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl transition duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0 ${
                      active
                        ? "scale-[1.03] border-primary/45 bg-primary/[0.16] text-foreground shadow-[0_22px_70px_rgba(0,0,0,0.28)]"
                        : selectedEntry
                          ? "border-white/10 bg-white/[0.025] text-muted-foreground/70 hover:border-white/18 hover:text-foreground"
                          : "border-white/12 bg-white/[0.055] text-foreground/90 hover:border-primary/22 hover:bg-white/[0.09]"
                    }`}
                    key={entry.id}
                    onClick={() => {
                      setSelectedEntryId(entry.id);
                      rememberHomepageEmotion(entry.label);
                      trackFilterUse(entry.tone);
                    }}
                    type="button"
                  >
                    {entry.label}
                  </button>
                );
              })}
            </div>

            <div
              className={`grid transition-all duration-700 ease-out ${
                selectedHero
                  ? "mt-8 grid-rows-[1fr] opacity-100 sm:mt-10"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {selectedHero ? (
                  <div className="space-y-7 sm:space-y-8">
                    <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_17rem] sm:items-center">
                      <div>
                        <p className="text-sm text-primary/85">
                          {selectedEntry?.label}
                        </p>
                        <p className="mt-3 max-w-2xl text-[2.15rem] font-semibold leading-[1.08] text-foreground/95 sm:text-5xl">
                          {selectedHero.response}
                        </p>
                      </div>

                      {selectedNotice ? (
                        <TrackedObservationLink
                          className="group block max-w-sm border-l border-primary/35 pl-4 transition duration-500 hover:translate-x-1"
                          href={`/careers/${selectedNotice.careerSlug}`}
                          observation={selectedNotice.text}
                          slug={selectedNotice.careerSlug}
                        >
                          <span className="block text-xs text-primary">
                            Das merkst du erst später
                          </span>
                          <span className="mt-2.5 block text-base font-semibold leading-6 text-foreground/92">
                            {selectedNotice.text}
                          </span>
                          <span className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
                            {selectedNotice.careerTitle}
                            <ArrowRight className="size-3.5 shrink-0 text-primary transition duration-500 group-hover:translate-x-0.5" />
                          </span>
                        </TrackedObservationLink>
                      ) : null}
                    </div>

                    <div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
                      {selectedHero.directions.map((direction) => (
                        <Link
                          className="group flex items-center justify-between gap-4 py-2 text-left transition duration-500 hover:text-primary sm:block sm:border-l sm:border-white/10 sm:py-0 sm:pl-4"
                          href={direction.href}
                          key={direction.label}
                          onClick={() => trackFilterUse(direction.tone)}
                        >
                          <span className="block text-base font-medium leading-snug text-foreground transition duration-500 group-hover:text-primary">
                            → {direction.label}
                          </span>
                          <span className="mt-2 block text-sm leading-5 text-muted-foreground">
                            {direction.note}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <SavedReturnMoment />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-5 pb-28 sm:px-8">
        {continuation?.enoughHistory && continuation.summary ? (
          <section className="mb-14 max-w-3xl border-y border-white/10 py-5 sm:mb-20 sm:ml-[8%]">
            <p className="text-sm text-primary">Zum Weiterdenken</p>
            <p className="mt-3 max-w-2xl text-2xl font-semibold leading-snug text-foreground/90 sm:text-3xl">
              {continuation.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <Link
                className="rounded-full border border-white/10 px-3.5 py-2 text-foreground/85 transition duration-500 hover:border-primary/25 hover:text-primary"
                href={continuationHref}
              >
                Weiter dort
              </Link>
              <Link
                className="rounded-full border border-white/10 px-3.5 py-2 text-foreground/85 transition duration-500 hover:border-primary/25 hover:text-primary"
                href="/weiterdenken"
              >
                Zum Weiterdenken
              </Link>
              <Link
                className="rounded-full border border-white/10 px-3.5 py-2 text-foreground/85 transition duration-500 hover:border-primary/25 hover:text-primary"
                href={continuationMapHref}
              >
                Auf der Karte ansehen
              </Link>
            </div>
          </section>
        ) : null}

        {realSentence ? (
          <section className="mb-14 max-w-2xl sm:mb-20 sm:ml-[8%]">
            <p className="text-sm text-primary">Aus echten Arbeitstagen</p>
            <Link
              className="group mt-4 block text-3xl font-semibold leading-tight text-foreground/92 transition duration-500 hover:text-primary sm:text-5xl"
              href={`/careers/${realSentence.careerSlug}`}
            >
              {realSentence.text}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {realSentence.careerTitle}
            </p>
          </section>
        ) : null}

        <div className="mb-14 max-w-lg sm:mb-20">
          <p className="text-sm text-primary">Such nicht direkt nach einem Titel</p>
          <p className="mt-4 text-2xl font-semibold leading-snug text-foreground/90 sm:text-3xl">
            Fang mit dem an, was sich im Alltag weniger falsch anfühlt.
          </p>
        </div>

        <div className="mb-18 sm:mb-28">
          <div className="max-w-2xl sm:ml-auto sm:w-[78%]">
            <p className="text-sm text-primary">Was trifft dich gerade eher?</p>
            <div className="mt-6 space-y-2.5">
              {adaptiveChoices.map((choice) => (
                <Link
                  className="choice-surface group flex items-center justify-between gap-4 rounded-[1.35rem] border border-white/10 px-4 py-3.5 text-left transition duration-500 hover:-translate-y-0.5 sm:px-5"
                  href={choice.href}
                  key={choice.label}
                  onClick={() => trackFilterUse(choice.tone)}
                >
                  <span className="flex items-center gap-3">
                    <span className="wj-marker scale-90" data-tone={choice.tone} />
                    <span>
                      <span className="block text-base font-medium leading-snug text-foreground">
                        {choice.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {choice.note}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-primary transition duration-500 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-16 sm:space-y-28">
          {displayedMoments.map((moment, index) => {
            const career = careers.find((item) => item.slug === moment.slug);
            const situation = homepageSituations[index % homepageSituations.length];
            const situationCareers = situation ? getSituationCareers(situation) : [];

            return (
              <div key={moment.slug}>
                {index === 0 && quietInterruptions[index] ? (
                  <p
                    className={`mb-8 max-w-xs text-sm leading-6 text-muted-foreground ${
                      index % 2 === 0 ? "sm:ml-[8%]" : "sm:ml-auto"
                    }`}
                  >
                    {adaptiveAside || quietInterruptions[index % quietInterruptions.length]}
                  </p>
                ) : null}

                {career ? (
                  <DayMomentPlayer
                    career={career}
                    className={moment.className}
                    compareHref="/wege"
                  />
                ) : (
                  <Link href={`/careers/${moment.slug}`} className="block">
                    <div className={`energy-surface rounded-[1.25rem] border border-white/10 p-5 sm:p-8 ${moment.className}`}>
                      <p className="max-w-2xl text-2xl font-semibold leading-[1.12] sm:text-5xl">
                        {moment.line}
                      </p>
                      <p className="mt-6 text-sm text-primary">{moment.aside}</p>
                    </div>
                  </Link>
                )}

                {index !== 2 ? (
                  <p
                    className={`mt-6 max-w-md text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-7 ${
                      index % 2 === 0 ? "sm:ml-auto sm:mr-[8%]" : "sm:ml-[10%]"
                    }`}
                  >
                    {moment.mood}
                  </p>
                ) : null}

                {index === 1 ? (
                  <div className="mt-12 max-w-md sm:ml-auto sm:mr-[6%]">
                    <div className="cinematic-line mb-5 h-px w-24" />
                    <p className="text-xl font-semibold leading-snug text-foreground/90 sm:text-2xl">
                      Es muss nicht sofort ein Plan sein. Manchmal reicht ein
                      Tag, der nicht komplett absurd klingt.
                    </p>
                  </div>
                ) : null}

                {situation && index === 0 ? (
                  <div
                    className={`mt-12 max-w-2xl sm:mt-14 ${
                      index % 2 === 0 ? "sm:ml-[16%]" : "sm:ml-auto"
                    }`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <p className="text-xl font-semibold leading-snug sm:text-3xl">
                        {situation.prompt}
                      </p>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                      {situation.note}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {situationCareers.slice(0, 3).map((situationCareer) => (
                        <TrackedSituationLink
                          className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
                          href={`/careers/${situationCareer.slug}`}
                          key={`${situation.prompt}-${situationCareer.slug}`}
                          situation={situation}
                        >
                          {situationCareer.title}
                        </TrackedSituationLink>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-20 border-t border-white/10 pt-10 sm:mt-32 sm:pt-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm text-primary">Wenn du noch gar nichts weißt</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                Dann fang nicht mit einem Plan an. Fang mit einem Arbeitstag an.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                Ein paar unbequeme Fragen darüber, was dich Energie kostet und
                was du länger aushältst.
              </p>
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/quiz">
                Fragen beantworten
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
