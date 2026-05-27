"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#20271f_0%,#121812_48%,#090f0b_100%)]" />
        <div className="brand-bloom absolute left-1/2 top-[-18rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,228,204,0.19),rgba(121,148,116,0.075)_42%,transparent_70%)] blur-3xl" />
        <div className="ambient-bloom absolute bottom-[-18rem] right-[-14rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(81,106,83,0.16),transparent_68%)] blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-full py-1 pr-1 text-sm font-semibold transition-opacity duration-500 hover:opacity-90 sm:pr-3"
          aria-label="WasJetzt Startseite"
        >
          <Image
            src="/logo-icon.png"
            alt=""
            width={34}
            height={34}
            priority
            className="float-soft size-7 rounded-[0.7rem] object-cover shadow-[0_8px_22px_rgba(0,0,0,0.24)] sm:size-8 sm:rounded-[0.8rem]"
          />
          <span className="hidden sm:inline">WasJetzt</span>
        </Link>
        <nav className="glass-soft flex items-center gap-0.5 rounded-full px-1 py-1 text-xs text-muted-foreground sm:gap-1 sm:px-1.5 sm:text-sm">
          <Link
            className="rounded-full px-2.5 py-1.5 transition hover:bg-white/[0.07] hover:text-foreground sm:px-3"
            href="/quiz"
          >
            Start
          </Link>
          <Link
            className="rounded-full px-2.5 py-1.5 transition hover:bg-white/[0.07] hover:text-foreground sm:px-3"
            href="/wege"
          >
            Wege
          </Link>
          <Link
            className="rounded-full px-2.5 py-1.5 transition hover:bg-white/[0.07] hover:text-foreground sm:px-3"
            href="/weiterdenken"
          >
            <span className="sm:hidden">Merken</span>
            <span className="hidden sm:inline">Weiterdenken</span>
          </Link>
        </nav>
      </header>

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </div>
  );
}
