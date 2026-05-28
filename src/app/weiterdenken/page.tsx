"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, RefreshCcw } from "lucide-react";

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
          <Badge className="mb-7 text-primary">Zum Weiterdenken</Badge>
          <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl">
            Ein paar Wege, die du nicht sofort vergessen wolltest.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Keine Liste, die abgearbeitet werden muss. Nur ein ruhiger Ort für
            Sachen, die vielleicht später nochmal Sinn ergeben.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="quiet">
              <Link href="/quiz">
                <RefreshCcw className="size-4" />
                Heute nochmal anders fühlen
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/wege">Weiter umsehen</Link>
            </Button>
          </div>
        </div>

        {!hydrated ? (
          <Card className="mt-14 max-w-2xl p-7 sm:p-9">
            <Image
              src="/logo-mark.png"
              alt=""
              width={58}
              height={54}
              className="mb-8 h-10 w-auto opacity-35"
            />
            <p className="text-2xl font-semibold leading-snug">
              Einen Moment.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Wir schauen kurz, ob du dir etwas gemerkt hast.
            </p>
          </Card>
        ) : savedCareers.length > 0 ? (
          <div className="mt-14 space-y-5">
            {savedCareers.map((career) => (
              <Card
                className="group p-5 transition duration-700 ease-out hover:-translate-y-0.5 hover:bg-white/[0.075] sm:p-6"
                key={career.slug}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-xs text-primary/80">
                      {career.discoveryGroup}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight">
                      {career.title}
                    </h2>
                  </div>
                  <SaveCareerButton removeAction slug={career.slug} />
                </div>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                    {career.short}
                  </p>
                  <p className="mt-5 max-w-xl text-sm leading-6 text-foreground/75">
                    {career.discoveryNote}
                  </p>
                  <div className="mt-7">
                    <Link
                      className="inline-flex items-center gap-2 text-sm text-foreground/85 transition duration-500 hover:text-primary"
                      href={`/careers/${career.slug}`}
                    >
                      Nochmal reinfühlen
                      <ArrowRight className="size-4 text-primary" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-14 max-w-2xl p-7 sm:p-9">
            <Image
              src="/logo-mark.png"
              alt=""
              width={58}
              height={54}
              className="mb-8 h-10 w-auto opacity-35"
            />
            <p className="text-2xl font-semibold leading-snug">
              Hier ist noch nichts gemerkt.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Manchmal reicht es, erstmal nur herumzuschauen.
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
