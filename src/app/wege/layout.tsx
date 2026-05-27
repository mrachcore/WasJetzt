import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wege",
  description:
    "Berufe nach Gefühl, Alltag und Stimmung durchsuchen. Ein ruhiger Finder für Ausbildungen und mögliche Richtungen.",
  openGraph: {
    title: "WasJetzt Wege",
    description:
      "Such nach einem Beruf, einer Stimmung oder einfach nach dem, was du im Alltag nicht mehr willst.",
  },
};

export default function WegeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
