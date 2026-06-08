import type { Career } from "@/data/careers";

export const homepageWorkdaySlugs = [
  "fachinformatiker-systemintegration",
  "pflegefachkraft",
  "hoerakustiker",
  "vermessungstechniker",
  "bestattungsfachkraft",
  "lokfuehrer",
] as const;

export const workdayExplorationRoute = [
  "fachinformatiker-systemintegration",
  "pflegefachkraft",
  "vermessungstechniker",
  "hoerakustiker",
  "forstwirt",
  "chemielaborant",
  "lokfuehrer",
  "bestattungsfachkraft",
  "geomatiker",
  "orthopaedietechnik-mechaniker",
  "veranstaltungstechniker",
  "medizinischer-technologe-laboratorium",
  "tischler",
  "justizfachangestellter",
  "gebaeudereiniger",
  "werkzeugmechaniker",
  "medizinische-fachangestellte",
  "umwelttechnologe-abwasser",
  "technischer-produktdesigner",
  "fachkraft-schutz-sicherheit",
  "florist",
  "anlagenmechaniker-shk",
  "kaufmann-bueromanagement",
  "operationstechnischer-assistent",
  "mediengestalter",
  "pharmakant",
  "zugbegleiter",
  "zahntechniker",
  "bauzeichner",
  "fahrzeuglackierer",
  "notfallsanitaeter",
  "mechatroniker",
  "friseur",
  "industriemechaniker",
  "erzieher",
  "fachkraft-lagerlogistik",
  "koch",
  "elektroniker",
  "verkaeufer",
  "tierpfleger",
] as const;

export function getHomepageWorkdayCareers<T extends Pick<Career, "slug">>(
  sourceCareers: T[],
) {
  return homepageWorkdaySlugs
    .map((slug) => sourceCareers.find((career) => career.slug === slug))
    .filter((career): career is T => Boolean(career));
}

export function getNextWorkday<T extends Pick<Career, "slug" | "title">>(
  currentSlug: string,
  sourceCareers: T[],
) {
  if (sourceCareers.length <= 1) return null;

  const bySlug = new Map(sourceCareers.map((career) => [career.slug, career]));
  const currentRouteIndex = workdayExplorationRoute.indexOf(
    currentSlug as (typeof workdayExplorationRoute)[number],
  );

  if (currentRouteIndex >= 0) {
    for (let offset = 1; offset <= workdayExplorationRoute.length; offset += 1) {
      const nextSlug =
        workdayExplorationRoute[
          (currentRouteIndex + offset) % workdayExplorationRoute.length
        ];
      const nextCareer = bySlug.get(nextSlug);

      if (nextCareer && nextCareer.slug !== currentSlug) return nextCareer;
    }
  }

  const currentIndex = sourceCareers.findIndex(
    (career) => career.slug === currentSlug,
  );
  const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;

  return sourceCareers[nextIndex % sourceCareers.length] ?? null;
}
