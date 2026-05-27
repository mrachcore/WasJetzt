import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zum Weiterdenken",
  description:
    "Ein ruhiger Ort für Wege, die du dir später nochmal anschauen willst.",
  openGraph: {
    title: "Zum Weiterdenken",
    description: "Ein paar Wege, die du nicht sofort vergessen wolltest.",
  },
};

export default function SavedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
