alter table public.site_settings
  add column if not exists about_hero_title text not null default 'About Us',
  add column if not exists about_hero_subtitle text not null default 'The story behind the spaces',
  add column if not exists about_hero_image_url text not null default '',
  add column if not exists about_hero_image_storage_path text,
  add column if not exists about_story_title text not null default 'Our Story',
  add column if not exists about_story_body_primary text not null default 'Founded in 2010, MBM Designs has grown from a boutique studio into one of New York''s most sought-after interior design firms. We believe that exceptional design is born from the intersection of artistry, innovation, and deep understanding of how people live.',
  add column if not exists about_story_body_secondary text not null default 'Every project we undertake is a collaborative journey. We listen, we dream, and we create spaces that are not only visually stunning but deeply personal - environments that enhance your daily life and stand the test of time.',
  add column if not exists about_portrait_url text not null default '',
  add column if not exists about_portrait_storage_path text,
  add column if not exists about_portrait_alt text not null default 'MBM Designs portrait',
  add column if not exists about_stats jsonb not null default '[
    {"id":"projects-completed","icon":"award","value":"150+","label":"Projects Completed"},
    {"id":"team-members","icon":"users","value":"12","label":"Team Members"},
    {"id":"years-experience","icon":"clock","value":"15","label":"Years Experience"},
    {"id":"countries-served","icon":"globe","value":"8","label":"Countries Served"}
  ]'::jsonb,
  add column if not exists about_philosophy_title text not null default 'Our Philosophy',
  add column if not exists about_philosophy_quote text not null default '"Great design is not about following trends - it''s about creating timeless spaces that resonate with the soul of those who inhabit them."',
  add column if not exists about_philosophy_attribution text not null default 'Maria Bello, Founder';
