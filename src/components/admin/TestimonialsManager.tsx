"use client";

import { Loader2, Plus, Save, Star, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  deriveInitials,
  fallbackTestimonials,
  normalizeTestimonial,
  testimonialsSelect,
  type TestimonialRecord,
  type TestimonialRow,
} from "@/lib/testimonials/data";

type TestimonialDraft = TestimonialRecord;

type TestimonialsManagerProps = {
  initialTestimonials: TestimonialRecord[];
  initialError: string | null;
};

function sortTestimonials(testimonials: TestimonialDraft[]) {
  return [...testimonials].sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }

    return left.name.localeCompare(right.name);
  });
}

function createDraft(testimonials: TestimonialRecord[]) {
  return sortTestimonials(testimonials);
}

function createEmptyTestimonial(sortOrder: number): TestimonialDraft {
  return {
    id: `temp-${crypto.randomUUID()}`,
    name: "",
    role: "",
    quote: "",
    initials: "",
    rating: 5,
    sortOrder,
    published: true,
  };
}

export default function TestimonialsManager({
  initialTestimonials,
  initialError,
}: TestimonialsManagerProps) {
  const { client } = useAuth();
  const [draft, setDraft] = useState(() =>
    createDraft(initialTestimonials.length ? initialTestimonials : fallbackTestimonials),
  );
  const [errorMessage, setErrorMessage] = useState(initialError);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [hasAttemptedSeed, setHasAttemptedSeed] = useState(initialTestimonials.length > 0);
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  const hasPersistedTestimonials = useMemo(
    () => draft.some((item) => !item.id.startsWith("fallback-") && !item.id.startsWith("temp-")),
    [draft],
  );

  const refreshTestimonials = useCallback(async () => {
    const { data, error } = await client.from("testimonials").select(testimonialsSelect);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const nextTestimonials = (data as TestimonialRow[]).length
      ? sortTestimonials((data as TestimonialRow[]).map(normalizeTestimonial))
      : sortTestimonials(fallbackTestimonials);

    setDraft(nextTestimonials);
    setRemovedIds([]);
    setErrorMessage(null);
  }, [client]);

  const seedFallbackTestimonials = useCallback(async () => {
    setIsSeeding(true);

    try {
      const { data: existing, error: existingError } = await client
        .from("testimonials")
        .select("id");

      if (existingError) {
        throw existingError;
      }

      if ((existing ?? []).length) {
        await refreshTestimonials();
        return;
      }

      const payload = fallbackTestimonials.map((item) => ({
        name: item.name,
        role: item.role,
        quote: item.quote,
        initials: item.initials,
        rating: item.rating,
        sort_order: item.sortOrder,
        published: item.published,
      }));

      const { error } = await client.from("testimonials").insert(payload);

      if (error) {
        throw error;
      }

      await refreshTestimonials();
      toast.success("Testimonials synced to Supabase.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sync testimonials.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSeeding(false);
    }
  }, [client, refreshTestimonials]);

  useEffect(() => {
    if (errorMessage || hasPersistedTestimonials || hasAttemptedSeed) {
      return;
    }

    setHasAttemptedSeed(true);
    void seedFallbackTestimonials();
  }, [errorMessage, hasAttemptedSeed, hasPersistedTestimonials, seedFallbackTestimonials]);

  function updateTestimonial(
    id: string,
    updater: (testimonial: TestimonialDraft) => TestimonialDraft,
  ) {
    setDraft((current) =>
      current.map((testimonial) => (testimonial.id === id ? updater(testimonial) : testimonial)),
    );
  }

  function addTestimonial() {
    const nextSort =
      (draft.length ? Math.max(...draft.map((item) => item.sortOrder)) : 0) + 10;

    setDraft((current) => [...current, createEmptyTestimonial(nextSort)]);
  }

  function removeTestimonial(testimonial: TestimonialDraft) {
    if (!testimonial.id.startsWith("temp-") && !testimonial.id.startsWith("fallback-")) {
      setRemovedIds((current) => [...current, testimonial.id]);
    }

    setDraft((current) => current.filter((item) => item.id !== testimonial.id));
  }

  async function handleSave() {
    setIsSaving(true);

    try {
      if (removedIds.length) {
        const { error } = await client.from("testimonials").delete().in("id", removedIds);

        if (error) {
          throw error;
        }
      }

      const existingTestimonials = draft
        .filter((item) => !item.id.startsWith("temp-") && !item.id.startsWith("fallback-"))
        .map((item) => ({
          id: item.id,
          name: item.name.trim(),
          role: item.role.trim(),
          quote: item.quote.trim(),
          initials: (item.initials.trim() || deriveInitials(item.name)).toUpperCase(),
          rating: item.rating,
          sort_order: item.sortOrder,
          published: item.published,
        }));

      const newTestimonials = draft
        .filter((item) => item.id.startsWith("temp-") || item.id.startsWith("fallback-"))
        .map((item) => ({
          name: item.name.trim(),
          role: item.role.trim(),
          quote: item.quote.trim(),
          initials: (item.initials.trim() || deriveInitials(item.name)).toUpperCase(),
          rating: item.rating,
          sort_order: item.sortOrder,
          published: item.published,
        }));

      if (existingTestimonials.length) {
        const { error } = await client.from("testimonials").upsert(existingTestimonials);

        if (error) {
          throw error;
        }
      }

      if (newTestimonials.length) {
        const { error } = await client.from("testimonials").insert(newTestimonials);

        if (error) {
          throw error;
        }
      }

      await refreshTestimonials();
      toast.success("Testimonials saved.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save testimonials.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {errorMessage ? (
        <div className="rounded-[1.25rem] border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
          <p className="font-body leading-relaxed">
            Testimonials are using fallback content right now: {errorMessage}. Run the new
            Supabase migration in `supabase/migrations` so testimonials can be saved.
          </p>
        </div>
      ) : null}

      {!errorMessage && !hasPersistedTestimonials ? (
        <div className="rounded-[1.25rem] border border-accent/25 bg-accent/10 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-xl text-foreground">Testimonials are syncing</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                The current homepage testimonials are being stored as real editable records.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => void seedFallbackTestimonials()}
              className="bg-gradient-gold text-charcoal hover:opacity-95"
              disabled={isSeeding}
            >
              {isSeeding ? <Loader2 className="animate-spin" /> : <Save />}
              Sync Testimonials
            </Button>
          </div>
        </div>
      ) : null}

      <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl text-foreground">Testimonials</p>
            <p className="mt-1 font-body text-sm text-muted-foreground">
              Edit the client quotes shown on the homepage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={addTestimonial}>
              <Plus />
              Add Testimonial
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-gradient-gold text-charcoal hover:opacity-95"
              disabled={isSaving || isSeeding}
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
              Save
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {sortTestimonials(draft).map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-[1.2rem] border border-border/80 bg-background/60 p-4"
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_120px_120px]">
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Name
                  </label>
                  <Input
                    value={testimonial.name}
                    onChange={(event) =>
                      updateTestimonial(testimonial.id, (current) => ({
                        ...current,
                        name: event.target.value,
                        initials: current.initials || deriveInitials(event.target.value),
                      }))
                    }
                    placeholder="Client name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Role
                  </label>
                  <Input
                    value={testimonial.role}
                    onChange={(event) =>
                      updateTestimonial(testimonial.id, (current) => ({
                        ...current,
                        role: event.target.value,
                      }))
                    }
                    placeholder="Homeowner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Initials
                  </label>
                  <Input
                    value={testimonial.initials}
                    onChange={(event) =>
                      updateTestimonial(testimonial.id, (current) => ({
                        ...current,
                        initials: event.target.value.toUpperCase().slice(0, 3),
                      }))
                    }
                    placeholder="SM"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Sort Order
                  </label>
                  <Input
                    type="number"
                    value={String(testimonial.sortOrder)}
                    onChange={(event) =>
                      updateTestimonial(testimonial.id, (current) => ({
                        ...current,
                        sortOrder: Number(event.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Quote
                </label>
                <Textarea
                  rows={4}
                  value={testimonial.quote}
                  onChange={(event) =>
                    updateTestimonial(testimonial.id, (current) => ({
                      ...current,
                      quote: event.target.value,
                    }))
                  }
                  placeholder="Client testimonial quote"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-3 font-body text-sm text-foreground">
                    <Checkbox
                      checked={testimonial.published}
                      onCheckedChange={(checked) =>
                        updateTestimonial(testimonial.id, (current) => ({
                          ...current,
                          published: Boolean(checked),
                        }))
                      }
                    />
                    Published
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Rating
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            updateTestimonial(testimonial.id, (current) => ({
                              ...current,
                              rating: index + 1,
                            }))
                          }
                          className="text-gold transition-transform hover:scale-110"
                          aria-label={`Set rating to ${index + 1}`}
                        >
                          <Star
                            size={16}
                            className={index < testimonial.rating ? "fill-gold text-gold" : "text-border"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeTestimonial(testimonial)}
                >
                  <Trash2 />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
