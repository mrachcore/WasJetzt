"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { buildSignalProfile, quizQuestions, type SignalWeights } from "@/data/careers";

export default function QuizPage() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [signalAnswers, setSignalAnswers] = useState<SignalWeights[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const question = quizQuestions[step];
  const progressLabel = useMemo(
    () => `Frage ${step + 1} von ${quizQuestions.length}`,
    [step],
  );
  const transition = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };

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
    }, 165);
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
      <section className="mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-4xl flex-col px-5 pb-10 pt-4 sm:justify-center sm:px-8 sm:pb-16 sm:pt-7">
        <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground sm:mb-8">
          <button
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 transition duration-200 hover:bg-white/[0.055] hover:text-foreground active:scale-[0.98]"
            onClick={back}
            type="button"
          >
            <ArrowLeft className="size-4" />
            Zurück
          </button>
          <span>{progressLabel}</span>
        </div>

        <div className="mb-8 sm:mb-12">
          <div
            aria-label={progressLabel}
            aria-valuemax={quizQuestions.length}
            aria-valuemin={1}
            aria-valuenow={step + 1}
            className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.075] backdrop-blur-sm"
            role="progressbar"
          >
            <motion.div
              animate={{
                width: `${((step + 1) / quizQuestions.length) * 100}%`,
              }}
              className="h-full rounded-full bg-primary"
              transition={transition}
            />
          </div>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {quizQuestions.map((item, index) => (
              <span
                className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${
                  index <= step ? "bg-primary/80" : "bg-white/[0.08]"
                }`}
                key={item.id}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -8,
              filter: shouldReduceMotion ? "blur(0px)" : "blur(3px)",
            }}
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 14,
              filter: shouldReduceMotion ? "blur(0px)" : "blur(5px)",
            }}
            key={question.id}
            transition={transition}
          >
            <div className="max-w-3xl">
              {"scene" in question ? (
                <p className="mb-5 max-w-2xl text-lg font-medium leading-7 text-foreground/72 sm:mb-6 sm:text-2xl sm:leading-9">
                  {question.scene}
                </p>
              ) : null}
              <h1 className="text-4xl font-semibold leading-[1.04] text-foreground sm:text-6xl">
                {question.prompt}
              </h1>
            </div>

            <div className="mt-8 grid gap-3.5 sm:mt-12 sm:grid-cols-2 sm:gap-4">
              {question.answers.map((answer, index) => (
                <div key={answer.label}>
                  <motion.button
                    animate={{
                      opacity:
                        selectedIndex === null || selectedIndex === index ? 1 : 0.48,
                      scale: selectedIndex === index && !shouldReduceMotion ? 1.012 : 1,
                    }}
                    className="group h-full w-full text-left focus-visible:outline-none"
                    disabled={selectedIndex !== null}
                    onClick={() => choose(answer, index)}
                    transition={transition}
                    type="button"
                  >
                    <span
                      className={`block h-full rounded-[1.15rem] border px-5 py-5 transition duration-200 ease-out group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ring group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:bg-white/[0.105] group-active:translate-y-0 group-active:border-primary/70 group-active:bg-primary/[0.18] sm:px-6 sm:py-7 ${
                        selectedIndex === index
                          ? "border-primary bg-primary/[0.24] shadow-[0_0_0_1px_rgba(200,222,192,0.22)]"
                          : "border-white/20 bg-white/[0.07]"
                      }`}
                    >
                      <span className="flex h-full min-h-24 items-end justify-between gap-4 sm:min-h-32">
                        <span className="text-[1.7rem] font-semibold leading-[1.08] text-foreground sm:text-4xl">
                          {answer.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mb-0.5 grid size-10 shrink-0 place-items-center rounded-full border transition duration-200 group-hover:translate-x-0.5 ${
                            selectedIndex === index
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-primary/35 bg-primary/[0.16] text-primary group-hover:bg-primary/[0.24]"
                          }`}
                        >
                          {selectedIndex === index ? (
                            <Check className="size-5 shrink-0" />
                          ) : (
                            <ArrowRight className="size-5 shrink-0" />
                          )}
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
