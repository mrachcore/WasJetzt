"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { DayMomentPlayer } from "@/components/day-moment-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  careers,
  getExplorationCareers,
  quizSignals,
  type Career,
  type SignalWeights,
} from "@/data/careers";
import { getNextWorkday } from "@/data/workday-flow";
import {
  getFragmentsForCareers,
  getRealSentencesForCareers,
} from "@/data/work-life-fragments";
import { rememberResultDirection } from "@/lib/continuation-memory";
import { trackCareerSave } from "@/lib/exploration-memory";
import {
  readSavedCareerSlugs,
  writeSavedCareerSlugs,
} from "@/lib/saved-careers";

type WorkingWorld = {
  id: string;
  title: string;
  sentence: string;
  slugs: string[];
};

const workingWorlds: WorkingWorld[] = [
  {
    id: "problems",
    title: "Probleme lösen",
    sentence: "Wenn etwas nicht aufgeht, bleibst du eher noch einen Moment dran.",
    slugs: [
      "fachinformatiker-systemintegration",
      "elektroniker",
      "mechatroniker",
      "industriemechaniker",
    ],
  },
  {
    id: "people",
    title: "Menschen entlasten",
    sentence: "Es zählt für dich, wenn jemand danach ein bisschen weniger allein ist.",
    slugs: [
      "pflegefachkraft",
      "notfallsanitaeter",
      "medizinische-fachangestellte",
      "erzieher",
      "friseur",
    ],
  },
  {
    id: "order",
    title: "Ordnung schaffen",
    sentence: "Du merkst wahrscheinlich schneller, wenn Dinge keinen Platz haben.",
    slugs: [
      "bauzeichner",
      "kaufmann-bueromanagement",
      "fachkraft-lagerlogistik",
      "fachinformatiker-systemintegration",
    ],
  },
  {
    id: "moving",
    title: "Unterwegs sein",
    sentence: "Stillstand wirkt vielleicht anstrengender als Bewegung.",
    slugs: [
      "zugbegleiter",
      "veranstaltungstechniker",
      "notfallsanitaeter",
      "elektroniker",
      "fachkraft-lagerlogistik",
    ],
  },
  {
    id: "making",
    title: "Dinge fertig machen",
    sentence: "Ein abgeschlossener Moment bleibt dir länger im Kopf als ein gutes Gespräch darüber.",
    slugs: ["tischler", "elektroniker", "koch", "florist", "mediengestalter"],
  },
];

export default function ResultsPage() {
  const [hydrated, setHydrated] = useState(false);
  const [directionSaved, setDirectionSaved] = useState(false);
  const [storedAnswers, setStoredAnswers] = useState<string[]>([]);
  const [storedSignalProfile, setStoredSignalProfile] = useState<SignalWeights>({});

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const raw = localStorage.getItem("wasjetzt.answers");
      const rawSignalProfile = localStorage.getItem("wasjetzt.signalProfile");

      try {
        setStoredAnswers(raw ? JSON.parse(raw) : []);
      } catch {
        setStoredAnswers([]);
      }

      try {
        setStoredSignalProfile(
          rawSignalProfile ? parseSignalProfile(JSON.parse(rawSignalProfile)) : {},
        );
      } catch {
        setStoredSignalProfile({});
      }

      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const patternCareers = useMemo(() => {
    if (!storedAnswers.length) return careers.slice(0, 8);
    return getExplorationCareers(storedAnswers, storedSignalProfile).slice(0, 8);
  }, [storedAnswers, storedSignalProfile]);

  const patternSlugs = useMemo(
    () => patternCareers.map((career) => career.slug),
    [patternCareers],
  );
  const observations = useMemo(
    () => getPatternObservations(storedAnswers, patternCareers),
    [patternCareers, storedAnswers],
  );
  const visibleWorlds = useMemo(
    () => getVisibleWorlds(storedAnswers, patternSlugs),
    [patternSlugs, storedAnswers],
  );
  const dominantPatternLabel = visibleWorlds[0]?.title ?? "diese Richtung";

  function saveCurrentDirection() {
    const slugs = patternCareers.slice(0, 3).map((career) => career.slug);

    writeSavedCareerSlugs([...slugs, ...readSavedCareerSlugs()]);
    slugs.forEach((slug) => trackCareerSave(slug));
    rememberResultDirection(dominantPatternLabel);
    setDirectionSaved(true);
  }

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-5xl px-5 pb-24 pt-12 sm:px-8">
        <div className="relative max-w-3xl">
          <Image
            src="/logo-mark.png"
            alt=""
            width={120}
            height={112}
            className="mark-breathe pointer-events-none absolute -right-6 -top-8 hidden w-24 sm:block"
          />
          <Badge className="mb-7 text-primary">
            {hydrated && storedAnswers.length
              ? "Nach ein paar Antworten"
              : "Zum Reinfühlen"}
          </Badge>
          <h1 className="text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Ein paar Arbeitstage,
            <br />
            die weniger falsch klingen könnten.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Tipp dich kurz durch ein paar Momente. Danach wartet direkt der
            nächste andere Arbeitstag.
          </p>
          <div className="mt-9">
            <Button asChild variant="quiet">
              <Link href="/quiz">
                <RefreshCcw className="size-4" />
                nochmal anders antworten
              </Link>
            </Button>
          </div>
        </div>

        <section className="mt-14 sm:mt-20">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm text-primary">30 Sekunden Alltag</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
              Arbeitstage
            </h2>
          </div>

          <div className="grid gap-5">
            {patternCareers.slice(0, 4).map((career, index) => (
              <motion.div
                key={`day-preview-${career.slug}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.055,
                  duration: 0.46,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <DayPreviewCard
                  career={career}
                  nextWorkday={getNextWorkday(career.slug, patternCareers)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-14 sm:mt-18">
          <div className="mb-7 max-w-2xl">
            <p className="text-sm text-primary">Was du daran vielleicht merkst</p>
          </div>
          <div className="space-y-7 sm:space-y-9">
            {observations.slice(0, 3).map((observation, index) => (
              <motion.div
                key={observation}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MicroRevealObservation index={index} text={observation} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-14 sm:mt-18">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm text-primary">Berufe öffnen</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Professionen, die zu diesen Arbeitstagen passen.
            </h2>
          </div>

          <div className="space-y-8">
            {visibleWorlds.slice(0, 3).map((world) => {
              const worldCareers = world.slugs
                .map((slug) => careers.find((career) => career.slug === slug))
                .filter((career): career is Career => Boolean(career))
                .slice(0, 5);
              const worldSentence = getRealSentencesForCareers(world.slugs)[0];

              return (
                <div
                  className="border-t border-white/10 pt-6"
                  key={world.id}
                >
                  <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_1.15fr]">
                    <div>
                      <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">
                        {world.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                        {world.sentence}
                      </p>
                      {worldSentence ? (
                        <p className="mt-5 border-l border-primary/25 pl-4 text-lg font-semibold leading-7 text-foreground/90">
                          {worldSentence.text}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2 sm:items-start sm:pt-2">
                      {worldCareers.map((career) => (
                        <Link
                          className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-foreground/88 transition duration-500 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white/[0.09] hover:text-primary"
                          href={`/careers/${career.slug}`}
                          key={`${world.id}-${career.slug}`}
                        >
                          {career.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-14 max-w-2xl sm:mt-20">
          <p className="text-sm text-primary">Diese Richtung darf bleiben.</p>
          <p className="mt-3 text-2xl font-semibold leading-snug text-foreground/90 sm:text-3xl">
            Wenn das gerade nicht ganz falsch klang, kannst du es ruhig
            aufheben.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={saveCurrentDirection}
              type="button"
              variant={directionSaved ? "ghost" : "quiet"}
            >
              {directionSaved ? "Richtung gemerkt" : "Diese Richtung merken"}
            </Button>
            {directionSaved ? (
              <div className="max-w-sm">
                <p className="text-lg font-semibold leading-snug text-foreground/92">
                  Aufgehoben.
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Du musst daraus jetzt nichts machen. Liegt einfach später noch
                  da.
                </p>
                <Button asChild className="mt-4" variant="ghost">
                  <Link href="/weiterdenken">Zum Weiterdenken</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </section>

      </section>
    </AppShell>
  );
}

function DayPreviewCard({
  career,
  nextWorkday,
}: {
  career: Career;
  nextWorkday: Pick<Career, "slug" | "title"> | null;
}) {
  return (
    <DayMomentPlayer career={career} compact nextWorkday={nextWorkday} />
  );
}

function MicroRevealObservation({ index, text }: { index: number; text: string }) {
  const [step, setStep] = useState(0);
  const parts = useMemo(() => splitObservation(text), [text]);
  const visibleText = parts.slice(0, step + 1).join("");

  return (
    <button
      className={`block w-full max-w-3xl text-left transition duration-500 hover:translate-x-1 ${
        index % 2 === 1 ? "sm:ml-auto" : ""
      }`}
      onClick={() => setStep((current) => Math.min(current + 1, parts.length - 1))}
      type="button"
    >
      <span className="block border-l border-white/10 pl-5 text-2xl font-semibold leading-snug text-foreground/92 sm:text-4xl">
        {visibleText}
      </span>
      {step < parts.length - 1 ? (
        <span className="mt-3 block pl-5 text-xs text-primary/75">
          noch ein Stück
        </span>
      ) : null}
    </button>
  );
}

function splitObservation(text: string) {
  const firstComma = text.indexOf(",");
  const firstPeriod = text.indexOf(". ");
  const splitAt = firstComma > 18 ? firstComma + 1 : firstPeriod > 18 ? firstPeriod + 1 : -1;

  if (splitAt === -1 || splitAt >= text.length - 8) return [text];

  const first = text.slice(0, splitAt);
  const rest = text.slice(splitAt);
  const restPeriod = rest.indexOf(". ");

  if (restPeriod > 18 && restPeriod < rest.length - 8) {
    return [first, rest.slice(0, restPeriod + 1), rest.slice(restPeriod + 1)];
  }

  return [first, rest];
}

function getPatternObservations(answerSlugs: string[], patternCareers: Career[]) {
  if (!answerSlugs.length) {
    return [
      "Vielleicht merkst du erst beim Lesen, welche Sätze länger hängen bleiben.",
      "Manche Tage fühlen sich näher an, obwohl du sie noch nie erlebt hast.",
      "Du musst nicht sofort wissen, was passt.",
      "Manchmal reicht ein Satz, der unangenehm vertraut klingt.",
    ];
  }

  const answerSet = new Set(answerSlugs);
  const observations = [
    answerSet.has("fachinformatiker-systemintegration") ||
    answerSet.has("bauzeichner")
      ? "Du bemerkst Chaos oft, bevor es sichtbar wird."
      : "",
    answerSet.has("pflegefachkraft") ||
    answerSet.has("medizinische-fachangestellte")
      ? "Manche Menschen machen dich müder als Probleme."
      : "",
    answerSet.has("elektroniker") || answerSet.has("mechatroniker")
      ? "Wenn etwas endlich funktioniert, fühlt sich das größer an, als es von außen aussieht."
      : "",
    answerSet.has("fachkraft-lagerlogistik") ||
    answerSet.has("kaufmann-bueromanagement")
      ? "Du wirst irgendwann automatisch vergleichen, was besser organisiert sein könnte."
      : "",
    answerSet.has("tierpfleger") || answerSet.has("florist")
      ? "Ruhe bedeutet für dich nicht automatisch Langeweile."
      : "",
    answerSet.has("tischler") ||
    answerSet.has("koch") ||
    answerSet.has("mediengestalter")
      ? "Manche Tage fühlen sich besser an, wenn etwas wirklich abgeschlossen wurde."
      : "",
    answerSet.has("erzieher") || answerSet.has("notfallsanitaeter")
      ? "Du merkst schneller, wenn jemand nicht nur eine Antwort braucht."
      : "",
    answerSet.has("veranstaltungstechniker") || answerSet.has("zugbegleiter")
      ? "Stillstand macht dich wahrscheinlich schneller müde als Bewegung."
      : "",
  ].filter(Boolean);

  const fragments = getFragmentsForCareers(
    patternCareers.slice(0, 4).map((career) => career.slug),
  )
    .slice(0, 2)
    .map((fragment) => fragment.text);

  return uniqueStrings([...observations, ...fragments]).slice(0, 8);
}

function getVisibleWorlds(answerSlugs: string[], patternSlugs: string[]) {
  const answerSet = new Set(answerSlugs);
  const patternSet = new Set(patternSlugs);

  const worlds = workingWorlds
    .map((world, index) => ({
      index,
      matchCount: world.slugs.filter(
        (slug) => answerSet.has(slug) || patternSet.has(slug),
      ).length,
      world,
    }))
    .sort((a, b) => b.matchCount - a.matchCount || a.index - b.index)
    .map(({ world }) => world);

  return worlds.slice(0, 4);
}

function uniqueStrings(values: string[]) {
  return values.filter((value, index) => value && values.indexOf(value) === index);
}

function parseSignalProfile(value: unknown): SignalWeights {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const profile: SignalWeights = {};
  const rawProfile = value as Record<string, unknown>;

  for (const signal of quizSignals) {
    const rawValue = rawProfile[signal];

    if (typeof rawValue === "number" && Number.isFinite(rawValue)) {
      profile[signal] = rawValue;
    }
  }

  return profile;
}
