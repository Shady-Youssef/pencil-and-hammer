alter table public.site_settings
  add column if not exists home_hero_video_url text not null default '',
  add column if not exists home_hero_video_storage_path text;
