import { fallbackTestimonials, normalizeTestimonial, testimonialsSelect, type TestimonialRecord, type TestimonialRow } from "@/lib/testimonials/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminTestimonialsResult = {
  testimonials: TestimonialRecord[];
  error: string | null;
};

function sortTestimonials(testimonials: TestimonialRecord[]) {
  return [...testimonials].sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }

    return left.name.localeCompare(right.name);
  });
}

export async function getPublishedTestimonials() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select(testimonialsSelect)
    .eq("published", true);

  if (error || !data?.length) {
    return sortTestimonials(fallbackTestimonials.filter((item) => item.published));
  }

  return sortTestimonials((data as TestimonialRow[]).map(normalizeTestimonial));
}

export async function getAdminTestimonials(): Promise<AdminTestimonialsResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select(testimonialsSelect);

  if (error) {
    return {
      testimonials: [],
      error: error.message,
    };
  }

  return {
    testimonials: sortTestimonials((data as TestimonialRow[]).map(normalizeTestimonial)),
    error: null,
  };
}
