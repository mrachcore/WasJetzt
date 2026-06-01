import type { MetadataRoute } from "next";

import { careers } from "@/data/careers";

const baseUrl = "https://wasjetzt.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/quiz",
    "/wege",
    "/karte",
    "/results",
    "/weiterdenken",
    ...careers.map((career) => `/careers/${career.slug}`),
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
