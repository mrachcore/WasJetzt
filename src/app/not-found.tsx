import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <AppShell>
      <section className="mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-3xl flex-col justify-center px-5 pb-24 pt-10 sm:px-8">
        <Card className="p-7 sm:p-9">
          <p className="text-sm text-primary">Hier ist gerade nichts</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Diese Seite gibt es nicht mehr oder noch nicht.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Du kannst einfach zurück zu den Wegen. Vielleicht ist da ein Alltag,
            der weniger falsch wirkt.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/wege">Wege ansehen</Link>
            </Button>
            <Button asChild variant="quiet">
              <Link href="/">Zur Startseite</Link>
            </Button>
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
