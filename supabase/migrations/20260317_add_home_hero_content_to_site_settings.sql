alter table public.site_settings
  add column if not exists home_hero_eyebrow text not null default 'Interior Design Studio',
  add column if not exists home_hero_title_line_one text not null default 'Crafting Spaces',
  add column if not exists home_hero_title_line_two text not null default 'That Inspire',
  add column if not exists home_hero_body text not null default 'Pencil And Hammer shapes residential, hospitality, and workplace interiors with a disciplined design-build process that keeps concept, coordination, and delivery aligned from the first conversation.',
  add column if not exists home_hero_image_url text not null default '',
  add column if not exists home_hero_image_storage_path text,
  add column if not exists home_hero_image_alt text not null default 'Pencil And Hammer studio team at work',
  add column if not exists home_hero_primary_cta_label text not null default 'View Our Work',
  add column if not exists home_hero_primary_cta_href text not null default '/portfolio',
  add column if not exists home_hero_secondary_cta_label text not null default 'Get In Touch',
  add column if not exists home_hero_secondary_cta_href text not null default '/contact',
  add column if not exists home_hero_scroll_label text not null default 'Scroll';
