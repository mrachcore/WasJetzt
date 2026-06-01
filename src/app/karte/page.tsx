import type { Metadata } from "next";
import { Suspense } from "react";

import { AppShell } from "@/components/app-shell";
import { CareerMap } from "@/components/career-map";
import { Badge } from "@/components/ui/badge";
import { careers } from "@/data/careers";
import { ambientArbeitsweltFragments } from "@/data/work-life-fragments";

export const metadata: Metadata = {
  title: "Karte",
  description:
    "Eine ruhige Karte, auf der sich verschiedene Arbeitstage nach Rhythmus, Nähe, Bewegung und Struktur verteilen.",
};

export default function KartePage() {
  return (
    <AppShell>
      <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <div className="max-w-3xl">
          <Badge className="mb-7 text-primary">Karte</Badge>
          <h1 className="text-5xl font-semibold leading-[0.98] sm:text-7xl">
            Wo sich Tage ähnlich anfühlen.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Kein Verzeichnis. Eher ein Feld aus Routinen, Nähe, Bewegung und
            dem, was ein Tag mit dir macht.
          </p>
          <p className="mt-7 max-w-md border-l border-white/10 pl-4 text-sm leading-6 text-muted-foreground/70">
            {ambientArbeitsweltFragments[5]}
          </p>
        </div>

        <Suspense fallback={null}>
          <CareerMap careers={careers} />
        </Suspense>
      </section>
    </AppShell>
  );
}
