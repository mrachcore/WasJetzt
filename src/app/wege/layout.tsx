import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wege",
  description:
    "Wege nach Gefühl, Rhythmus und Alltag durchsuchen.",
  openGraph: {
    title: "WasJetzt Wege",
    description:
      "Such nach Ruhe, Menschen, Bewegung oder dem, was ein Tag mit dir macht.",
  },
};

export default function WegeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
