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
