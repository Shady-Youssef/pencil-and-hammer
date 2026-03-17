alter table public.site_settings
  add column if not exists home_services_eyebrow text not null default 'What We Handle',
  add column if not exists home_services_title text not null default 'A clearer structure for concept, planning, lighting, and finish.',
  add column if not exists home_services_body text not null default 'Every project is developed as one connected interior system. Layout, materials, lighting, and furnishing are resolved together so the final result feels calm, coherent, and commercially sound.',
  add column if not exists home_services_highlights jsonb not null default '[
    {"id":"home-services-highlight-1","label":"Working Model","text":"Design decisions are handled in sequence, so planning, mood, detailing, and procurement reinforce one another."},
    {"id":"home-services-highlight-2","label":"Project Result","text":"The final interior feels more resolved because the practical logic is addressed early rather than patched in later."}
  ]'::jsonb,
  add column if not exists home_services jsonb not null default '[
    {"id":"home-service-1","icon":"paintbrush","title":"Interior Design","description":"Concept direction, material thinking, and spatial language shaped for real project conditions.","note":"From concept boards to coordinated design intent.","deliverables":["Concept narrative","Material direction","Visual language"]},
    {"id":"home-service-2","icon":"ruler","title":"Space Planning","description":"Layouts are resolved for movement, visibility, furniture logic, and everyday use.","note":"Flow, zoning, and operational clarity.","deliverables":["Room adjacencies","Furniture layouts","Circulation planning"]},
    {"id":"home-service-3","icon":"lightbulb","title":"Lighting Strategy","description":"Layered lighting schemes that define mood while supporting technical and functional needs.","note":"Ambient, accent, and task lighting in one system.","deliverables":["Fixture direction","Layered scenes","Mood and function"]},
    {"id":"home-service-4","icon":"sofa","title":"Furniture + Styling","description":"Curated selections, custom pieces, and finishing layers that complete the atmosphere.","note":"Procurement-minded recommendations with a cohesive final read.","deliverables":["Furniture curation","Custom pieces","Final styling"]}
  ]'::jsonb;
