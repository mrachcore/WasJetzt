"use client";

import { useEffect, useState } from "react";
import { Bookmark, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isCareerSlugSaved,
  SAVED_CAREERS_EVENT,
  toggleSavedCareerSlug,
} from "@/lib/saved-careers";

type SaveCareerButtonProps = {
  slug: string;
  compact?: boolean;
  removeAction?: boolean;
  savedLabel?: string;
  unsavedLabel?: string;
  className?: string;
};

export function SaveCareerButton({
  slug,
  compact = false,
  removeAction = false,
  savedLabel,
  unsavedLabel,
  className,
}: SaveCareerButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const syncSavedState = () => setSaved(isCareerSlugSaved(slug));

    syncSavedState();
    window.addEventListener("storage", syncSavedState);
    window.addEventListener(SAVED_CAREERS_EVENT, syncSavedState);

    return () => {
      window.removeEventListener("storage", syncSavedState);
      window.removeEventListener(SAVED_CAREERS_EVENT, syncSavedState);
    };
  }, [slug]);

  return (
    <Button
      aria-pressed={saved}
      className={cn(
        "border border-white/10 bg-white/[0.045] text-muted-foreground hover:text-foreground",
        saved && "border-primary/20 bg-primary/10 text-primary",
        removeAction &&
          "h-auto border-transparent bg-transparent px-0 py-1 text-xs font-normal text-muted-foreground/70 hover:bg-transparent hover:text-muted-foreground",
        className,
      )}
      onClick={(event) => {
        event.stopPropagation();
        const nextSlugs = toggleSavedCareerSlug(slug);
        setSaved(nextSlugs.includes(slug));
      }}
      type="button"
      variant="quiet"
    >
      {removeAction ? (
        <>
          <X className="size-3.5" />
          Nicht mehr aufheben
        </>
      ) : (
        <>
          {saved ? (
            <Check className="size-4" />
          ) : (
            <Bookmark className="size-4" />
          )}
          {saved
            ? compact
              ? (savedLabel ?? "Aufgehoben")
              : "Liegt zum Weiterdenken bereit"
            : compact
              ? (unsavedLabel ?? "Später anschauen")
              : (unsavedLabel ?? "Später nochmal anschauen")}
        </>
      )}
    </Button>
  );
}
