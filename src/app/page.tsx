import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SavedReturnMoment } from "@/components/saved-return-moment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { careers, getSituationCareers, situations } from "@/data/careers";

const moments = [
  {
    slug: "fachinformatiker-systemintegration",
    line: "Wenn plötzlich alles wieder funktioniert, fühlt sich das kurz unfair gut an.",
    aside: "Fachinformatiker Systemintegration",
    mood: "Ruhiger, als viele denken. Nerviger auch. Beides stimmt.",
    className: "sm:w-[86%]",
  },
  {
    slug: "mediengestalter",
    line: "Du wirst irgendwann anfangen, schlechte Logos zu bemerken.",
    aside: "Mediengestalter",
    mood: "Nicht immer kreativ im Film-Sinn. Oft eher: zehn Pixel nach links.",
    className: "sm:ml-[12%] sm:w-[74%]",
  },
  {
    slug: "fachkraft-lagerlogistik",
    line: "Manche mögen erst später, wie ruhig Ordnung sein kann.",
    aside: "Fachkraft für Lagerlogistik",
    mood: "Scanner, Paletten, Bewegung. Nicht glänzend. Aber oft klar.",
    className: "sm:ml-auto sm:w-[82%]",
  },
];

const quietInterruptions = [
  "Berufe, über die fast niemand spricht.",
  "Manche Wege wirken erst langweilig. Dann merkt man, dass genau das gut ist.",
  "Vielleicht willst du keinen Traumjob. Vielleicht willst du nur einen Tag, der dich nicht auffrisst.",
];

const quickChoices = [
  {
    label: "Ich will meine Ruhe",
    href: "/careers/bauzeichner",
    note: "ruhiger anfangen",
    tone: "ruhe",
  },
  {
    label: "Ich will etwas Echtes",
    href: "/careers/pflegefachkraft",
    note: "nah am Alltag",
    tone: "echtes",
  },
  {
    label: "Ich will nicht nur sitzen",
    href: "/careers/elektroniker",
    note: "mehr Bewegung",
    tone: "bewegung",
  },
  {
    label: "Menschen sind okay, aber nicht 8 Stunden",
    href: "/careers/fachkraft-lagerlogistik",
    note: "Kontakt mit Abstand",
    tone: "struktur",
  },
  {
    label: "Überrasch mich",
    href: "/wege",
    note: "einfach schauen",
    tone: "ueberraschung",
  },
];

export default function Home() {
  const homepageSituations = [
    situations[1],
    situations[3],
    situations[4],
    situations[7],
  ];

  return (
    <AppShell>
      <section className="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-5xl flex-col justify-center px-5 pb-16 pt-8 sm:min-h-[calc(100vh-76px)] sm:px-8 sm:pb-20 sm:pt-10">
        <div className="relative max-w-3xl">
          <Image
            src="/logo-mark.png"
            alt=""
            width={180}
            height={168}
            className="mark-breathe pointer-events-none absolute -right-8 -top-12 hidden w-36 sm:block"
            priority
          />
          <p className="mb-8 text-sm text-primary">Ohne diesen ganzen Druck</p>
          <h1 className="text-[3rem] font-semibold leading-[0.98] sm:text-7xl">
            Du musst noch nicht wissen,
            <br />
            wer du werden willst.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            Ein paar Berufe. Ein paar echte Tage. Vielleicht irgendwas, das
            weniger fremd wirkt als der Rest.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/quiz">
                Einfach anfangen
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="quiet" className="w-full sm:w-auto">
              <Link href="/wege">Erstmal umsehen</Link>
            </Button>
          </div>
          <SavedReturnMoment />
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-5 pb-28 sm:px-8">
        <div className="mb-14 max-w-lg sm:mb-20">
          <p className="text-sm text-primary">Such nicht direkt nach einem Beruf</p>
          <p className="mt-4 text-2xl font-semibold leading-snug text-foreground/90 sm:text-3xl">
            Fang mit dem an, was gerade weniger falsch klingt.
          </p>
        </div>

        <div className="mb-18 sm:mb-28">
          <div className="max-w-2xl sm:ml-auto sm:w-[78%]">
            <p className="text-sm text-primary">Was trifft dich gerade eher?</p>
            <div className="mt-6 space-y-2.5">
              {quickChoices.map((choice) => (
                <Link
                  className="choice-surface group flex items-center justify-between gap-4 rounded-[1.35rem] border border-white/10 px-4 py-3.5 text-left transition duration-500 hover:-translate-y-0.5 sm:px-5"
                  href={choice.href}
                  key={choice.label}
                >
                  <span className="flex items-center gap-3">
                    <span className="wj-marker scale-90" data-tone={choice.tone} />
                    <span>
                      <span className="block text-base font-medium leading-snug text-foreground">
                        {choice.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {choice.note}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-primary transition duration-500 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-16 sm:space-y-28">
          {moments.map((moment, index) => {
            const career = careers.find((item) => item.slug === moment.slug);
            const situation = homepageSituations[index % homepageSituations.length];
            const situationCareers = situation ? getSituationCareers(situation) : [];

            return (
              <div key={moment.slug}>
                {index === 0 && quietInterruptions[index] ? (
                  <p
                    className={`mb-8 max-w-xs text-sm leading-6 text-muted-foreground ${
                      index % 2 === 0 ? "sm:ml-[8%]" : "sm:ml-auto"
                    }`}
                  >
                    {quietInterruptions[index % quietInterruptions.length]}
                  </p>
                ) : null}

                <Link href={`/careers/${moment.slug}`} className="block">
                  <Card
                    className={`energy-surface group p-5 transition duration-700 ease-out hover:-translate-y-1 hover:bg-white/[0.095] sm:p-8 ${moment.className}`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <p className="max-w-2xl text-2xl font-semibold leading-[1.12] sm:text-5xl">
                        {moment.line}
                      </p>
                      <Image
                        src="/logo-mark.png"
                        alt=""
                        width={46}
                        height={43}
                        className="mt-1 hidden h-10 w-auto opacity-30 transition duration-700 group-hover:opacity-50 sm:block"
                      />
                    </div>
                    <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-sm text-primary">{moment.aside}</p>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                          {career?.discoveryNote ?? moment.mood}
                        </p>
                      </div>
                      <p className="inline-flex items-center gap-2 text-sm text-foreground/90">
                        kurz reinschauen
                        <ArrowRight className="size-4 text-primary" />
                      </p>
                    </div>
                  </Card>
                </Link>

                {index !== 2 ? (
                  <p
                    className={`mt-6 max-w-md text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-7 ${
                      index % 2 === 0 ? "sm:ml-auto sm:mr-[8%]" : "sm:ml-[10%]"
                    }`}
                  >
                    {moment.mood}
                  </p>
                ) : null}

                {index === 1 ? (
                  <div className="mt-12 max-w-md sm:ml-auto sm:mr-[6%]">
                    <div className="cinematic-line mb-5 h-px w-24" />
                    <p className="text-xl font-semibold leading-snug text-foreground/90 sm:text-2xl">
                      Es muss nicht sofort ein Plan sein. Manchmal reicht ein
                      Beruf, der nicht komplett absurd klingt.
                    </p>
                  </div>
                ) : null}

                {situation && index === 0 ? (
                  <div
                    className={`mt-12 max-w-2xl sm:mt-14 ${
                      index % 2 === 0 ? "sm:ml-[16%]" : "sm:ml-auto"
                    }`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <p className="text-xl font-semibold leading-snug sm:text-3xl">
                        {situation.prompt}
                      </p>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                      {situation.note}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {situationCareers.slice(0, 3).map((situationCareer) => (
                        <Link
                          className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm text-muted-foreground transition duration-500 hover:bg-white/[0.08] hover:text-foreground"
                          href={`/careers/${situationCareer.slug}`}
                          key={`${situation.prompt}-${situationCareer.slug}`}
                        >
                          {situationCareer.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-20 sm:mt-32">
          <Card className="glass-surface energy-surface p-6 sm:p-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm text-primary">Wenn du noch gar nichts weißt</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                  Dann fang nicht mit einem Plan an. Fang mit einem Gefühl an.
                </h2>
                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  Der Quiz ist kurz. Nicht wissenschaftlich. Eher wie: ein paar
                  Fragen, die nicht komplett nerven.
                </p>
              </div>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/quiz">
                  Quiz starten
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
