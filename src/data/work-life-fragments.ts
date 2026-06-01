import { careers } from "@/data/careers";

export type ArbeitsweltFragment = {
  careerSlug: string;
  careerTitle: string;
  text: string;
};

export const arbeitsweltFragments: ArbeitsweltFragment[] = careers.flatMap(
  (career) =>
    career.laterNotices.map((notice) => ({
      careerSlug: career.slug,
      careerTitle: career.title,
      text: notice,
    })),
);

export const realSentencePool: ArbeitsweltFragment[] = careers.flatMap((career) =>
  career.realSentences.map((sentence) => ({
    careerSlug: career.slug,
    careerTitle: career.title,
    text: sentence,
  })),
);

export const ambientArbeitsweltFragments = [
  "Du merkst schlechte WLANs sofort.",
  "Manche Tage fühlen sich länger an als andere.",
  "Du siehst Müdigkeit früher.",
  "Ein Drucker kann einen ganzen Morgen ruinieren.",
  "Du erkennst Chaos an Betreffzeilen.",
  "Manche Leute bleiben wegen Kollegen. Andere wegen Ruhe.",
];

export function getFragmentsForCareers(slugs: string[]) {
  const slugSet = new Set(slugs);

  return arbeitsweltFragments.filter((fragment) =>
    slugSet.has(fragment.careerSlug),
  );
}

export function getRealSentencesForCareers(slugs: string[]) {
  const slugSet = new Set(slugs);

  return realSentencePool.filter((sentence) => slugSet.has(sentence.careerSlug));
}
