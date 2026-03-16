export type TestimonialRecord = {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  rating: number;
  sortOrder: number;
  published: boolean;
};

export type TestimonialRow = {
  id: string;
  name: string | null;
  role: string | null;
  quote: string | null;
  initials: string | null;
  rating: number | null;
  sort_order: number | null;
  published: boolean | null;
};

export const testimonialsSelect = `
  id,
  name,
  role,
  quote,
  initials,
  rating,
  sort_order,
  published
`;

export function deriveInitials(name: string) {
  const initials = name
    .split(" ")
    .map((part) => part.trim()[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials || "PH";
}

export function normalizeTestimonial(row: TestimonialRow): TestimonialRecord {
  const name = row.name?.trim() ?? "";

  return {
    id: row.id,
    name,
    role: row.role?.trim() ?? "",
    quote: row.quote?.trim() ?? "",
    initials: row.initials?.trim() || deriveInitials(name),
    rating: Math.min(5, Math.max(1, row.rating ?? 5)),
    sortOrder: row.sort_order ?? 100,
    published: row.published ?? true,
  };
}

export const fallbackTestimonials: TestimonialRecord[] = [
  {
    id: "fallback-testimonial-sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Homeowner, Cobble Hill",
    quote:
      "Pencil And Hammer brought structure to every decision. The house feels warm and finished, but the process was just as impressive as the final result.",
    initials: "SM",
    rating: 5,
    sortOrder: 10,
    published: true,
  },
  {
    id: "fallback-testimonial-james-chen",
    name: "James Chen",
    role: "Operations Director, Meridian Stays",
    quote:
      "They understood the guest experience and the site realities at the same time. That combination saved us time and protected the concept.",
    initials: "JC",
    rating: 5,
    sortOrder: 20,
    published: true,
  },
  {
    id: "fallback-testimonial-olivia-park",
    name: "Olivia Park",
    role: "Development Lead, Atlas Properties",
    quote:
      "The team is disciplined, responsive, and commercially aware. They delivered a stronger product because they think beyond mood boards.",
    initials: "OP",
    rating: 5,
    sortOrder: 30,
    published: true,
  },
];
