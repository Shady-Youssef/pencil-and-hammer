create extension if not exists pgcrypto;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  site_name text not null default 'MBM Designs',
  site_title text not null default 'MBM Designs | Luxury Interior Design Studio',
  site_description text not null default 'MBM Designs creates high-end residential, hospitality, and commercial interiors with a refined, editorial aesthetic.',
  site_url text not null default 'http://localhost:3000',
  contact_email text not null default 'hello@mbmdesigns.com',
  contact_phone text not null default '+1 (555) 234-5678',
  address_line_1 text not null default '123 Design Avenue',
  address_line_2 text not null default '',
  address_city text not null default 'New York',
  address_region text not null default 'NY',
  address_postal_code text not null default '10001',
  address_country text not null default 'US',
  instagram_url text not null default 'https://instagram.com',
  facebook_url text not null default 'https://facebook.com',
  linkedin_url text not null default 'https://linkedin.com',
  seo_keywords text[] not null default array[
    'luxury interior design',
    'interior design studio',
    'residential interior designer',
    'hospitality design',
    'commercial interiors',
    'New York interior design'
  ],
  og_title text not null default 'MBM Designs | Editorial Luxury Interiors',
  og_description text not null default 'High-end residential, hospitality, and commercial interior design with warmth, precision, and a refined editorial point of view.',
  og_kicker text not null default 'Interior Design Studio',
  og_tagline text not null default 'Luxury. Warmth. Precision.',
  logo_url text not null default '/MBM-logo.webp',
  logo_storage_path text,
  favicon_url text not null default '/icon.svg',
  favicon_storage_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists handle_site_settings_updated_at on public.site_settings;
create trigger handle_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.handle_updated_at();

insert into public.site_settings (id)
values (1)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
using (true);

drop policy if exists "Authenticated users can manage site settings" on public.site_settings;
create policy "Authenticated users can manage site settings"
on public.site_settings
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-assets',
  'site-assets',
  true,
  10485760,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/svg+xml',
    'image/x-icon',
    'image/vnd.microsoft.icon'
  ]
)
on conflict (id) do nothing;

drop policy if exists "Public can read site assets" on storage.objects;
create policy "Public can read site assets"
on storage.objects
for select
using (bucket_id = 'site-assets');

drop policy if exists "Authenticated users can upload site assets" on storage.objects;
create policy "Authenticated users can upload site assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets');

drop policy if exists "Authenticated users can update site assets" on storage.objects;
create policy "Authenticated users can update site assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

drop policy if exists "Authenticated users can delete site assets" on storage.objects;
create policy "Authenticated users can delete site assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets');
