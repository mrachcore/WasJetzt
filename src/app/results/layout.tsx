import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ergebnisse",
  description:
    "Berufe und Ausbildungen zum ruhigen Weiterklicken. Nicht als perfekte Matches, eher als mögliche Richtungen.",
  openGraph: {
    title: "WasJetzt Ergebnisse",
    description:
      "Diese Wege könnten weniger falsch wirken als andere. Ruhig anschauen, ohne Druck.",
  },
};

export default function ResultsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
