create extension if not exists pgcrypto;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  role text not null default '',
  quote text not null default '',
  initials text not null default '',
  rating integer not null default 5 check (rating between 1 and 5),
  sort_order integer not null default 100,
  published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists testimonials_published_sort_idx
  on public.testimonials (published, sort_order asc, created_at asc);

drop trigger if exists handle_testimonials_updated_at on public.testimonials;
create trigger handle_testimonials_updated_at
before update on public.testimonials
for each row
execute function public.handle_updated_at();

alter table public.testimonials enable row level security;

drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials"
on public.testimonials
for select
using (published = true);

drop policy if exists "Authenticated users can manage testimonials" on public.testimonials;
create policy "Authenticated users can manage testimonials"
on public.testimonials
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
