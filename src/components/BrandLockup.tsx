"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLockupProps = {
  name: string;
  logoUrl: string;
  className?: string;
  textClassName?: string;
  logoClassName?: string;
  priority?: boolean;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "PH";
  }

  return `${parts[0]?.[0] ?? "P"}${parts[parts.length - 1]?.[0] ?? "H"}`.toUpperCase();
}

export default function BrandLockup({
  name,
  logoUrl,
  className,
  textClassName,
  logoClassName,
  priority = false,
}: BrandLockupProps) {
  const initials = getInitials(name);
  const [imageFailed, setImageFailed] = useState(!logoUrl);

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background/70">
        {imageFailed ? (
          <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80">
            {initials}
          </span>
        ) : (
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            fill
            sizes="40px"
            priority={priority}
            onError={() => setImageFailed(true)}
            className={cn("object-cover", logoClassName)}
          />
        )}
      </span>
      <span className={cn("font-display text-2xl font-medium tracking-[0.02em]", textClassName)}>
        {name}
      </span>
    </span>
  );
}
