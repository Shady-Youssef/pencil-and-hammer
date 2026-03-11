"use client";

import Image from "next/image";
import { CalendarDays, ExternalLink, Eye, ImageIcon, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectRecord } from "@/lib/projects/data";

type ProjectPreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectRecord;
  hasUnsavedChanges: boolean;
  liveHref?: string | null;
};

function PreviewCard({ project }: { project: ProjectRecord }) {
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#100d09] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)]">
        <div className="relative aspect-[4/5]">
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 28rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,5,4,0.05)_0%,rgba(6,5,4,0.18)_42%,rgba(6,5,4,0.72)_100%)]" />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 font-body text-[10px] uppercase tracking-[0.28em] text-cream/90 backdrop-blur-md">
                {project.category}
              </span>
              {project.featured ? (
                <Badge className="border-0 bg-accent text-accent-foreground">Featured</Badge>
              ) : null}
            </div>

            <div className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md">
              <h3 className="font-display text-2xl text-cream">{project.title}</h3>
              <div className="mt-3 flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-gold-light/90">
                <MapPin size={14} />
                <span>{project.location || "Location pending"}</span>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-cream/75">
                {project.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailPreview({ project }: { project: ProjectRecord }) {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/80">
        <div className="relative aspect-[16/9] border-b border-border/60">
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 1280px) 100vw, 70rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,5,0.14)_0%,rgba(7,6,5,0.38)_45%,rgba(7,6,5,0.82)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="font-body text-xs uppercase tracking-[0.34em] text-gold-light">
              {project.category}
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-3xl text-cream sm:text-5xl">
              {project.title}
            </h2>
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-cream/80 sm:text-base">
              {project.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
          <div className="rounded-[1.2rem] border border-border/60 bg-background/60 p-4">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-accent" />
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Location
                </p>
                <p className="mt-1 font-body text-sm text-foreground">
                  {project.location || "Not provided"}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[1.2rem] border border-border/60 bg-background/60 p-4">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-accent" />
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Client
                </p>
                <p className="mt-1 font-body text-sm text-foreground">
                  {project.clientName || "Private client"}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[1.2rem] border border-border/60 bg-background/60 p-4">
            <div className="flex items-center gap-3">
              <CalendarDays size={16} className="text-accent" />
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Completion
                </p>
                <p className="mt-1 font-body text-sm text-foreground">{project.completionYear}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-border/70 bg-card/70 p-5 sm:p-6">
          <p className="font-body text-xs uppercase tracking-[0.32em] text-gold-light">
            {project.narrativeEyebrow}
          </p>
          <h3 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
            {project.narrativeTitle}
            <span className="text-gradient-gold"> {project.narrativeHighlight}</span>
          </h3>
          <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-border/70 bg-secondary/35 p-5 sm:p-6">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {project.detailStatusLabel}
          </p>
          <p className="mt-3 font-display text-2xl text-foreground">
            {project.detailStatusTitle}
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            {project.detailStatusDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary">{project.status}</Badge>
            <Badge variant={project.published ? "default" : "outline"}>
              {project.published ? "Published" : "Hidden"}
            </Badge>
            <Badge variant="outline">{project.images.length} image{project.images.length === 1 ? "" : "s"}</Badge>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-border/70 bg-card/70 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-2xl text-foreground">Gallery</p>
            <p className="mt-1 font-body text-sm text-muted-foreground">
              Previewing image order, captions, and cover selection.
            </p>
          </div>
          <Badge variant="outline">
            <ImageIcon className="mr-1 size-3.5" />
            {project.images.length} asset{project.images.length === 1 ? "" : "s"}
          </Badge>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {project.images.map((image) => (
            <article
              key={image.id}
              className="overflow-hidden rounded-[1.25rem] border border-border/60 bg-background/60"
            >
              <div className="relative aspect-[5/4]">
                <Image
                  src={image.imageUrl}
                  alt={image.altText}
                  fill
                  sizes="(max-width: 1024px) 100vw, 22rem"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Sort {image.sortOrder}
                  </p>
                  {image.isCover ? (
                    <Badge className="border-0 bg-accent text-accent-foreground">Cover</Badge>
                  ) : null}
                </div>
                <p className="font-body text-sm text-foreground">{image.altText}</p>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {image.caption || "No caption added yet."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ProjectPreviewDialog({
  open,
  onOpenChange,
  project,
  hasUnsavedChanges,
  liveHref,
}: ProjectPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[min(92vh,980px)] w-[min(96vw,1280px)] max-w-[min(96vw,1280px)] gap-0 overflow-hidden border-border bg-background p-0">
        <DialogHeader className="border-b border-border/70 px-4 py-4 text-left sm:px-6 sm:py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-0 bg-accent text-accent-foreground">
                  <Eye className="mr-1 size-3.5" />
                  Preview
                </Badge>
                <Badge variant={hasUnsavedChanges ? "secondary" : "outline"}>
                  {hasUnsavedChanges ? "Unsaved edits included" : "Saved state"}
                </Badge>
              </div>
              <DialogTitle className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
                This is an admin-side preview of the current draft, including unsaved changes.
              </DialogDescription>
            </div>

            {liveHref ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(liveHref, "_blank", "noopener,noreferrer")}
                className="w-full sm:w-auto"
              >
                <ExternalLink />
                Open live page
              </Button>
            ) : null}
          </div>
        </DialogHeader>

        <Tabs defaultValue="detail" className="flex min-h-0 flex-1 flex-col">
          <div className="border-b border-border/70 px-4 py-4 sm:px-6">
            <TabsList className="grid h-auto w-full grid-cols-1 bg-secondary/60 sm:grid-cols-2">
              <TabsTrigger value="detail" className="w-full">Detail Preview</TabsTrigger>
              <TabsTrigger value="card" className="w-full">Card Preview</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="detail" className="mt-0 min-h-0 flex-1">
            <ScrollArea className="h-full">
              <div className="px-4 py-4 sm:px-6 sm:py-6">
                <DetailPreview project={project} />
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="card" className="mt-0 min-h-0 flex-1">
            <ScrollArea className="h-full">
              <div className="flex min-h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(198,147,60,0.12),transparent_32%),linear-gradient(180deg,rgba(9,7,5,1)_0%,rgba(9,7,5,0.82)_100%)] px-4 py-6 sm:px-6 sm:py-10">
                <PreviewCard project={project} />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
