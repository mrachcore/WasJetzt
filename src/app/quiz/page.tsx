"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { buildSignalProfile, quizQuestions, type SignalWeights } from "@/data/careers";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [signalAnswers, setSignalAnswers] = useState<SignalWeights[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const question = quizQuestions[step];
  const progressText = useMemo(
    () => `${step + 1} / ${quizQuestions.length}`,
    [step],
  );

  function choose(answer: (typeof question.answers)[number], index: number) {
    if (selectedIndex !== null) return;

    setSelectedIndex(index);
    const nextAnswers = [...answers, answer.careers];
    const nextSignalAnswers = [...signalAnswers, answer.signals];

    window.setTimeout(() => {
      if (step === quizQuestions.length - 1) {
        localStorage.setItem("wasjetzt.answers", JSON.stringify(nextAnswers.flat()));
        localStorage.setItem(
          "wasjetzt.signalProfile",
          JSON.stringify(buildSignalProfile(nextSignalAnswers)),
        );
        router.push("/results?from=quiz");
        return;
      }

      setAnswers(nextAnswers);
      setSignalAnswers(nextSignalAnswers);
      setStep((current) => current + 1);
      setSelectedIndex(null);
    }, 180);
  }

  function back() {
    if (step === 0) {
      router.push("/");
      return;
    }

    setStep((current) => current - 1);
    setSelectedIndex(null);
    setAnswers((current) => current.slice(0, -1));
    setSignalAnswers((current) => current.slice(0, -1));
  }

  return (
    <AppShell>
      <section className="mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-4xl flex-col justify-center px-5 pb-16 pt-7 sm:px-8">
        <div className="mb-8 flex items-center justify-between text-sm text-muted-foreground">
          <button
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 transition duration-500 hover:bg-white/[0.055] hover:text-foreground active:scale-[0.98]"
            onClick={back}
            type="button"
          >
            <ArrowLeft className="size-4" />
            Zurück
          </button>
          <span>{progressText}</span>
        </div>

        <div className="mb-10 sm:mb-14">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07] backdrop-blur-sm">
            <motion.div
              animate={{
                width: `${((step + 1) / quizQuestions.length) * 100}%`,
              }}
              className="h-full rounded-full bg-primary/85"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            key={question.id}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl">
              {"scene" in question ? (
                <p className="mb-7 max-w-2xl text-xl font-semibold leading-8 text-foreground/72 sm:text-2xl sm:leading-9">
                  {question.scene}
                </p>
              ) : null}
              <h1 className="text-5xl font-semibold leading-[1.02] text-foreground sm:text-7xl">
                {question.prompt}
              </h1>
            </div>

            <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2">
              {question.answers.map((answer, index) => (
                <div key={answer.label}>
                  <motion.button
                    animate={{
                      opacity:
                        selectedIndex === null || selectedIndex === index ? 1 : 0.58,
                      scale: selectedIndex === index ? 1.018 : 1,
                    }}
                    className="group h-full w-full text-left"
                    disabled={selectedIndex !== null}
                    onClick={() => choose(answer, index)}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    type="button"
                  >
                    <span
                      className={`block h-full rounded-[1.45rem] border px-5 py-5 shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition duration-300 ease-out group-hover:-translate-y-1 group-hover:border-primary/45 group-hover:bg-white/[0.095] group-active:translate-y-0 group-active:bg-primary/[0.16] sm:px-6 sm:py-7 ${
                        selectedIndex === index
                          ? "border-primary/70 bg-primary/[0.22] shadow-[0_12px_30px_rgba(0,0,0,0.24)]"
                          : "border-white/18 bg-white/[0.06]"
                      }`}
                    >
                      <span className="flex h-full min-h-28 items-end justify-between gap-4 sm:min-h-32">
                        <span className="text-3xl font-semibold leading-tight sm:text-5xl">
                          {answer.label}
                        </span>
                        <span
                          className={`mb-1 rounded-full border p-2.5 transition duration-300 group-hover:translate-x-0.5 ${
                            selectedIndex === index
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-primary/35 bg-primary/[0.16] text-primary group-hover:bg-primary/[0.24]"
                          }`}
                        >
                          <ArrowRight className="size-4.5 shrink-0" />
                        </span>
                      </span>
                    </span>
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </AppShell>
  );
}
