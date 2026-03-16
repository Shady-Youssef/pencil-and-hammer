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

function splitName(name: string) {
  const [first, ...rest] = name.trim().split(/\s+/);

  return {
    first: first || "Pencil",
    rest: rest.join(" "),
  };
}

export default function BrandLockup({
  name,
  logoUrl,
  className,
  textClassName,
  logoClassName,
  priority = false,
}: BrandLockupProps) {
  const words = splitName(name);

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background/70">
        <Image
          src={logoUrl}
          alt={`${name} logo`}
          fill
          sizes="40px"
          priority={priority}
          className={cn("object-cover", logoClassName)}
        />
      </span>
      <span className={cn("font-display text-2xl font-semibold tracking-wider", textClassName)}>
        {words.first}
        {words.rest ? <span className="text-gradient-gold"> {words.rest}</span> : null}
      </span>
    </span>
  );
}
