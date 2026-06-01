import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Map } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { ContinuationLine } from "@/components/continuation-line";
import { TrackCareerView, TrackedPathwayLink } from "@/components/exploration-tracker";
import { LifeIndicatorSnapshot } from "@/components/life-indicators";
import { PracticalSignals } from "@/components/practical-signals";
import { SaveCareerButton } from "@/components/save-career-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Career,
  careers,
  getCareer,
  getEmotionalPathways,
} from "@/data/careers";
import { cn } from "@/lib/utils";

type DetailKey = "atmosphere" | "secretlyLike" | "annoys" | "comfortableFor";

type CareerPageProfile = {
  label: string;
  fitStyle: "card" | "note" | "split";
  detailOrder: DetailKey[];
  detailMode: "grid" | "feature" | "stagger";
  observationStyle: "wide" | "tight" | "stepped";
  dayStyle: "lines" | "panel" | "loose";
  dayTitle: string;
  pathwayTitle: string;
};

const defaultProfile: CareerPageProfile = {
  label: "Wie sich dieser Alltag ungefähr anfühlt",
  fitStyle: "card",
  detailOrder: ["atmosphere", "secretlyLike", "annoys", "comfortableFor"],
  detailMode: "grid",
  observationStyle: "stepped",
  dayStyle: "lines",
  dayTitle: "Ein ganz normaler Dienstag",
  pathwayTitle: "Andere Tage mit ähnlichem Gefühl.",
};

const careerPageProfiles: Record<string, CareerPageProfile> = {
  "fachinformatiker-systemintegration": {
    ...defaultProfile,
    label: "Leise Probleme, die trotzdem den ganzen Tag bestimmen",
    fitStyle: "note",
    detailOrder: ["atmosphere", "comfortableFor", "secretlyLike", "annoys"],
    detailMode: "feature",
    observationStyle: "tight",
    dayStyle: "loose",
    dayTitle: "Ein Tag, der oft mit Suchen beginnt",
  },
  elektroniker: {
    ...defaultProfile,
    label: "Werkzeug, Wege, kleine Fehler mit echten Folgen",
    fitStyle: "split",
    detailOrder: ["secretlyLike", "atmosphere", "annoys", "comfortableFor"],
    detailMode: "stagger",
    observationStyle: "stepped",
    dayTitle: "Ein Tag zwischen Plan und Wirklichkeit",
  },
  pflegefachkraft: {
    ...defaultProfile,
    label: "Nah dran, auch wenn der Tag schon voll ist",
    fitStyle: "note",
    detailOrder: ["atmosphere", "annoys", "secretlyLike", "comfortableFor"],
    detailMode: "feature",
    observationStyle: "wide",
    dayStyle: "loose",
    dayTitle: "Ein Tag, der selten ordentlich bleibt",
  },
  mediengestalter: {
    ...defaultProfile,
    label: "Details, die andere vielleicht gar nicht sehen",
    fitStyle: "split",
    detailOrder: ["annoys", "secretlyLike", "atmosphere", "comfortableFor"],
    detailMode: "stagger",
    observationStyle: "tight",
    dayTitle: "Ein Tag aus kleinen Entscheidungen",
  },
  notfallsanitaeter: {
    ...defaultProfile,
    label: "Direkt, wach, manchmal lange im Kopf",
    fitStyle: "note",
    detailOrder: ["atmosphere", "annoys", "comfortableFor", "secretlyLike"],
    detailMode: "feature",
    observationStyle: "wide",
    dayStyle: "loose",
    dayTitle: "Ein Tag, der selten wartet",
  },
  "fachkraft-lagerlogistik": {
    ...defaultProfile,
    label: "Bewegung, Ordnung, sichtbarer Fortschritt",
    fitStyle: "split",
    detailOrder: ["secretlyLike", "comfortableFor", "atmosphere", "annoys"],
    detailMode: "stagger",
    dayTitle: "Ein Tag, der sortiert werden will",
  },
  mechatroniker: {
    ...defaultProfile,
    label: "Maschinen, Geräusche, Fehler, die sich verstecken",
    fitStyle: "card",
    detailOrder: ["atmosphere", "annoys", "secretlyLike", "comfortableFor"],
    detailMode: "feature",
    dayTitle: "Ein Tag zwischen Messen und Hoffen",
  },
  erzieher: {
    ...defaultProfile,
    label: "Lärm, Nähe und sehr ehrliche kleine Menschen",
    fitStyle: "note",
    detailOrder: ["annoys", "secretlyLike", "atmosphere", "comfortableFor"],
    detailMode: "feature",
    observationStyle: "wide",
    dayStyle: "loose",
    dayTitle: "Ein Tag, der selten leise ist",
  },
  verkaeufer: {
    ...defaultProfile,
    label: "Alltag, Kunden, Regale und müde Beine",
    fitStyle: "split",
    detailOrder: ["comfortableFor", "annoys", "secretlyLike", "atmosphere"],
    detailMode: "stagger",
    dayTitle: "Ein Tag mit vielen kurzen Momenten",
  },
  koch: {
    ...defaultProfile,
    label: "Hitze, Tempo, Timing",
    fitStyle: "note",
    detailOrder: ["atmosphere", "annoys", "secretlyLike", "comfortableFor"],
    detailMode: "feature",
    observationStyle: "tight",
    dayStyle: "panel",
    dayTitle: "Ein Tag, der irgendwann schneller wird",
  },
  tischler: {
    ...defaultProfile,
    label: "Material, Maß und der Respekt vor einem Millimeter",
    fitStyle: "split",
    detailOrder: ["secretlyLike", "atmosphere", "comfortableFor", "annoys"],
    detailMode: "stagger",
    dayTitle: "Ein Tag mit Staub an den Händen",
  },
  bauzeichner: {
    ...defaultProfile,
    label: "Ruhige Linien, die später echte Räume werden",
    fitStyle: "note",
    detailOrder: ["comfortableFor", "atmosphere", "annoys", "secretlyLike"],
    detailMode: "feature",
    observationStyle: "tight",
    dayStyle: "loose",
    dayTitle: "Ein Tag auf Papier, der nicht egal ist",
  },
  industriemechaniker: {
    ...defaultProfile,
    label: "Metall, Lärm, Präzision",
    fitStyle: "card",
    detailOrder: ["atmosphere", "secretlyLike", "annoys", "comfortableFor"],
    detailMode: "stagger",
    dayTitle: "Ein Tag in der Halle",
  },
  veranstaltungstechniker: {
    ...defaultProfile,
    label: "Hinter den Kulissen, bevor es vorne schön wirkt",
    fitStyle: "note",
    detailOrder: ["secretlyLike", "annoys", "atmosphere", "comfortableFor"],
    detailMode: "feature",
    observationStyle: "wide",
    dayStyle: "panel",
    dayTitle: "Ein Tag, der oft erst spät endet",
  },
  "medizinische-fachangestellte": {
    ...defaultProfile,
    label: "Wartezimmer, Telefon, Menschen mit Angst",
    fitStyle: "split",
    detailOrder: ["annoys", "secretlyLike", "comfortableFor", "atmosphere"],
    detailMode: "feature",
    dayTitle: "Ein Tag aus kleinen Unterbrechungen",
  },
  "kaufmann-bueromanagement": {
    ...defaultProfile,
    label: "Leise Ordnung, die später Ärger verhindert",
    fitStyle: "note",
    detailOrder: ["secretlyLike", "annoys", "atmosphere", "comfortableFor"],
    detailMode: "stagger",
    observationStyle: "tight",
    dayTitle: "Ein Tag mit vielen offenen Fäden",
  },
  friseur: {
    ...defaultProfile,
    label: "Spiegel, Nähe und kleine sichtbare Veränderungen",
    fitStyle: "split",
    detailOrder: ["secretlyLike", "atmosphere", "annoys", "comfortableFor"],
    detailMode: "feature",
    dayTitle: "Ein Tag am Stuhl",
  },
  florist: {
    ...defaultProfile,
    label: "Kalte Hände, feine Stimmung, echte Anlässe",
    fitStyle: "note",
    detailOrder: ["atmosphere", "secretlyLike", "annoys", "comfortableFor"],
    detailMode: "stagger",
    observationStyle: "wide",
    dayTitle: "Ein Tag zwischen Wasser und Papier",
  },
  zugbegleiter: {
    ...defaultProfile,
    label: "Unterwegs ruhig bleiben, wenn andere es nicht sind",
    fitStyle: "split",
    detailOrder: ["annoys", "comfortableFor", "secretlyLike", "atmosphere"],
    detailMode: "feature",
    dayStyle: "loose",
    dayTitle: "Ein Tag zwischen Halten und Weiterfahren",
  },
  tierpfleger: {
    ...defaultProfile,
    label: "Früh, körperlich, leiser als romantische Bilder",
    fitStyle: "note",
    detailOrder: ["comfortableFor", "atmosphere", "annoys", "secretlyLike"],
    detailMode: "feature",
    observationStyle: "wide",
    dayTitle: "Ein Tag, der mit Beobachten beginnt",
  },
};

const seoCopy: Record<string, { title: string; description: string }> = {
  "fachinformatiker-systemintegration": {
    title:
      "Wie fühlt sich Fachinformatiker Systemintegration wirklich an? | WasJetzt",
    description:
      "Ruhige Systeme, kaputte Dinge und der Moment, wenn nach langem Suchen plötzlich alles wieder läuft.",
  },
  elektroniker: {
    title: "Elektroniker Ausbildung: Für wen sie ehrlich passen kann | WasJetzt",
    description:
      "Werkzeug, Staub, echte Fehler und sichtbare Arbeit. Was sich am Alltag als Elektroniker gut und nervig anfühlen kann.",
  },
  pflegefachkraft: {
    title:
      "Für wen sich Pflegefachkraft ehrlich passend anfühlen kann | WasJetzt",
    description:
      "Nähe, Erschöpfung, kleine wichtige Momente. Ein ehrlicher Blick auf den Alltag in der Pflege.",
  },
  mediengestalter: {
    title: "Mediengestalter: Wenn Details dich nicht loslassen | WasJetzt",
    description:
      "Layouts, Feedback, Geschmack und kleine visuelle Frustrationen. Wie Mediengestaltung sich im Alltag anfühlen kann.",
  },
  notfallsanitaeter: {
    title: "Notfallsanitäter: Wie sich dieser Weg wirklich anfühlen kann | WasJetzt",
    description:
      "Direkte Momente, Druck, Warten und Klarheit. Für Menschen, die in unübersichtlichen Situationen nicht sofort weg wollen.",
  },
  "fachkraft-lagerlogistik": {
    title: "Fachkraft für Lagerlogistik: Ordnung, Bewegung, Fortschritt | WasJetzt",
    description:
      "Hallen, Scanner, Paletten und die leise Zufriedenheit, wenn am Ende alles dort steht, wo es stehen soll.",
  },
  mechatroniker: {
    title: "Mechatroniker: Wenn Maschinen dich nicht abschrecken | WasJetzt",
    description:
      "Messen, schrauben, Geräusche ernst nehmen. Wie sich die Ausbildung als Mechatroniker anfühlen kann.",
  },
  erzieher: {
    title: "Erzieher: Nähe, Lärm und echte kleine Momente | WasJetzt",
    description:
      "Ein ehrlicher Blick auf Kita-Alltag, Geduld, Grenzen und kleine Menschen, die sehr genau merken, wer da ist.",
  },
  verkaeufer: {
    title: "Verkäufer: Alltag, Menschen und müde Beine | WasJetzt",
    description:
      "Kasse, Regale, Kundenstimmung und kurze hilfreiche Momente. Für wen Verkauf weniger falsch wirken kann.",
  },
  koch: {
    title: "Koch: Hitze, Tempo und sichtbare Arbeit | WasJetzt",
    description:
      "Kein romantischer Küchenfilm. Eher Timing, Druck, Handwerk und der kurze Stolz, wenn ein Teller stimmt.",
  },
  tischler: {
    title: "Tischler: Für wen Holz, Maß und Geduld passen können | WasJetzt",
    description:
      "Holzstaub, Millimeter, Maschinen und sichtbare Arbeit. Wie sich Tischler im Alltag anfühlen kann.",
  },
  bauzeichner: {
    title: "Bauzeichner: Ruhige Linien, echte Räume | WasJetzt",
    description:
      "CAD, Maße, Pläne und kleine Fehler mit echten Folgen. Für Menschen, die gern genau und ruhig arbeiten.",
  },
  industriemechaniker: {
    title: "Industriemechaniker: Metall, Maschinen, Genauigkeit | WasJetzt",
    description:
      "Werkhalle, Öl, schwere Teile und der Moment, wenn eine Anlage wieder läuft.",
  },
  veranstaltungstechniker: {
    title: "Veranstaltungstechniker: Hinter den Kulissen, wenn es zählt | WasJetzt",
    description:
      "Kabel, Licht, Soundcheck, späte Nächte und unsichtbare Arbeit, die einen Abend überhaupt möglich macht.",
  },
  "medizinische-fachangestellte": {
    title: "Medizinische Fachangestellte: Praxisalltag ohne Glanz | WasJetzt",
    description:
      "Telefon, Wartezimmer, Angst, Termine und die Fähigkeit, freundlich kurz zu bleiben.",
  },
  "kaufmann-bueromanagement": {
    title: "Kaufmann für Büromanagement: Wenn Ordnung leise hilft | WasJetzt",
    description:
      "Mails, Kalender, Listen und die stille Arbeit, die erst auffällt, wenn sie fehlt.",
  },
  friseur: {
    title: "Friseur: Nähe, Spiegel und sichtbare Veränderung | WasJetzt",
    description:
      "Haare, Gespräche, Stehen und der Moment, wenn jemand anders in den Spiegel schaut als vorher.",
  },
  florist: {
    title: "Florist: Schönheit, kalte Hände und echte Anlässe | WasJetzt",
    description:
      "Blumen, Wasser, Stiele, Feiertagsstress und die Frage, was ein Strauß für jemanden sagen soll.",
  },
  zugbegleiter: {
    title: "Zugbegleiter: Unterwegs ruhig bleiben | WasJetzt",
    description:
      "Bahnsteige, Fragen, Verspätungen und Menschen, die ihre Stimmung mit in den Zug bringen.",
  },
  tierpfleger: {
    title: "Tierpfleger: Fürsorge ohne romantische Bilder | WasJetzt",
    description:
      "Füttern, putzen, beobachten und merken, wenn etwas anders ist, bevor es offensichtlich wird.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return careers.map((career) => ({ slug: career.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareer(slug);

  if (!career) {
    return {
      title: "Arbeitsleben nicht gefunden | WasJetzt",
      description:
        "Ein ruhiger Ort, um zu verstehen, wie unterschiedliche Arbeitstage sich anfühlen.",
    };
  }

  const copy = seoCopy[career.slug] ?? {
    title: `${career.title}: Wie sich dieser Weg anfühlen kann | WasJetzt`,
    description: career.short,
  };

  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: "article",
      images: [
        {
          url: "/logo.png",
          width: 1536,
          height: 864,
          alt: "WasJetzt",
        },
      ],
    },
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const career = getCareer(slug);

  if (!career) notFound();

  const emotionalPathways = getEmotionalPathways(slug);
  const profile = careerPageProfiles[career.slug] ?? defaultProfile;
  const tone = getCareerTone(career.slug);

  return (
    <AppShell>
      <TrackCareerView slug={career.slug} />
      <section className="mx-auto w-full max-w-5xl px-5 pb-24 pt-7 sm:px-8">
        <Button asChild variant="ghost" className="mb-9 -ml-4">
          <Link href="/results">
            <ArrowLeft className="size-4" />
            Zurück zu den Wegen
          </Link>
        </Button>

        <div className="relative max-w-3xl">
          <Image
            src="/logo-mark.png"
            alt=""
            width={132}
            height={123}
            className="mark-breathe pointer-events-none absolute -right-10 -top-10 hidden w-28 sm:block"
          />
          <Badge className="mb-6 text-primary">{profile.label}</Badge>
          <h1 className="text-4xl font-semibold leading-[1.08] sm:text-6xl">
            {career.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            {career.short}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {career.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <PracticalSignals
            career={career}
            className="mt-5"
            label="typisch"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <SaveCareerButton slug={career.slug} />
            <Button asChild variant="quiet">
              <Link href={`/karte?career=${career.slug}`}>
                <Map className="size-4" />
                Auf der Karte ansehen
              </Link>
            </Button>
          </div>
          <ContinuationLine careerSlug={career.slug} className="mt-5" />
        </div>

        <LifeIndicatorSnapshot
          career={career}
          className="mt-10 max-w-3xl sm:ml-[8%]"
        />
        <FitSection career={career} profile={profile} />
        <ObservationStream career={career} profile={profile} />
        <RealSentencesWall career={career} />
        <LaterNoticeCards career={career} />
        <DayFragments career={career} profile={profile} tone={tone} />
        <RealismLayer career={career} />

        {emotionalPathways.length > 0 ? (
          <section className="mt-16 sm:mt-20">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm text-primary">Wenn du von hier weiterdenkst</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight">
                {profile.pathwayTitle}
              </h2>
            </div>

            <div className="space-y-8">
              {emotionalPathways.map((pathway, index) => (
                <div
                  className={`${
                    index % 2 === 0 ? "sm:mr-[8%]" : "sm:ml-[12%]"
                  }`}
                  key={pathway.prompt}
                >
                  <div className="mb-4 max-w-xl">
                    <p className="text-xl font-semibold leading-snug">
                      {pathway.prompt}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {pathway.note}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {pathway.careers.map((pathCareer) => (
                      <TrackedPathwayLink
                        href={`/careers/${pathCareer.slug}`}
                        key={pathCareer.slug}
                        prompt={pathway.prompt}
                        slugs={pathway.slugs}
                      >
                        <Card className="h-full p-5 transition duration-500 ease-out hover:-translate-y-0.5 hover:bg-white/[0.095]">
                          <p className="text-sm text-primary">
                            {pathCareer.discoveryGroup}
                          </p>
                          <h3 className="mt-4 text-xl font-semibold leading-tight">
                            {pathCareer.title}
                          </h3>
                          <p className="mt-4 text-sm leading-6 text-muted-foreground">
                            {pathCareer.discoveryNote}
                          </p>
                        </Card>
                      </TrackedPathwayLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <NextSteps career={career} />
      </section>
    </AppShell>
  );
}

function getCareerTone(slug: string) {
  if (
    [
      "pflegefachkraft",
      "notfallsanitaeter",
      "erzieher",
      "medizinische-fachangestellte",
      "friseur",
      "zugbegleiter",
    ].includes(slug)
  ) {
    return "menschen";
  }

  if (
    [
      "elektroniker",
      "mechatroniker",
      "industriemechaniker",
      "veranstaltungstechniker",
      "koch",
    ].includes(slug)
  ) {
    return "bewegung";
  }

  if (
    [
      "fachinformatiker-systemintegration",
      "bauzeichner",
      "fachkraft-lagerlogistik",
      "kaufmann-bueromanagement",
    ].includes(slug)
  ) {
    return "struktur";
  }

  if (["mediengestalter", "florist", "tischler"].includes(slug)) {
    return "ueberraschung";
  }

  return "ruhe";
}

function FitSection({
  career,
  profile,
}: {
  career: Career;
  profile: CareerPageProfile;
}) {
  if (profile.fitStyle === "note") {
    return (
      <div className="mt-14 max-w-2xl sm:ml-[8%]">
        <p className="text-sm text-primary">
          Warum manche bleiben
        </p>
        <p className="mt-4 text-2xl font-semibold leading-snug text-foreground/90 sm:text-3xl">
          {career.whyItMightFit}
        </p>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
          {career.discoveryNote}
        </p>
      </div>
    );
  }

  if (profile.fitStyle === "split") {
    return (
      <div className="mt-14 grid gap-5 sm:grid-cols-[1fr_0.8fr] sm:items-start">
        <Card className="energy-surface p-6 sm:p-8">
          <p className="text-sm text-primary">Warum manche bleiben</p>
          <p className="mt-4 text-xl font-semibold leading-snug sm:text-2xl">
            {career.whyItMightFit}
          </p>
        </Card>
        <div className="pt-2 sm:pt-8">
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            {career.discoveryNote}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="energy-surface mt-12">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <CardTitle>Warum manche bleiben</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="max-w-3xl leading-7 text-muted-foreground">
          {career.whyItMightFit}
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-primary/80">
          {career.discoveryNote}
        </p>
      </CardContent>
    </Card>
  );
}

function ObservationStream({
  career,
  profile,
}: {
  career: Career;
  profile: CareerPageProfile;
}) {
  return (
    <div
      className={cn(
        "my-16 space-y-10 sm:my-20",
        profile.observationStyle === "tight" && "space-y-7 sm:my-16",
        profile.observationStyle === "wide" && "space-y-12 sm:my-24",
      )}
    >
      {career.observations.map((observation, index) => (
        <p
          className={cn(
            "max-w-2xl text-2xl font-semibold leading-snug text-foreground/90 sm:text-3xl",
            profile.observationStyle === "tight" && "text-xl sm:text-2xl",
            profile.observationStyle === "wide" && "text-3xl sm:text-4xl",
            profile.observationStyle === "stepped" &&
              (index % 2 === 0 ? "sm:ml-[8%]" : "sm:ml-auto"),
            profile.observationStyle === "tight" &&
              (index === 1 ? "sm:ml-auto sm:max-w-xl" : "sm:ml-[6%]"),
            profile.observationStyle === "wide" &&
              (index === 0
                ? "sm:ml-[4%]"
                : index === 1
                  ? "sm:ml-auto sm:max-w-3xl"
                  : "sm:ml-[18%]"),
          )}
          key={observation}
        >
          {observation}
        </p>
      ))}
    </div>
  );
}

function RealSentencesWall({ career }: { career: Career }) {
  return (
    <section className="my-16 border-y border-white/10 py-9 sm:my-24 sm:py-12">
      <p className="text-sm text-primary">Sätze, die dort fallen</p>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
        {career.realSentences.map((sentence, index) => (
          <p
            className={cn(
              "max-w-xl text-3xl font-semibold leading-tight text-foreground/92 sm:text-5xl",
              index % 3 === 1 && "sm:pt-10",
              index % 3 === 2 && "sm:pt-4",
            )}
            key={sentence}
          >
            {sentence}
          </p>
        ))}
      </div>
    </section>
  );
}

function LaterNoticeCards({ career }: { career: Career }) {
  return (
    <section className="my-16 sm:my-24">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm text-primary">Was später hängen bleibt</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          Was du vielleicht irgendwann bemerkst.
        </h2>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        {career.laterNotices.map((notice, index) => (
          <div
            className={cn(
              "rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm leading-6 text-foreground/90 shadow-[0_12px_34px_rgba(0,0,0,0.13)] transition duration-700 ease-out hover:-translate-y-1 hover:border-primary/20 hover:bg-white/[0.065] sm:max-w-[17rem] sm:px-5 sm:py-4 sm:text-base",
              index % 3 === 1 && "sm:mt-8",
              index % 3 === 2 && "sm:mt-3",
            )}
            key={notice}
          >
            {notice}
          </div>
        ))}
      </div>
    </section>
  );
}

function DayFragments({
  career,
  profile,
  tone,
}: {
  career: Career;
  profile: CareerPageProfile;
  tone: string;
}) {
  const content = (
    <>
      <div className="mb-8 flex items-center gap-3">
        <span className="wj-marker" data-tone={tone} />
        <h2 className="text-3xl font-semibold leading-tight">
          {profile.dayTitle}
        </h2>
      </div>
      <div className="cinematic-line mb-6 h-px w-32" />
      <div
        className={cn(
          "space-y-8",
          profile.dayStyle === "loose" && "space-y-10",
          profile.dayStyle === "panel" && "space-y-5",
        )}
      >
        {career.typicalTuesday.map((item, index) => (
          <div
            className={cn(
              "grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-[150px_1fr]",
              profile.dayStyle === "loose" &&
                (index % 2 === 0 ? "sm:mr-[10%]" : "sm:ml-[10%]"),
              profile.dayStyle === "panel" &&
                "rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-[130px_1fr] sm:p-5",
            )}
            key={`${item.time}-${item.text}`}
          >
            <span className="text-sm text-primary">{item.time}</span>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </>
  );

  if (profile.dayStyle === "panel") {
    return <Card className="mt-18 p-5 sm:p-8">{content}</Card>;
  }

  return <section className="mt-18">{content}</section>;
}

function RealismLayer({ career }: { career: Career }) {
  return (
    <section className="mt-16 grid gap-8 border-y border-white/10 py-8 sm:mt-20 sm:grid-cols-[0.9fr_1.1fr] sm:py-10">
      <div>
        <p className="text-sm text-primary">Was viele unterschätzen</p>
        <div className="mt-5 space-y-4">
          {career.realism.underestimated.map((item) => (
            <p
              className="text-xl font-semibold leading-snug text-foreground/90 sm:text-2xl"
              key={item}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-6 sm:pt-7">
        <div>
          <p className="text-sm text-primary/80">Nach einem schlechten Tag eher</p>
          <p className="mt-2 text-base leading-7 text-muted-foreground">
            {career.realism.afterDay}
          </p>
        </div>
        <div>
          <p className="text-sm text-primary/80">Das merkst du oft erst später</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {career.realism.entry.map((item) => (
              <span
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          {career.realism.localTexture}
        </p>
      </div>
    </section>
  );
}

function NextSteps({ career }: { career: Career }) {
  const links = getCareerNextStepLinks(career);

  return (
    <section className="mt-20 border-t border-white/10 pt-10 sm:mt-24 sm:pt-12">
      <div className="grid gap-8 sm:grid-cols-[0.95fr_1.05fr] sm:items-start">
        <div className="max-w-2xl">
          <p className="text-sm text-primary">
            Wenn du wissen willst, ob sich das echt so anfühlt
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            Du musst noch nichts entscheiden. Nur vielleicht einen echten Tag
            näher anschauen.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Manchmal versteht man einen Weg erst, wenn man sieht, wie Menschen
            darin müde werden, bleiben oder gehen.
          </p>
        </div>

        <div className="space-y-3">
          {links.map((link) => (
            <a
              className="group block border-t border-white/10 py-4 transition duration-500 ease-out hover:border-primary/20 first:border-t-0"
              href={link.href}
              key={link.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="flex items-start justify-between gap-4">
                <span>
                  <span className="block text-base font-semibold leading-snug text-foreground/90">
                    {link.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {link.text}
                  </span>
                </span>
                <ExternalLink className="mt-0.5 size-4 shrink-0 text-primary/80 transition duration-500 group-hover:translate-x-0.5 group-hover:text-primary" />
              </span>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}

function getCareerNextStepLinks(career: Career) {
  const query = encodeURIComponent(career.title);
  const internshipQuery = encodeURIComponent(
    `Praktikum ${career.title} in der Nähe`,
  );

  return [
    {
      title: "Schauen, wo dieser Alltag wirklich auftaucht",
      text: "Nicht bewerben müssen. Erstmal nur sehen, wie nah das an deiner Gegend ist.",
      href: `https://www.arbeitsagentur.de/jobsuche/suche?angebotsart=4&was=${query}`,
    },
    {
      title: "Fakten danebenlegen",
      text: "Für Voraussetzungen und offizielle Infos, wenn du die Realität sortieren willst.",
      href: `https://web.arbeitsagentur.de/berufenet/suche?suchwoerter=${query}`,
    },
    {
      title: "Einen echten Tag suchen",
      text: "Manchmal merkt man erst nach ein paar Stunden, was daran zieht oder stört.",
      href: `https://www.google.com/search?q=${internshipQuery}`,
    },
  ];
}
