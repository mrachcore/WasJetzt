import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ergebnisse",
  description:
    "Richtungen zum ruhigen Weiterklicken. Keine perfekten Treffer.",
  openGraph: {
    title: "WasJetzt Ergebnisse",
    description:
      "Diese Arbeitstage könnten weniger falsch wirken als andere. Ruhig anschauen, ohne Druck.",
  },
};

export default function ResultsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
