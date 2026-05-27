"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCcw } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SaveCareerButton } from "@/components/save-career-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { careers, getExplorationCareers } from "@/data/careers";

export default function ResultsPage() {
  const [hydrated, setHydrated] = useState(false);
  const [storedAnswers, setStoredAnswers] = useState<string[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const raw = localStorage.getItem("wasjetzt.answers");

      try {
        setStoredAnswers(raw ? JSON.parse(raw) : []);
      } catch {
        setStoredAnswers([]);
      }

      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const explorationCareers = useMemo(() => {
    if (!storedAnswers.length) return careers;
    return getExplorationCareers(storedAnswers);
  }, [storedAnswers]);

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
              ? "Aus deinen Antworten"
              : "Zum Rumklicken"}
          </Badge>
          <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl">
            Diese Wege könnten weniger falsch wirken als andere.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Kein Beruf muss direkt dein ganzes Leben erklären.
            Klick ruhig weiter. Manchmal merkt man erst beim dritten Beruf, was
            eigentlich interessant war.
          </p>
          <div className="mt-9">
            <Button asChild variant="quiet">
              <Link href="/quiz">
                <RefreshCcw className="size-4" />
                Heute nochmal anders fühlen
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-4">
          {explorationCareers.map((career, index) => (
            <motion.div
              key={career.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.045,
                duration: 0.52,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card
                className={`transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-white/[0.095] ${
                  index === 0 ? "energy-surface" : ""
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {career.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {index === 0 ? (
                      <span className="wj-marker" data-tone="struktur" />
                    ) : null}
                    <CardTitle className="text-2xl leading-tight">
                      {career.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="max-w-3xl leading-7 text-muted-foreground">
                    {career.short}
                  </p>
                  <p className="mt-5 max-w-2xl text-sm leading-6 text-primary/80">
                    {career.discoveryNote}
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      className="inline-flex items-center gap-2 text-sm text-foreground transition duration-500 hover:text-primary"
                      href={`/careers/${career.slug}`}
                    >
                      Mehr dazu
                      <ArrowRight className="size-4 text-primary" />
                    </Link>
                    <SaveCareerButton compact slug={career.slug} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
