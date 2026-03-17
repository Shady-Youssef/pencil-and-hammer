alter table public.site_settings
  add column if not exists home_story_eyebrow text not null default 'Our Story',
  add column if not exists home_story_title text not null default 'A studio shaped around design clarity, site rigor, and calm execution.',
  add column if not exists home_story_paragraphs jsonb not null default '[
    {
      "id": "home-story-1",
      "body": "Pencil And Hammer was built for clients who want one team thinking clearly from concept through delivery. We connect atmosphere, planning, technical coordination, and procurement into one disciplined process."
    },
    {
      "id": "home-story-2",
      "body": "That structure creates interiors that feel calm and resolved because the design ambition and the practical site decisions are developed together, not patched in later."
    }
  ]'::jsonb,
  add column if not exists home_story_image_url text not null default '',
  add column if not exists home_story_image_storage_path text,
  add column if not exists home_story_image_alt text not null default 'Pencil And Hammer studio story image',
  add column if not exists home_story_metrics jsonb not null default '[
    {"id":"home-story-metric-1","value":"84","label":"Projects Delivered"},
    {"id":"home-story-metric-2","value":"11","label":"Design + Site Specialists"},
    {"id":"home-story-metric-3","value":"96%","label":"Repeat And Referral Work"}
  ]'::jsonb,
  add column if not exists home_story_primary_cta_label text not null default 'Explore The Studio',
  add column if not exists home_story_primary_cta_href text not null default '/about',
  add column if not exists home_story_secondary_cta_label text not null default 'Start A Conversation',
  add column if not exists home_story_secondary_cta_href text not null default '/contact';

update public.site_settings
set
  home_story_eyebrow = coalesce(nullif(trim(home_story_eyebrow), ''), 'Our Story'),
  home_story_title = coalesce(nullif(trim(home_story_title), ''), 'A studio shaped around design clarity, site rigor, and calm execution.'),
  home_story_paragraphs = case
    when jsonb_typeof(home_story_paragraphs) = 'array' then home_story_paragraphs
    else '[
      {
        "id": "home-story-1",
        "body": "Pencil And Hammer was built for clients who want one team thinking clearly from concept through delivery. We connect atmosphere, planning, technical coordination, and procurement into one disciplined process."
      },
      {
        "id": "home-story-2",
        "body": "That structure creates interiors that feel calm and resolved because the design ambition and the practical site decisions are developed together, not patched in later."
      }
    ]'::jsonb
  end,
  home_story_image_url = coalesce(home_story_image_url, ''),
  home_story_image_alt = coalesce(nullif(trim(home_story_image_alt), ''), 'Pencil And Hammer studio story image'),
  home_story_metrics = case
    when jsonb_typeof(home_story_metrics) = 'array' then home_story_metrics
    else '[
      {"id":"home-story-metric-1","value":"84","label":"Projects Delivered"},
      {"id":"home-story-metric-2","value":"11","label":"Design + Site Specialists"},
      {"id":"home-story-metric-3","value":"96%","label":"Repeat And Referral Work"}
    ]'::jsonb
  end,
  home_story_primary_cta_label = coalesce(nullif(trim(home_story_primary_cta_label), ''), 'Explore The Studio'),
  home_story_primary_cta_href = coalesce(nullif(trim(home_story_primary_cta_href), ''), '/about'),
  home_story_secondary_cta_label = coalesce(nullif(trim(home_story_secondary_cta_label), ''), 'Start A Conversation'),
  home_story_secondary_cta_href = coalesce(nullif(trim(home_story_secondary_cta_href), ''), '/contact')
where id = 1;
