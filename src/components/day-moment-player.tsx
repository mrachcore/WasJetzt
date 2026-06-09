"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

import { SaveCareerButton } from "@/components/save-career-button";
import { Button } from "@/components/ui/button";
import type { Career } from "@/data/careers";
import { trackWorkdayExperience } from "@/lib/exploration-memory";
import { cn } from "@/lib/utils";

type DayMomentPlayerProps = {
  career: Pick<Career, "dayMoments" | "slug" | "title">;
  className?: string;
  compact?: boolean;
  compareLabel?: string;
  compareHref?: string;
  nextWorkday?: Pick<Career, "slug" | "title"> | null;
  showTitle?: boolean;
};

export function DayMomentPlayer({
  career,
  className,
  compact = false,
  compareLabel = "vergleichen",
  compareHref = "/wege",
  nextWorkday = null,
  showTitle = true,
}: DayMomentPlayerProps) {
  const [playerState, setPlayerState] = useState({
    experienceTracked: false,
    index: 0,
    slug: career.slug,
    startIndex: 0,
  });
  const currentState =
    playerState.slug === career.slug
      ? playerState
      : {
          experienceTracked: false,
          index: 0,
          slug: career.slug,
          startIndex: 0,
        };
  const { experienceTracked, index, startIndex } = currentState;
  const moments = career.dayMoments.length
    ? career.dayMoments
    : [{ timeLabel: "09:12", text: "Ein kurzer Moment aus diesem Arbeitstag." }];
  const momentWindowSize = Math.min(4, moments.length);
  const visibleMoments = Array.from({ length: momentWindowSize }, (_, offset) => {
    const momentIndex = (startIndex + offset) % moments.length;
    return moments[momentIndex];
  });
  const finished = index >= visibleMoments.length;
  const canShowMore = moments.length > visibleMoments.length;

  function markExperienced() {
    if (experienceTracked) return;

    trackWorkdayExperience(career.slug);
  }

  function showNextMoment() {
    markExperienced();
    setPlayerState((current) => {
      const state =
        current.slug === career.slug
          ? current
          : {
              experienceTracked: false,
              index: 0,
              slug: career.slug,
              startIndex: 0,
            };

      return {
        ...state,
        experienceTracked: true,
        index: state.index + 1,
      };
    });
  }

  function showMoreMoments() {
    markExperienced();
    setPlayerState((current) => {
      const state =
        current.slug === career.slug
          ? current
          : {
              experienceTracked: false,
              index: 0,
              slug: career.slug,
              startIndex: 0,
            };

      return {
        ...state,
        experienceTracked: true,
        index: 0,
        startIndex: (state.startIndex + visibleMoments.length) % moments.length,
      };
    });
  }

  return (
    <article
      className={cn(
        "rounded-[1.25rem] border border-white/10 bg-white/[0.025] p-5 transition duration-500 ease-out hover:border-primary/20 hover:bg-white/[0.045] sm:p-6",
        compact && "p-4 sm:p-5",
        className,
      )}
    >
      {showTitle ? (
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-primary/80">
            30 Sekunden Alltag
          </p>
          <h3
            className={cn(
              "mt-2 font-semibold leading-tight",
              compact ? "text-lg" : "text-2xl sm:text-3xl",
            )}
          >
            <Link
              className="rounded-sm transition duration-500 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/55"
              href={`/careers/${career.slug}`}
            >
              {career.title}
            </Link>
          </h3>
        </div>
      ) : null}

      {!finished ? (
        <>
          <div className={cn("space-y-4", compact && "space-y-3")}>
            {visibleMoments.slice(0, index + 1).map((moment, momentIndex) => {
              const parts = splitMomentText(moment.text);
              const current = momentIndex === index;

              return (
                <div key={`${moment.timeLabel}-${moment.text}`}>
                  <div
                    className={cn(
                      "border-l pl-4 transition duration-500",
                      current
                        ? "border-primary/55 opacity-100"
                        : "border-white/10 opacity-62",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-primary">
                        {moment.timeLabel}
                      </p>
                      {current ? (
                        <p className="text-xs font-medium text-muted-foreground">
                          {momentIndex + 1} von {visibleMoments.length}
                        </p>
                      ) : null}
                    </div>
                    <div
                      className={cn(
                        "mt-3 max-w-2xl font-semibold leading-tight text-foreground",
                        compact ? "text-2xl" : "text-3xl sm:text-5xl",
                      )}
                    >
                      {parts.prefix ? (
                        <p className="text-foreground/78">{parts.prefix}</p>
                      ) : null}
                      <p>{parts.main}</p>
                      {parts.after ? (
                        <p className="mt-3 text-foreground/88">{parts.after}</p>
                      ) : null}
                    </div>
                    {moment.realSentence ? (
                      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                        &quot;{moment.realSentence}&quot;
                      </p>
                    ) : null}
                  </div>

                  {momentIndex < index ? (
                    <div className="ml-4 flex items-center gap-2 py-1 text-xs font-medium text-muted-foreground">
                      <ArrowDown className="size-3.5 text-primary/70" />
                      <span>Nächster Moment</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              className="border-primary/30 bg-primary/[0.18] text-primary hover:bg-primary/[0.25]"
              onClick={showNextMoment}
              type="button"
              variant="quiet"
            >
              Nächster Moment
              <ArrowDown className="size-4" />
            </Button>
            <Link
              className="text-sm text-muted-foreground transition duration-500 hover:text-foreground"
              href={`/careers/${career.slug}`}
            >
              mehr über diesen Alltag
            </Link>
          </div>
        </>
      ) : (
        <div className="min-h-36 sm:min-h-40">
          <p className="text-sm text-primary">Das war nur ein kurzer Ausschnitt.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {nextWorkday ? (
              <Button asChild variant="quiet">
                <Link href={`/careers/${nextWorkday.slug}#30-sekunden`}>
                  NÃ¤chster Arbeitstag
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
            {canShowMore ? (
              <Button onClick={showMoreMoments} type="button" variant="quiet">
                Mehr davon
                <ArrowRight className="size-4" />
              </Button>
            ) : null}
            <Button asChild variant="quiet">
              <Link href={`/careers/${career.slug}`}>
                Beruf öffnen
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Link
              className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
              href={compareHref}
            >
              {compareLabel === "vergleichen" ? "Vergleichen" : compareLabel}
            </Link>
            <SaveCareerButton
              compact
              savedLabel="Gemerkt"
              slug={career.slug}
              unsavedLabel="Merken"
            />
            <Link
              className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
              href={`/karte?career=${career.slug}`}
            >
              Karte öffnen
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}

function splitMomentText(text: string) {
  const quotedMatch = text.match(/^([^„"]+[:：])\s*([„"][^“"]+[“"])\s*(.*)$/);

  if (quotedMatch) {
    return {
      prefix: quotedMatch[1].trim(),
      main: quotedMatch[2].trim(),
      after: quotedMatch[3].trim(),
    };
  }

  const firstPeriod = text.indexOf(". ");

  if (firstPeriod > 24 && firstPeriod < text.length - 8) {
    return {
      prefix: "",
      main: text.slice(0, firstPeriod + 1),
      after: text.slice(firstPeriod + 2),
    };
  }

  return {
    prefix: "",
    main: text,
    after: "",
  };
}
