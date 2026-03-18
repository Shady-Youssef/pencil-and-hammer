alter table public.site_settings
  add column if not exists logo_dark_url text not null default '',
  add column if not exists logo_dark_storage_path text,
  add column if not exists home_story_image_dark_url text not null default '',
  add column if not exists home_story_image_dark_storage_path text;

update public.site_settings
set
  logo_dark_url = coalesce(nullif(trim(logo_dark_url), ''), ''),
  home_story_image_dark_url = coalesce(nullif(trim(home_story_image_dark_url), ''), '')
where id = 1;
