alter table public.site_settings
  alter column site_name set default 'Pencil And Hammer',
  alter column site_title set default 'Pencil And Hammer | Design-Build Studio',
  alter column site_description set default 'Pencil And Hammer is a design-build company delivering residential, hospitality, retail, and workplace interiors with strategic planning and a clean material point of view.',
  alter column site_url set default 'https://pencil-and-hammer.vercel.app',
  alter column contact_email set default 'hello@pencilandhammer.com',
  alter column og_title set default 'Pencil And Hammer | Strategy, Design, Delivery',
  alter column og_description set default 'A design-build company translating sharp concepts into built interiors for homes, hospitality, retail, and workplaces.',
  alter column og_kicker set default 'Design-Build Company',
  alter column og_tagline set default 'Strategy. Design. Delivery.',
  alter column logo_url set default '/pencil-and-hammer-mark.svg',
  alter column favicon_url set default '/pencil-and-hammer-mark.svg',
  alter column about_hero_title set default 'Built from strategy, not styling.',
  alter column about_hero_subtitle set default 'One team for concept design, coordination, and site delivery.',
  alter column about_story_title set default 'How Pencil And Hammer Works',
  alter column about_story_body_primary set default 'Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow.',
  alter column about_story_body_secondary set default 'Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated.',
  alter column about_portrait_alt set default 'Pencil And Hammer team portrait',
  alter column about_philosophy_title set default 'What We Believe',
  alter column about_philosophy_quote set default '"Good spaces are drawn with restraint, coordinated with rigor, and delivered with enough care to feel inevitable once they exist."',
  alter column about_philosophy_attribution set default 'Pencil And Hammer Studio';

update public.site_settings
set
  site_name = 'Pencil And Hammer',
  site_title = 'Pencil And Hammer | Design-Build Studio',
  site_description = 'Pencil And Hammer is a design-build company delivering residential, hospitality, retail, and workplace interiors with strategic planning and a clean material point of view.',
  site_url = 'https://pencil-and-hammer.vercel.app',
  contact_email = 'hello@pencilandhammer.com',
  og_title = 'Pencil And Hammer | Strategy, Design, Delivery',
  og_description = 'A design-build company translating sharp concepts into built interiors for homes, hospitality, retail, and workplaces.',
  og_kicker = 'Design-Build Company',
  og_tagline = 'Strategy. Design. Delivery.',
  logo_url = '/pencil-and-hammer-mark.svg',
  favicon_url = '/pencil-and-hammer-mark.svg',
  about_hero_title = 'Built from strategy, not styling.',
  about_hero_subtitle = 'One team for concept design, coordination, and site delivery.',
  about_story_title = 'How Pencil And Hammer Works',
  about_story_body_primary = 'Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow.',
  about_story_body_secondary = 'Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated.',
  about_portrait_alt = 'Pencil And Hammer team portrait',
  about_story_paragraphs = '[
    {
      "id": "about-story-1",
      "body": "Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow."
    },
    {
      "id": "about-story-2",
      "body": "Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated."
    }
  ]'::jsonb,
  about_stats = '[
    {"id":"projects-completed","icon":"award","title":"84","description":"Projects Delivered"},
    {"id":"team-members","icon":"users","title":"11","description":"Design + Site Specialists"},
    {"id":"years-experience","icon":"clock","title":"9","description":"Cities Across MENA"},
    {"id":"countries-served","icon":"globe","title":"96%","description":"Repeat And Referral Work"}
  ]'::jsonb,
  about_philosophy_title = 'What We Believe',
  about_philosophy_quote = '"Good spaces are drawn with restraint, coordinated with rigor, and delivered with enough care to feel inevitable once they exist."',
  about_philosophy_attribution = 'Pencil And Hammer Studio'
where id = 1;
