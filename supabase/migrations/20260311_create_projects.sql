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
