export const SAVED_CAREERS_KEY = "wasjetzt.savedCareers";
export const SAVED_CAREERS_EVENT = "wasjetzt:saved-careers-changed";

function parseSavedCareers(raw: string | null) {
  if (!raw) return [];

  try {
    const value = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function readSavedCareerSlugs() {
  if (typeof window === "undefined") return [];
  return parseSavedCareers(window.localStorage.getItem(SAVED_CAREERS_KEY));
}

export function writeSavedCareerSlugs(slugs: string[]) {
  if (typeof window === "undefined") return slugs;

  const uniqueSlugs = [...new Set(slugs)];
  window.localStorage.setItem(SAVED_CAREERS_KEY, JSON.stringify(uniqueSlugs));
  window.dispatchEvent(
    new CustomEvent(SAVED_CAREERS_EVENT, { detail: uniqueSlugs }),
  );

  return uniqueSlugs;
}

export function toggleSavedCareerSlug(slug: string) {
  const savedSlugs = readSavedCareerSlugs();
  const nextSlugs = savedSlugs.includes(slug)
    ? savedSlugs.filter((savedSlug) => savedSlug !== slug)
    : [slug, ...savedSlugs];

  return writeSavedCareerSlugs(nextSlugs);
}

export function isCareerSlugSaved(slug: string) {
  return readSavedCareerSlugs().includes(slug);
}
