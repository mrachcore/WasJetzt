"use client";

import { useEffect } from "react";
import Link from "next/link";

import type { Situation } from "@/data/careers";
import {
  trackCareerView,
  trackObservationOpen,
  trackPathwayClick,
  trackSituationClick,
} from "@/lib/exploration-memory";

type TrackCareerViewProps = {
  slug: string;
};

export function TrackCareerView({ slug }: TrackCareerViewProps) {
  useEffect(() => {
    trackCareerView(slug);
  }, [slug]);

  return null;
}

type TrackedPathwayLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  prompt: string;
  slugs: string[];
};

export function TrackedPathwayLink({
  children,
  className,
  href,
  prompt,
  slugs,
}: TrackedPathwayLinkProps) {
  return (
    <Link
      className={className}
      href={href}
      onClick={() => trackPathwayClick(prompt, slugs)}
    >
      {children}
    </Link>
  );
}

type TrackedSituationLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  situation: Situation;
};

export function TrackedSituationLink({
  children,
  className,
  href,
  situation,
}: TrackedSituationLinkProps) {
  return (
    <Link
      className={className}
      href={href}
      onClick={() => trackSituationClick(situation)}
    >
      {children}
    </Link>
  );
}

type TrackedObservationLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  observation: string;
  slug: string;
};

export function TrackedObservationLink({
  children,
  className,
  href,
  observation,
  slug,
}: TrackedObservationLinkProps) {
  return (
    <Link
      className={className}
      href={href}
      onClick={() => trackObservationOpen(slug, observation)}
    >
      {children}
    </Link>
  );
}
