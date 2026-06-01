"use client";

import { useMemo, useState } from "react";
import { Check, CornerDownRight } from "lucide-react";

import type { Career } from "@/data/careers";
import { trackCareerSave } from "@/lib/exploration-memory";
import {
  readSavedCareerSlugs,
  writeSavedCareerSlugs,
} from "@/lib/saved-careers";
import { cn } from "@/lib/utils";

type DecisionSide = {
  id: "a" | "b";
  label: string;
  explanation: string;
  slugs: string[];
};

type DecisionPrompt = {
  id: string;
  question: string;
  a: DecisionSide;
  b: DecisionSide;
};

type CareerDecisionLayerProps = {
  careers: Career[];
  className?: string;
  compact?: boolean;
};

const decisionPrompts: DecisionPrompt[] = [
  {
    id: "quiet-or-moving",
    question: "Was wäre dir im Alltag lieber?",
    a: {
      id: "a",
      label: "Weniger reden, dafür länger konzentrieren.",
      explanation: "Dann wirkt ein ruhigerer, sortierter Tag hier etwas klarer.",
      slugs: [
        "fachinformatiker-systemintegration",
        "bauzeichner",
        "kaufmann-bueromanagement",
        "mediengestalter",
      ],
    },
    b: {
      id: "b",
      label: "Mehr Bewegung, dafür öfter unterbrochen werden.",
      explanation: "Dann liegt ein Tag mit mehr Wechsel näher.",
      slugs: [
        "elektroniker",
        "fachkraft-lagerlogistik",
        "koch",
        "tischler",
        "veranstaltungstechniker",
        "zugbegleiter",
      ],
    },
  },
  {
    id: "visible-or-later",
    question: "Was würde dich eher ruhig machen?",
    a: {
      id: "a",
      label: "Direkt sehen, was du geschafft hast.",
      explanation: "Hier zählt eher sichtbare Arbeit: fertig, repariert, verändert.",
      slugs: [
        "elektroniker",
        "tischler",
        "koch",
        "florist",
        "friseur",
        "fachkraft-lagerlogistik",
        "veranstaltungstechniker",
      ],
    },
    b: {
      id: "b",
      label: "Lieber an etwas arbeiten, das erst später Sinn ergibt.",
      explanation: "Dann werden leisere Wege oft lesbarer.",
      slugs: [
        "fachinformatiker-systemintegration",
        "bauzeichner",
        "kaufmann-bueromanagement",
        "medizinische-fachangestellte",
        "mediengestalter",
      ],
    },
  },
  {
    id: "routine-or-variety",
    question: "Was klingt weniger anstrengend?",
    a: {
      id: "a",
      label: "Klarer Ablauf.",
      explanation: "Dann helfen Tage, in denen Wiederholung und Ordnung tragen.",
      slugs: [
        "fachkraft-lagerlogistik",
        "kaufmann-bueromanagement",
        "bauzeichner",
        "medizinische-fachangestellte",
        "fachinformatiker-systemintegration",
      ],
    },
    b: {
      id: "b",
      label: "Mehr Abwechslung.",
      explanation: "Dann wirken wechselnde Tage etwas näher.",
      slugs: [
        "notfallsanitaeter",
        "zugbegleiter",
        "veranstaltungstechniker",
        "koch",
        "erzieher",
        "verkaeufer",
      ],
    },
  },
  {
    id: "people-or-distance",
    question: "Was wäre dir mit Menschen lieber?",
    a: {
      id: "a",
      label: "Direkt mit Menschen, auch wenn es voller wird.",
      explanation: "Dann werden die direkteren, näheren Arbeitstage verständlicher.",
      slugs: [
        "pflegefachkraft",
        "notfallsanitaeter",
        "erzieher",
        "medizinische-fachangestellte",
        "verkaeufer",
        "friseur",
        "zugbegleiter",
      ],
    },
    b: {
      id: "b",
      label: "Lieber freundlich bleiben, aber mit Abstand.",
      explanation: "Dann passt Kontakt besser, der nicht alles bestimmt.",
      slugs: [
        "fachinformatiker-systemintegration",
        "elektroniker",
        "fachkraft-lagerlogistik",
        "bauzeichner",
        "tischler",
        "tierpfleger",
      ],
    },
  },
];

export function CareerDecisionLayer({
  careers,
  className,
  compact = false,
}: CareerDecisionLayerProps) {
  const availablePrompts = useMemo(
    () => getAvailablePrompts(careers).slice(0, compact ? 1 : 4),
    [careers, compact],
  );
  const [selected, setSelected] = useState<{
    promptId: string;
    sideId: "a" | "b";
  } | null>(null);
  const [saved, setSaved] = useState(false);

  const selectedPrompt = availablePrompts.find(
    (prompt) => prompt.id === selected?.promptId,
  );
  const selectedSide = selectedPrompt
    ? selectedPrompt[selected?.sideId ?? "a"]
    : null;
  const selectedCareers = selectedSide
    ? getMatchingCareers(careers, selectedSide)
    : [];

  if (availablePrompts.length === 0) return null;

  function rememberDirection() {
    if (selectedCareers.length === 0) return;

    const nextSlugs = [
      ...selectedCareers.map((career) => career.slug),
      ...readSavedCareerSlugs(),
    ];

    writeSavedCareerSlugs(nextSlugs);
    selectedCareers.forEach((career) => trackCareerSave(career.slug));
    setSaved(true);
  }

  return (
    <section
      className={cn(
        "rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <CornerDownRight className="mt-0.5 size-4 shrink-0 text-primary/80" />
        <div>
          <p className="text-sm text-primary">Was wäre im Alltag anders?</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Kleine Unterschiede. Kein Urteil.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {availablePrompts.map((prompt) => (
          <div key={prompt.id}>
            <p className="mb-2 text-sm font-medium text-foreground/90">
              {prompt.question}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[prompt.a, prompt.b].map((side) => {
                const active =
                  selected?.promptId === prompt.id && selected.sideId === side.id;

                return (
                  <button
                    className={cn(
                      "rounded-[1.05rem] border border-white/10 bg-white/[0.035] px-3.5 py-3 text-left text-sm leading-6 text-muted-foreground transition duration-300 hover:bg-white/[0.07] hover:text-foreground",
                      active && "border-primary/35 bg-primary/10 text-foreground",
                    )}
                    key={`${prompt.id}-${side.id}`}
                    onClick={() => {
                      setSelected({ promptId: prompt.id, sideId: side.id });
                      setSaved(false);
                    }}
                    type="button"
                  >
                    {side.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedSide ? (
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="text-sm leading-6 text-muted-foreground">
            {selectedSide.explanation}
          </p>

          {selectedCareers.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCareers.map((career) => (
                <span
                  className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs text-primary"
                  key={career.slug}
                >
                  {career.title}
                </span>
              ))}
            </div>
          ) : null}

          {selectedCareers.length > 0 ? (
            <button
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-muted-foreground transition duration-300 hover:bg-white/[0.08] hover:text-foreground"
              onClick={rememberDirection}
              type="button"
            >
              {saved ? (
                <>
                  <Check className="size-4 text-primary" />
                  Alltag gemerkt
                </>
              ) : (
                "Alltag merken"
              )}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function getAvailablePrompts(careers: Career[]) {
  return decisionPrompts.filter((prompt) => {
    const aMatches = getMatchingCareers(careers, prompt.a).length;
    const bMatches = getMatchingCareers(careers, prompt.b).length;

    return aMatches > 0 && bMatches > 0;
  });
}

function getMatchingCareers(careers: Career[], side: DecisionSide) {
  return careers.filter((career) => side.slugs.includes(career.slug));
}
