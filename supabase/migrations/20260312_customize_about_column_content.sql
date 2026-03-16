alter table public.site_settings
  add column if not exists about_story_paragraphs jsonb not null default '[
    {
      "id": "about-story-1",
      "body": "Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow."
    },
    {
      "id": "about-story-2",
      "body": "Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated."
    }
  ]'::jsonb;

alter table public.site_settings
  alter column about_stats set default '[
    {"id":"projects-completed","icon":"award","title":"84","description":"Projects Delivered"},
    {"id":"team-members","icon":"users","title":"11","description":"Design + Site Specialists"},
    {"id":"years-experience","icon":"clock","title":"9","description":"Cities Across MENA"},
    {"id":"countries-served","icon":"globe","title":"96%","description":"Repeat And Referral Work"}
  ]'::jsonb;

update public.site_settings
set
  about_story_paragraphs = case
    when jsonb_typeof(about_story_paragraphs) = 'array' and jsonb_array_length(about_story_paragraphs) > 0 then about_story_paragraphs
    else coalesce(
      (
        select jsonb_agg(item.value)
        from (
          values
            (
              case
                when coalesce(nullif(trim(about_story_body_primary), ''), '') <> '' then
                  jsonb_build_object('id', 'about-story-1', 'body', trim(about_story_body_primary))
                else null
              end
            ),
            (
              case
                when coalesce(nullif(trim(about_story_body_secondary), ''), '') <> '' then
                  jsonb_build_object('id', 'about-story-2', 'body', trim(about_story_body_secondary))
                else null
              end
            )
        ) as item(value)
        where item.value is not null
      ),
      '[]'::jsonb
    )
  end,
  about_stats = case
    when jsonb_typeof(about_stats) = 'array' then (
      select jsonb_agg(
        jsonb_strip_nulls(
          jsonb_build_object(
            'id', coalesce(nullif(entry->>'id', ''), 'about-stat-' || item.ordinality),
            'icon', coalesce(nullif(entry->>'icon', ''), 'award'),
            'title', coalesce(nullif(entry->>'title', ''), nullif(entry->>'value', ''), ''),
            'description', coalesce(nullif(entry->>'description', ''), nullif(entry->>'label', ''), '')
          )
        )
      )
      from jsonb_array_elements(about_stats) with ordinality as item(entry, ordinality)
    )
    else about_stats
  end;
