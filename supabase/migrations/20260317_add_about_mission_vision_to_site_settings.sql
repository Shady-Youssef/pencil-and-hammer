alter table public.site_settings
  add column if not exists about_mission_vision_eyebrow text not null default 'Mission & Vision',
  add column if not exists about_mission_vision_title text not null default 'Design intent should survive the realities of execution.',
  add column if not exists about_mission_vision_body text not null default 'Pencil And Hammer is built around a simple belief: strong interiors come from alignment, not handoff friction. We connect concept, technical coordination, procurement thinking, and delivery support so each decision strengthens the final space instead of compromising it.',
  add column if not exists about_mission_title text not null default 'Our Mission',
  add column if not exists about_mission_body text not null default 'To lead every project with one disciplined process that keeps strategy, detailing, and site execution working together from the first brief to the final handover.',
  add column if not exists about_vision_title text not null default 'Our Vision',
  add column if not exists about_vision_body text not null default 'To be the studio clients trust for interiors that feel calm, precise, and enduring because they are resolved with as much rigor in delivery as they are in design.';
