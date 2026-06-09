"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SaveCareerButton } from "@/components/save-career-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { careers } from "@/data/careers";
import {
  readSavedCareerSlugs,
  SAVED_CAREERS_EVENT,
} from "@/lib/saved-careers";

export default function SavedCareersPage() {
  const [hydrated, setHydrated] = useState(false);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const syncSavedCareers = () => {
      setSavedSlugs(readSavedCareerSlugs());
      setHydrated(true);
    };

    syncSavedCareers();
    window.addEventListener("storage", syncSavedCareers);
    window.addEventListener(SAVED_CAREERS_EVENT, syncSavedCareers);

    return () => {
      window.removeEventListener("storage", syncSavedCareers);
      window.removeEventListener(SAVED_CAREERS_EVENT, syncSavedCareers);
    };
  }, []);

  const savedCareers = useMemo(
    () =>
      savedSlugs
        .map((slug) => careers.find((career) => career.slug === slug))
        .filter((career): career is (typeof careers)[number] => Boolean(career)),
    [savedSlugs],
  );

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
          <Badge className="mb-7 text-primary">Weiterdenken</Badge>
          <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl">
            Gemerkte Berufe.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Ein ruhiger Ort für das, was du später nochmal ansehen willst.
          </p>
        </div>

        {!hydrated ? (
          <Card className="mt-14 max-w-2xl p-7 sm:p-9">
            <p className="text-2xl font-semibold leading-snug">
              Einen Moment.
            </p>
          </Card>
        ) : savedCareers.length > 0 ? (
          <div className="mt-14 space-y-8">
            {savedCareers.map((career) => (
              <section
                className="border-t border-white/10 pt-7 first:border-t-0 first:pt-0"
                key={career.slug}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="text-2xl font-semibold leading-tight">
                    <Link
                      className="rounded-sm transition duration-500 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/55"
                      href={`/careers/${career.slug}`}
                    >
                      {career.title}
                    </Link>
                  </h2>
                  <SaveCareerButton removeAction slug={career.slug} />
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <p className="text-2xl font-semibold leading-tight text-foreground/92">
                    {career.realSentences[0]}
                  </p>
                  <p className="border-l border-white/10 pl-4 text-sm leading-6 text-muted-foreground">
                    {career.laterNotices[0]}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm text-foreground/85 transition duration-500 hover:border-primary/25 hover:text-primary"
                    href={`/careers/${career.slug}`}
                  >
                    Öffnen
                    <ArrowRight className="size-4 text-primary" />
                  </Link>
                  <Link
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm text-foreground/85 transition duration-500 hover:border-primary/25 hover:text-primary"
                    href="/wege"
                  >
                    Vergleichen
                  </Link>
                  <Link
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-sm text-foreground/85 transition duration-500 hover:border-primary/25 hover:text-primary"
                    href={`/karte?career=${career.slug}`}
                  >
                    Karte
                  </Link>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <Card className="mt-14 max-w-2xl p-7 sm:p-9">
            <p className="text-2xl font-semibold leading-snug">
              Hier ist noch nichts gemerkt.
            </p>
            <Button asChild className="mt-7" variant="quiet">
              <Link href="/wege">Wege ansehen</Link>
            </Button>
          </Card>
        )}
      </section>
    </AppShell>
  );
}
