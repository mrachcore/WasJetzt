"use client";

import { useEffect, useMemo, useState } from "react";

import { careers } from "@/data/careers";
import {
  CONTINUATION_CONTEXT_EVENT,
  getContinuationContext,
  type ContinuationSnapshot,
} from "@/lib/continuation-memory";
import { EXPLORATION_MEMORY_EVENT } from "@/lib/exploration-memory";
import { SAVED_CAREERS_EVENT } from "@/lib/saved-careers";
import { cn } from "@/lib/utils";

export function ContinuationLine({
  careerSlug,
  className,
}: {
  careerSlug?: string;
  className?: string;
}) {
  const [snapshot, setSnapshot] = useState<ContinuationSnapshot | null>(null);

  useEffect(() => {
    const syncSnapshot = () => setSnapshot(getContinuationContext(careers));

    syncSnapshot();
    window.addEventListener(EXPLORATION_MEMORY_EVENT, syncSnapshot);
    window.addEventListener(SAVED_CAREERS_EVENT, syncSnapshot);
    window.addEventListener(CONTINUATION_CONTEXT_EVENT, syncSnapshot);
    window.addEventListener("storage", syncSnapshot);

    return () => {
      window.removeEventListener(EXPLORATION_MEMORY_EVENT, syncSnapshot);
      window.removeEventListener(SAVED_CAREERS_EVENT, syncSnapshot);
      window.removeEventListener(CONTINUATION_CONTEXT_EVENT, syncSnapshot);
      window.removeEventListener("storage", syncSnapshot);
    };
  }, []);

  const message = useMemo(() => {
    if (!snapshot?.enoughHistory) return "";

    const currentCareer = careers.find((career) => career.slug === careerSlug);
    const savedNearby = snapshot.savedCareers.find(
      (career) => career.slug !== careerSlug && isRelatedCareer(currentCareer, career.slug),
    );

    if (savedNearby) {
      return "Das liegt nah bei etwas, das du dir gemerkt hast.";
    }

    const recentNearby = snapshot.recentlyViewedCareers.find(
      (career) => career.slug !== careerSlug && isRelatedCareer(currentCareer, career.slug),
    );

    if (recentNearby) {
      return `Du warst vorhin auch bei ${recentNearby.title}.`;
    }

    return "";
  }, [careerSlug, snapshot]);

  if (!message) return null;

  return (
    <p className={cn("text-sm leading-6 text-primary/75", className)}>
      {message}
    </p>
  );
}

function isRelatedCareer(
  currentCareer: (typeof careers)[number] | undefined,
  candidateSlug: string,
) {
  if (!currentCareer) return true;
  const candidate = careers.find((career) => career.slug === candidateSlug);

  if (!candidate) return false;

  return (
    currentCareer.discoveryGroup === candidate.discoveryGroup ||
    currentCareer.emotionalPathways.some((pathway) =>
      pathway.slugs.includes(candidateSlug),
    ) ||
    candidate.emotionalPathways.some((pathway) =>
      pathway.slugs.includes(currentCareer.slug),
    )
  );
}
