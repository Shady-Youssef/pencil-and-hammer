"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

import type { ProjectRecord } from "@/lib/projects/data";

type ProjectCardProps = {
  project: ProjectRecord;
  priority?: boolean;
  compact?: boolean;
};

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export default function ProjectCard({
  project,
  priority = false,
  compact = false,
}: ProjectCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const href = `/portfolio/${project.slug}` as Route;

  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isModifiedEvent(event) || event.button !== 0) {
      return;
    }

    event.preventDefault();

    if (isNavigating) {
      return;
    }

    setIsNavigating(true);

    window.setTimeout(() => {
      const documentWithTransition = document as Document & {
        startViewTransition?: (callback: () => void) => void;
      };

      if (typeof documentWithTransition.startViewTransition === "function") {
        documentWithTransition.startViewTransition(() => {
          startTransition(() => {
            router.push(href);
          });
        });
        return;
      }

      startTransition(() => {
        router.push(href);
      });
    }, 90);
  };

  return (
    <motion.article
      layout
      animate={
        isNavigating
          ? { y: -12, scale: 0.972, rotateX: 2 }
          : { y: 0, scale: 1, rotateX: 0 }
      }
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{ transformPerspective: 1400 }}
    >
      <Link
        href={href}
        onClick={handleNavigate}
        onMouseEnter={() => router.prefetch(href)}
        className="block"
      >
        <motion.div
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.992 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-0"
        >
          <div
            className={`relative overflow-hidden rounded-[1.2rem] border border-white/8 bg-charcoal ${
              compact ? "aspect-[4/5]" : "aspect-[4/5]"
            }`}
            style={{ viewTransitionName: `project-cover-${project.slug}` }}
          >
            <Image
              src={project.coverImageUrl}
              alt={project.title}
              fill
              priority={priority}
              sizes={
                compact
                  ? "(max-width: 768px) 100vw, 33vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              className="object-cover transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:blur-[2px] group-hover:brightness-[0.72]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,3,2,0.02)_0%,rgba(4,3,2,0.05)_45%,rgba(4,3,2,0.18)_100%)] transition-all duration-700 group-hover:bg-[linear-gradient(180deg,rgba(4,3,2,0.08)_0%,rgba(4,3,2,0.18)_34%,rgba(4,3,2,0.58)_100%)]" />
            <motion.div
              animate={isNavigating ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-black/22 backdrop-blur-md"
            />
            <motion.div
              animate={isNavigating ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-accent/15"
            />
            <motion.div
              animate={
                isNavigating
                  ? { x: ["-130%", "135%"], opacity: [0, 0.35, 0] }
                  : { x: "-130%", opacity: 0 }
              }
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)] blur-2xl"
            />

            <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-white/12 bg-black/18 px-3 py-1 font-body text-[9px] uppercase tracking-[0.22em] text-cream/0 backdrop-blur-md transition-all duration-500 group-hover:bg-black/24 group-hover:text-cream/85 sm:text-[10px] sm:tracking-[0.3em]">
                  {project.category}
                </span>
                <motion.span
                  animate={
                    isNavigating
                      ? { scale: 1.08, rotate: 0 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/10 text-cream/0 backdrop-blur-md transition-all duration-500 group-hover:bg-accent/95 group-hover:text-charcoal"
                >
                  <ArrowUpRight size={16} />
                </motion.span>
              </div>

              <motion.div
                initial={false}
                animate={
                  isNavigating
                    ? { y: -8, opacity: 0.96 }
                    : { y: 0, opacity: 1 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="translate-y-4 opacity-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-6"
              >
                <div className="max-w-sm rounded-[1.2rem] border border-white/10 bg-black/18 p-4 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:rounded-[1.35rem] sm:p-5">
                  <h3 className="font-display text-xl text-cream sm:text-2xl md:text-[2rem]">
                    {project.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.16em] text-gold-light/90 sm:mt-4 sm:text-xs sm:tracking-[0.24em]">
                    <MapPin size={13} />
                    <span>{project.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
