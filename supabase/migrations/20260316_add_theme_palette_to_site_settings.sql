alter table public.site_settings
  add column if not exists light_background_hex text not null default '#f5f5f5',
  add column if not exists light_foreground_hex text not null default '#141414',
  add column if not exists light_surface_hex text not null default '#ffffff',
  add column if not exists light_muted_hex text not null default '#ebebeb',
  add column if not exists light_border_hex text not null default '#d9d9d9',
  add column if not exists light_accent_hex text not null default '#2f2f2f',
  add column if not exists dark_background_hex text not null default '#090909',
  add column if not exists dark_foreground_hex text not null default '#f3f3f3',
  add column if not exists dark_surface_hex text not null default '#171717',
  add column if not exists dark_muted_hex text not null default '#232323',
  add column if not exists dark_border_hex text not null default '#2f2f2f',
  add column if not exists dark_accent_hex text not null default '#d7d7d7';
