"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { SaveCareerButton } from "@/components/save-career-button";
import { Button } from "@/components/ui/button";
import type { Career } from "@/data/careers";
import { cn } from "@/lib/utils";

type DayMomentPlayerProps = {
  career: Pick<Career, "dayMoments" | "slug" | "title">;
  className?: string;
  compact?: boolean;
  compareLabel?: string;
  compareHref?: string;
  showTitle?: boolean;
};

export function DayMomentPlayer({
  career,
  className,
  compact = false,
  compareLabel = "vergleichen",
  compareHref = "/wege",
  showTitle = true,
}: DayMomentPlayerProps) {
  const [index, setIndex] = useState(0);
  const moments = career.dayMoments.length
    ? career.dayMoments
    : [{ timeLabel: "09:12", text: "Ein kurzer Moment aus diesem Arbeitstag." }];
  const finished = index >= moments.length;
  const moment = moments[Math.min(index, moments.length - 1)];
  const parts = splitMomentText(moment.text);

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
            {career.title}
          </h3>
        </div>
      ) : null}

      {!finished ? (
        <>
          <div className="min-h-36 border-l border-primary/45 pl-4 sm:min-h-40">
            <p className="text-sm font-semibold text-primary">{moment.timeLabel}</p>
            <div
              className={cn(
                "mt-4 max-w-2xl font-semibold leading-tight text-foreground",
                compact ? "text-2xl" : "text-3xl sm:text-5xl",
              )}
            >
              {parts.prefix ? (
                <p className="text-foreground/78">{parts.prefix}</p>
              ) : null}
              <p>{parts.main}</p>
              {parts.after ? (
                <p className="mt-4 text-foreground/88">{parts.after}</p>
              ) : null}
            </div>
            {moment.realSentence ? (
              <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
                Jemand sagt: &quot;{moment.realSentence}&quot;
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              className="border-primary/30 bg-primary/[0.18] text-primary hover:bg-primary/[0.25]"
              onClick={() => setIndex((current) => current + 1)}
              type="button"
              variant="quiet"
            >
              Nächster Moment
              <ArrowRight className="size-4" />
            </Button>
            <span className="text-xs font-medium text-muted-foreground">
              {index + 1} von {moments.length}
            </span>
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
            <Button asChild variant="quiet">
              <Link href={`/careers/${career.slug}`}>
                mehr über diesen Alltag
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <SaveCareerButton
              compact
              savedLabel="gemerkt"
              slug={career.slug}
              unsavedLabel="merken"
            />
            <Link
              className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
              href={compareHref}
            >
              {compareLabel}
            </Link>
            <Link
              className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
              href={`/karte?career=${career.slug}`}
            >
              auf Karte ansehen
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
