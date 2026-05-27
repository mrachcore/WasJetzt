"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { quizQuestions } from "@/data/careers";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const question = quizQuestions[step];
  const progressText = useMemo(
    () => `${step + 1} von ${quizQuestions.length}`,
    [step],
  );

  function choose(careers: string[], index: number) {
    if (selectedIndex !== null) return;

    setSelectedIndex(index);
    const nextAnswers = [...answers, ...careers];

    window.setTimeout(() => {
      if (step === quizQuestions.length - 1) {
        localStorage.setItem("wasjetzt.answers", JSON.stringify(nextAnswers));
        router.push(`/results?from=quiz`);
        return;
      }

      setAnswers(nextAnswers);
      setStep((current) => current + 1);
      setSelectedIndex(null);
    }, 360);
  }

  function back() {
    if (step === 0) {
      router.push("/");
      return;
    }

    setStep((current) => current - 1);
    setSelectedIndex(null);
    setAnswers((current) => current.slice(0, -1));
  }

  return (
    <AppShell>
      <section className="mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-3xl flex-col justify-center px-5 pb-20 pt-8 sm:px-8">
        <div className="mb-8 flex items-center justify-between text-sm text-muted-foreground">
          <button
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 transition duration-500 hover:bg-white/[0.055] hover:text-foreground"
            onClick={back}
            type="button"
          >
            <ArrowLeft className="size-4" />
            Zurück
          </button>
          <span>{progressText}</span>
        </div>

        <div className="mb-10 flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt=""
            width={28}
            height={26}
            className="h-6 w-auto opacity-70"
          />
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07] backdrop-blur-sm">
            <motion.div
              className="h-full rounded-full bg-primary/85"
              animate={{
                width: `${((step + 1) / quizQuestions.length) * 100}%`,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-sm text-primary">Nicht zu lange nachdenken</p>
            <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl">
              {question.question}
            </h1>

            <div className="mt-10 grid gap-3.5">
              {question.answers.map((answer, index) => (
                <motion.button
                  animate={{
                    opacity:
                      selectedIndex === null || selectedIndex === index ? 1 : 0.52,
                    scale: selectedIndex === index ? 1.012 : 1,
                  }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="group w-full text-left"
                  key={answer.label}
                  onClick={() => choose(answer.careers, index)}
                  type="button"
                >
                  <Card
                    className={`cursor-pointer p-5 transition duration-500 ease-out group-hover:-translate-y-0.5 group-hover:bg-white/[0.095] ${
                      selectedIndex === index
                        ? "energy-surface border-primary/35 bg-white/[0.115] shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3 text-[1.05rem] leading-7">
                        {selectedIndex === index ? (
                          <span className="wj-marker" data-tone="struktur" />
                        ) : null}
                        <span>{answer.label}</span>
                      </span>
                      <span className="glass-soft grid size-10 shrink-0 place-items-center rounded-full text-primary transition duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </Card>
                </motion.button>
              ))}
            </div>

            <p className="mt-8 text-sm leading-6 text-muted-foreground">
              Es geht nicht um richtig. Nimm einfach die Antwort, bei der du am
              wenigsten innerlich die Augen verdrehst.
            </p>
          </motion.div>
        </AnimatePresence>
      </section>
    </AppShell>
  );
}
