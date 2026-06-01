import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zum Weiterdenken",
  description:
    "Ein ruhiger Ort für Alltage, die nicht sofort weg waren.",
  openGraph: {
    title: "Zum Weiterdenken",
    description: "Ein paar Alltage, die später noch da sein dürfen.",
  },
};

export default function SavedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
