"use client";

import { useEffect, useMemo, useState } from "react";

import { careers } from "@/data/careers";
import {
  EXPLORATION_MEMORY_EVENT,
  explorationTendencies,
  getExplorationDebugSnapshot,
  resetExplorationMemory,
  seedExplorationProfile,
  type ExplorationDebugSnapshot,
} from "@/lib/exploration-memory";

const DEBUG_FLAG_KEY = "wasjetzt_debug";
const isDevelopment = process.env.NODE_ENV === "development";

export function AdaptiveDebugPanel() {
  const [enabled, setEnabled] = useState(isDevelopment);
  const [open, setOpen] = useState(false);
  const [snapshot, setSnapshot] = useState<ExplorationDebugSnapshot | null>(null);

  useEffect(() => {
    if (isDevelopment) return;

    const frame = window.requestAnimationFrame(() => {
      const hasDebugFlag = window.localStorage.getItem(DEBUG_FLAG_KEY) === "true";
      setEnabled(hasDebugFlag);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const syncSnapshot = () => {
      setSnapshot(getExplorationDebugSnapshot(careers));
    };

    syncSnapshot();
    window.addEventListener(EXPLORATION_MEMORY_EVENT, syncSnapshot);
    window.addEventListener("storage", syncSnapshot);

    return () => {
      window.removeEventListener(EXPLORATION_MEMORY_EVENT, syncSnapshot);
      window.removeEventListener("storage", syncSnapshot);
    };
  }, [enabled]);

  const tendencyRows = useMemo(() => {
    if (!snapshot) return [];

    return explorationTendencies.map((tendency) => ({
      label: tendency,
      value: snapshot.memory.tendencies[tendency] ?? 0,
    }));
  }, [snapshot]);

  if (!enabled || !snapshot) return null;

  function resetMemory() {
    resetExplorationMemory();
  }

  function seedQuiet() {
    seedExplorationProfile("ruhe-struktur");
  }

  function seedPractical() {
    seedExplorationProfile("bewegung-praktisch");
  }

  function seedPeople() {
    seedExplorationProfile("menschen-direkt");
  }

  return (
    <aside className="fixed bottom-3 right-3 z-[80] w-[min(24rem,calc(100vw-1.5rem))] rounded-2xl border border-amber-300/25 bg-black/80 text-xs text-white shadow-2xl backdrop-blur-xl">
      <button
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold text-amber-100"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        Adaptive QA
        <span className="text-[0.7rem] font-normal text-white/60">
          {open ? "close" : "open"}
        </span>
      </button>

      {open ? (
        <div className="max-h-[72vh] overflow-y-auto border-t border-white/10 px-4 pb-4 pt-3">
          <div className="grid grid-cols-2 gap-2">
            <DebugButton onClick={resetMemory}>Reset exploration memory</DebugButton>
            <DebugButton onClick={seedQuiet}>Seed Ruhe/Struktur</DebugButton>
            <DebugButton onClick={seedPractical}>
              Seed Bewegung/Praktisch
            </DebugButton>
            <DebugButton onClick={seedPeople}>Seed Menschen/Direkt</DebugButton>
          </div>

          <DebugSection title="Careers">
            <DebugList label="viewed" values={snapshot.memory.viewedCareers} />
            <DebugList label="saved" values={snapshot.memory.savedCareers} />
            <DebugList label="compared" values={snapshot.memory.comparedCareers} />
          </DebugSection>

          <DebugSection title="Exploration">
            <div className="grid grid-cols-3 gap-2 text-[0.7rem]">
              <div>
                <p className="text-white/55">confidence</p>
                <p className="font-mono text-amber-100">
                  {snapshot.hasAdaptiveConfidence ? "yes" : "no"}
                </p>
              </div>
              <div>
                <p className="text-white/55">tone</p>
                <p className="font-mono text-amber-100">{snapshot.adaptiveTone}</p>
              </div>
              <div>
                <p className="text-white/55">signal</p>
                <p className="font-mono text-amber-100">
                  {snapshot.signalStrength.toFixed(2)}
                </p>
              </div>
            </div>
            <DebugList label="filters" values={snapshot.memory.selectedFilters} />
            <DebugList label="pathways" values={snapshot.memory.clickedPathways} />
            <DebugList label="situations" values={snapshot.memory.clickedSituations} />
          </DebugSection>

          <DebugSection title="Tendencies">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {tendencyRows.map((row) => (
                <div className="flex justify-between gap-2" key={row.label}>
                  <span className="text-white/55">{row.label}</span>
                  <span className="font-mono text-amber-100">
                    {row.value.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </DebugSection>

          <DebugSection title="Adaptive suggestions">
            <ol className="space-y-1">
              {snapshot.suggestions.map((career, index) => (
                <li className="flex gap-2" key={career.slug}>
                  <span className="w-4 shrink-0 text-white/40">{index + 1}</span>
                  <span>{career.title}</span>
                </li>
              ))}
            </ol>
          </DebugSection>
        </div>
      ) : null}
    </aside>
  );
}

function DebugButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-2 text-left text-[0.7rem] text-white/85 transition hover:bg-white/15 hover:text-white"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function DebugSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="mt-4 border-t border-white/10 pt-3">
      <h2 className="mb-2 font-semibold text-amber-100">{title}</h2>
      {children}
    </section>
  );
}

function DebugList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="mt-2">
      <p className="text-white/55">{label}</p>
      <p className="mt-0.5 break-words font-mono text-[0.7rem] leading-5 text-white/85">
        {values.length ? values.join(", ") : "-"}
      </p>
    </div>
  );
}
