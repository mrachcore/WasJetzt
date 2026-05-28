import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AdaptiveDebugPanel } from "@/components/adaptive-debug-panel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wasjetzt.app"),
  title: {
    default: "WasJetzt",
    template: "%s | WasJetzt",
  },
  description:
    "Ein ruhiger Ort für Ausbildung, Jobs und die Frage, was als Nächstes kommen könnte.",
  openGraph: {
    title: "WasJetzt",
    description:
      "Berufe und Ausbildungen entdecken, ohne Druck und ohne Bewerbungsstress.",
    siteName: "WasJetzt",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1536,
        height: 864,
        alt: "WasJetzt",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <AdaptiveDebugPanel />
      </body>
    </html>
  );
}
