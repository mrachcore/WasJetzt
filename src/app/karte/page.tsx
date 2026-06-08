import type { Metadata } from "next";
import { Suspense } from "react";

import { AppShell } from "@/components/app-shell";
import { CareerMap } from "@/components/career-map";
import { Badge } from "@/components/ui/badge";
import { careers } from "@/data/careers";

export const metadata: Metadata = {
  title: "Karte",
  description:
    "Eine Karte, auf der sich Berufe nach Alltag, Naehe, Bewegung und Struktur verteilen.",
};

export default function KartePage() {
  return (
    <AppShell>
      <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <div className="max-w-3xl">
          <Badge className="mb-7 text-primary">Karte</Badge>
          <h1 className="text-5xl font-semibold leading-[0.98] sm:text-7xl">
            Berufe auf der Karte.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Waehle einen Beruf, fuehle kurz den Arbeitstag oder oeffne die Seite.
          </p>
        </div>

        <Suspense fallback={null}>
          <CareerMap careers={careers} />
        </Suspense>
      </section>
    </AppShell>
  );
}
