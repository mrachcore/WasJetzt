import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fragen",
  description:
    "Ein paar konkrete Fragen darüber, welche Art Arbeitstag sich weniger falsch anfühlt.",
  openGraph: {
    title: "WasJetzt Fragen",
    description:
      "Kurze Fragen über Energie, Menschen, Ruhe und Alltag.",
  },
};

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
