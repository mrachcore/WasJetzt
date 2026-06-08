import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "7 kurze Entscheidungen",
  description:
    "Sieben schnelle Entscheidungen, aus denen später Arbeitstage werden.",
  openGraph: {
    title: "WasJetzt Entscheidungen",
    description: "Sieben schnelle Reaktionen.",
  },
};

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
