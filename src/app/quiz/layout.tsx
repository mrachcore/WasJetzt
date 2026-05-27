import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz",
  description:
    "Ein kurzer, ruhiger Einstieg in Berufe und Ausbildungen, die sich vielleicht weniger falsch anfühlen.",
  openGraph: {
    title: "WasJetzt Quiz",
    description:
      "Kein Test mit Prozenten. Nur ein paar Fragen, die beim Sortieren helfen können.",
  },
};

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
