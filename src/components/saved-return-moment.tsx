"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  readSavedCareerSlugs,
  SAVED_CAREERS_EVENT,
} from "@/lib/saved-careers";

export function SavedReturnMoment() {
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const syncSavedCareers = () =>
      setSavedCount(readSavedCareerSlugs().length);

    syncSavedCareers();
    window.addEventListener("storage", syncSavedCareers);
    window.addEventListener(SAVED_CAREERS_EVENT, syncSavedCareers);

    return () => {
      window.removeEventListener("storage", syncSavedCareers);
      window.removeEventListener(SAVED_CAREERS_EVENT, syncSavedCareers);
    };
  }, []);

  if (!savedCount) return null;

  return (
    <Card className="mt-7 max-w-xl p-5">
      <p className="text-sm text-primary">
        Du hattest dir ein paar Wege aufgehoben.
      </p>
      <Link
        className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition duration-500 hover:text-foreground"
        href="/weiterdenken"
      >
        Zum Weiterdenken
        <ArrowRight className="size-4 text-primary" />
      </Link>
    </Card>
  );
}
