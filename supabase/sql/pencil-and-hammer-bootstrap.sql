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
  site_name text not null default 'Pencil And Hammer',
  site_title text not null default 'Pencil And Hammer | Design-Build Studio',
  site_description text not null default 'Pencil And Hammer is a design-build company delivering residential, hospitality, retail, and workplace interiors with strategic planning and a clean material point of view.',
  site_url text not null default 'https://pencil-and-hammer.vercel.app',
  contact_email text not null default 'hello@pencilandhammer.com',
  contact_phone text not null default '+1 (555) 234-5678',
  address_line_1 text not null default '123 Design Avenue',
  address_line_2 text not null default '',
  address_city text not null default 'New York',
  address_region text not null default 'NY',
  address_postal_code text not null default '10001',
  address_country text not null default 'US',
  instagram_url text not null default 'https://www.instagram.com/pencil.hammer.qa/',
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
  og_title text not null default 'Pencil And Hammer | Strategy, Design, Delivery',
  og_description text not null default 'A design-build company translating sharp concepts into built interiors for homes, hospitality, retail, and workplaces.',
  og_kicker text not null default 'Design-Build Company',
  og_tagline text not null default 'Strategy. Design. Delivery.',
  logo_url text not null default '/pencil-and-hammer-mark.svg',
  logo_storage_path text,
  favicon_url text not null default '/pencil-and-hammer-mark.svg',
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
  52428800,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/svg+xml',
    'image/x-icon',
    'image/vnd.microsoft.icon',
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime'
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

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null check (category in ('Residential', 'Commercial', 'Hospitality')),
  location text not null default '',
  client_name text not null default '',
  summary text not null default '',
  description text not null default '',
  completion_year integer not null default extract(year from now()),
  status text not null default 'Completed' check (status in ('Planning', 'In Progress', 'Completed')),
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 100,
  cover_image_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  storage_path text,
  alt_text text not null default '',
  caption text not null default '',
  sort_order integer not null default 100,
  is_cover boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists projects_published_sort_idx
  on public.projects (published, featured desc, sort_order asc, created_at desc);

create index if not exists project_images_project_sort_idx
  on public.project_images (project_id, is_cover desc, sort_order asc, created_at asc);

drop trigger if exists handle_projects_updated_at on public.projects;
create trigger handle_projects_updated_at
before update on public.projects
for each row
execute function public.handle_updated_at();

drop trigger if exists handle_project_images_updated_at on public.project_images;
create trigger handle_project_images_updated_at
before update on public.project_images
for each row
execute function public.handle_updated_at();

alter table public.projects enable row level security;
alter table public.project_images enable row level security;

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects
for select
using (published = true);

drop policy if exists "Authenticated users can manage projects" on public.projects;
create policy "Authenticated users can manage projects"
on public.projects
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Public can read published project images" on public.project_images;
create policy "Public can read published project images"
on public.project_images
for select
using (
  exists (
    select 1
    from public.projects
    where public.projects.id = project_images.project_id
      and public.projects.published = true
  )
);

drop policy if exists "Authenticated users can manage project images" on public.project_images;
create policy "Authenticated users can manage project images"
on public.project_images
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-media',
  'project-media',
  true,
  20971520,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

drop policy if exists "Public can read project media" on storage.objects;
create policy "Public can read project media"
on storage.objects
for select
using (bucket_id = 'project-media');

drop policy if exists "Authenticated users can upload project media" on storage.objects;
create policy "Authenticated users can upload project media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-media');

drop policy if exists "Authenticated users can update project media" on storage.objects;
create policy "Authenticated users can update project media"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-media')
with check (bucket_id = 'project-media');

drop policy if exists "Authenticated users can delete project media" on storage.objects;
create policy "Authenticated users can delete project media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-media');

alter table public.projects
add column if not exists narrative_eyebrow text not null default 'Project Narrative',
add column if not exists narrative_title text not null default 'Designed with atmosphere,',
add column if not exists narrative_highlight text not null default 'clarity, and detail.',
add column if not exists detail_status_label text not null default 'Project Status',
add column if not exists detail_status_title text not null default '',
add column if not exists detail_status_description text not null default 'This page is structured to support full galleries, descriptive storytelling, and premium project presentation for both editorial browsing and client review.';

update public.projects
set detail_status_title = status
where coalesce(nullif(trim(detail_status_title), ''), '') = '';

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

alter table public.site_settings
  add column if not exists about_hero_title text not null default 'Built from strategy, not styling.',
  add column if not exists about_hero_subtitle text not null default 'One team for concept design, coordination, and site delivery.',
  add column if not exists about_hero_image_url text not null default '',
  add column if not exists about_hero_image_storage_path text,
  add column if not exists about_story_title text not null default 'How Pencil And Hammer Works',
  add column if not exists about_story_body_primary text not null default 'Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow.',
  add column if not exists about_story_body_secondary text not null default 'Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated.',
  add column if not exists about_portrait_url text not null default '',
  add column if not exists about_portrait_storage_path text,
  add column if not exists about_portrait_alt text not null default 'Pencil And Hammer team portrait',
  add column if not exists about_stats jsonb not null default '[
    {"id":"projects-completed","icon":"award","value":"84","label":"Projects Delivered"},
    {"id":"team-members","icon":"users","value":"11","label":"Design + Site Specialists"},
    {"id":"years-experience","icon":"clock","value":"9","label":"Cities Across MENA"},
    {"id":"countries-served","icon":"globe","value":"96%","label":"Repeat And Referral Work"}
  ]'::jsonb,
  add column if not exists about_philosophy_title text not null default 'What We Believe',
  add column if not exists about_philosophy_quote text not null default '"Good spaces are drawn with restraint, coordinated with rigor, and delivered with enough care to feel inevitable once they exist."',
  add column if not exists about_philosophy_attribution text not null default 'Pencil And Hammer Studio';

alter table public.site_settings
  add column if not exists about_story_paragraphs jsonb not null default '[
    {
      "id": "about-story-1",
      "body": "Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow."
    },
    {
      "id": "about-story-2",
      "body": "Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated."
    }
  ]'::jsonb;

alter table public.site_settings
  alter column about_stats set default '[
    {"id":"projects-completed","icon":"award","title":"84","description":"Projects Delivered"},
    {"id":"team-members","icon":"users","title":"11","description":"Design + Site Specialists"},
    {"id":"years-experience","icon":"clock","title":"9","description":"Cities Across MENA"},
    {"id":"countries-served","icon":"globe","title":"96%","description":"Repeat And Referral Work"}
  ]'::jsonb;

update public.site_settings
set
  about_story_paragraphs = case
    when jsonb_typeof(about_story_paragraphs) = 'array' and jsonb_array_length(about_story_paragraphs) > 0 then about_story_paragraphs
    else coalesce(
      (
        select jsonb_agg(item.value)
        from (
          values
            (
              case
                when coalesce(nullif(trim(about_story_body_primary), ''), '') <> '' then
                  jsonb_build_object('id', 'about-story-1', 'body', trim(about_story_body_primary))
                else null
              end
            ),
            (
              case
                when coalesce(nullif(trim(about_story_body_secondary), ''), '') <> '' then
                  jsonb_build_object('id', 'about-story-2', 'body', trim(about_story_body_secondary))
                else null
              end
            )
        ) as item(value)
        where item.value is not null
      ),
      '[]'::jsonb
    )
  end,
  about_stats = case
    when jsonb_typeof(about_stats) = 'array' then (
      select jsonb_agg(
        jsonb_strip_nulls(
          jsonb_build_object(
            'id', coalesce(nullif(entry->>'id', ''), 'about-stat-' || item.ordinality),
            'icon', coalesce(nullif(entry->>'icon', ''), 'award'),
            'title', coalesce(nullif(entry->>'title', ''), nullif(entry->>'value', ''), ''),
            'description', coalesce(nullif(entry->>'description', ''), nullif(entry->>'label', ''), '')
          )
        )
      )
      from jsonb_array_elements(about_stats) with ordinality as item(entry, ordinality)
    )
    else about_stats
  end;

alter table public.site_settings
  alter column site_name set default 'Pencil And Hammer',
  alter column site_title set default 'Pencil And Hammer | Design-Build Studio',
  alter column site_description set default 'Pencil And Hammer is a design-build company delivering residential, hospitality, retail, and workplace interiors with strategic planning and a clean material point of view.',
  alter column site_url set default 'https://pencil-and-hammer.vercel.app',
  alter column contact_email set default 'hello@pencilandhammer.com',
  alter column og_title set default 'Pencil And Hammer | Strategy, Design, Delivery',
  alter column og_description set default 'A design-build company translating sharp concepts into built interiors for homes, hospitality, retail, and workplaces.',
  alter column og_kicker set default 'Design-Build Company',
  alter column og_tagline set default 'Strategy. Design. Delivery.',
  alter column logo_url set default '/pencil-and-hammer-mark.svg',
  alter column favicon_url set default '/pencil-and-hammer-mark.svg',
  alter column about_hero_title set default 'Built from strategy, not styling.',
  alter column about_hero_subtitle set default 'One team for concept design, coordination, and site delivery.',
  alter column about_story_title set default 'How Pencil And Hammer Works',
  alter column about_story_body_primary set default 'Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow.',
  alter column about_story_body_secondary set default 'Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated.',
  alter column about_portrait_alt set default 'Pencil And Hammer team portrait',
  alter column about_philosophy_title set default 'What We Believe',
  alter column about_philosophy_quote set default '"Good spaces are drawn with restraint, coordinated with rigor, and delivered with enough care to feel inevitable once they exist."',
  alter column about_philosophy_attribution set default 'Pencil And Hammer Studio';

update public.site_settings
set
  site_name = 'Pencil And Hammer',
  site_title = 'Pencil And Hammer | Design-Build Studio',
  site_description = 'Pencil And Hammer is a design-build company delivering residential, hospitality, retail, and workplace interiors with strategic planning and a clean material point of view.',
  site_url = 'https://pencil-and-hammer.vercel.app',
  contact_email = 'hello@pencilandhammer.com',
  og_title = 'Pencil And Hammer | Strategy, Design, Delivery',
  og_description = 'A design-build company translating sharp concepts into built interiors for homes, hospitality, retail, and workplaces.',
  og_kicker = 'Design-Build Company',
  og_tagline = 'Strategy. Design. Delivery.',
  logo_url = '/pencil-and-hammer-mark.svg',
  favicon_url = '/pencil-and-hammer-mark.svg',
  about_hero_title = 'Built from strategy, not styling.',
  about_hero_subtitle = 'One team for concept design, coordination, and site delivery.',
  about_story_title = 'How Pencil And Hammer Works',
  about_story_body_primary = 'Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow.',
  about_story_body_secondary = 'Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated.',
  about_portrait_alt = 'Pencil And Hammer team portrait',
  about_story_paragraphs = '[
    {
      "id": "about-story-1",
      "body": "Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow."
    },
    {
      "id": "about-story-2",
      "body": "Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated."
    }
  ]'::jsonb,
  about_stats = '[
    {"id":"projects-completed","icon":"award","title":"84","description":"Projects Delivered"},
    {"id":"team-members","icon":"users","title":"11","description":"Design + Site Specialists"},
    {"id":"years-experience","icon":"clock","title":"9","description":"Cities Across MENA"},
    {"id":"countries-served","icon":"globe","title":"96%","description":"Repeat And Referral Work"}
  ]'::jsonb,
  about_philosophy_title = 'What We Believe',
  about_philosophy_quote = '"Good spaces are drawn with restraint, coordinated with rigor, and delivered with enough care to feel inevitable once they exist."',
  about_philosophy_attribution = 'Pencil And Hammer Studio'
where id = 1;
