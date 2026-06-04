import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nach deinen Antworten",
  description:
    "Ein paar kurze Arbeitstage zum Reinfühlen.",
  openGraph: {
    title: "WasJetzt nach deinen Antworten",
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
