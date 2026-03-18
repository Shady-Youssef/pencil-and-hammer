"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLockupMode = "auto" | "mark" | "lockup";

type BrandLockupProps = {
  name: string;
  logoUrl: string;
  className?: string;
  textClassName?: string;
  logoClassName?: string;
  markClassName?: string;
  fallbackTextClassName?: string;
  mode?: BrandLockupMode;
  priority?: boolean;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "PH";
  }

  return `${parts[0]?.[0] ?? "P"}${parts[parts.length - 1]?.[0] ?? "H"}`.toUpperCase();
}

function inferLockupMode(url: string) {
  const asset = url.trim().toLowerCase();

  if (!asset) {
    return "mark" as const;
  }

  if (asset.includes("mark") || asset.includes("icon") || asset.endsWith(".ico")) {
    return "mark" as const;
  }

  if (asset.includes("logo") || asset.includes("wordmark") || asset.includes("lockup")) {
    return "lockup" as const;
  }

  return "mark" as const;
}

export default function BrandLockup({
  name,
  logoUrl,
  className,
  textClassName,
  logoClassName,
  markClassName,
  fallbackTextClassName,
  mode = "auto",
  priority = false,
}: BrandLockupProps) {
  const initials = getInitials(name);
  const [imageFailed, setImageFailed] = useState(!logoUrl);
  const [resolvedMode, setResolvedMode] = useState<Exclude<BrandLockupMode, "auto">>(
    mode === "auto" ? inferLockupMode(logoUrl) : mode,
  );

  const presentationMode = mode === "auto" ? resolvedMode : mode;

  useEffect(() => {
    setImageFailed(!logoUrl);

    if (mode === "auto") {
      setResolvedMode(inferLockupMode(logoUrl));
    }
  }, [logoUrl, mode]);

  const handleImageLoad = ({
    currentTarget,
  }: SyntheticEvent<HTMLImageElement>) => {
    if (mode !== "auto") {
      return;
    }

    const naturalWidth = currentTarget.naturalWidth;
    const naturalHeight = currentTarget.naturalHeight;

    if (!naturalWidth || !naturalHeight) {
      return;
    }

    const aspectRatio = naturalWidth / naturalHeight;
    setResolvedMode(aspectRatio > 1.12 ? "lockup" : "mark");
  };

  if (presentationMode === "lockup" && !imageFailed) {
    return (
      <span className={cn("inline-flex min-w-0 items-center", className)}>
        <span
          className={cn(
            "flex h-10 max-w-[11rem] items-center rounded-2xl sm:h-12 sm:max-w-[13rem]",
            markClassName,
          )}
        >
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={320}
            height={120}
            sizes="(max-width: 640px) 176px, 208px"
            priority={priority}
            onError={() => setImageFailed(true)}
            onLoad={handleImageLoad}
            className={cn("h-full w-auto max-w-full object-contain object-left", logoClassName)}
          />
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <span
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background/70 sm:h-10 sm:w-10",
          markClassName,
        )}
      >
        {imageFailed ? (
          <span
            className={cn(
              "font-body text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80",
              fallbackTextClassName,
            )}
          >
            {initials}
          </span>
        ) : (
          <span className="absolute inset-[10%]">
            <Image
              src={logoUrl}
              alt={`${name} logo`}
              fill
              sizes="64px"
              priority={priority}
              onError={() => setImageFailed(true)}
              onLoad={handleImageLoad}
              className={cn("object-contain object-center", logoClassName)}
            />
          </span>
        )}
      </span>
      <span
        className={cn(
          "block min-w-0 truncate font-display text-xl font-medium leading-none tracking-[0.02em] sm:text-2xl",
          textClassName,
        )}
      >
        {name}
      </span>
    </span>
  );
}
