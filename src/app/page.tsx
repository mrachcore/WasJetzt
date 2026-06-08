import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { careers } from "@/data/careers";
import { getHomepageWorkdayCareers } from "@/data/workday-flow";

export default function Home() {
  const workdays = getHomepageWorkdayCareers(careers);

  return (
    <AppShell>
      <section className="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-5xl flex-col justify-center px-5 pb-10 pt-6 sm:min-h-[calc(100vh-76px)] sm:px-8 sm:pb-14 sm:pt-10">
        <div className="relative py-3 sm:py-8">
          <Image
            src="/logo-mark.png"
            alt=""
            width={180}
            height={168}
            className="mark-breathe pointer-events-none absolute -right-5 -top-10 hidden w-32 opacity-50 sm:block"
            priority
          />
          <p className="mb-5 text-sm text-primary">
            Fragen beantworten + Arbeitstage fühlen
          </p>
          <h1 className="max-w-3xl text-[2.55rem] font-semibold leading-[0.98] sm:text-7xl">
            Fang nicht mit einem Beruf an.
            <br />
            Fang mit einem Arbeitstag an.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-xl sm:leading-9">
            Beantworte ein paar Fragen, probiere kurze Alltagsmomente und öffne
            dann die Berufe, die hängen bleiben.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/quiz">
                Fragen starten
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="quiet" className="w-full sm:w-auto">
              <Link href="/wege">Erstmal Arbeitstage ansehen</Link>
            </Button>
            <Link
              className="inline-flex justify-center rounded-full px-3 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.055] hover:text-foreground sm:justify-start"
              href="/karte"
            >
              Karte öffnen
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 pb-28 sm:px-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-sm text-primary">Arbeitstage zum Antippen</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            Ein paar sehr verschiedene Tage.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workdays.map((career) => (
            <Link
              className="group rounded-[1.25rem] border border-white/10 bg-white/[0.025] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white/[0.06] active:translate-y-0"
              href={`/careers/${career.slug}#30-sekunden`}
              key={career.slug}
            >
              <p className="text-lg font-semibold leading-tight">
                {career.title}
              </p>
              <p className="mt-4 min-h-16 text-sm font-semibold leading-6 text-foreground/86">
                {career.realSentences[0]}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                30 Sekunden fühlen
                <ArrowRight className="size-4 transition duration-500 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
