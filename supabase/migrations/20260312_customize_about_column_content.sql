alter table public.site_settings
  add column if not exists about_story_paragraphs jsonb not null default '[
    {
      "id": "about-story-1",
      "body": "Founded in 2010, MBM Designs has grown from a boutique studio into one of New York''s most sought-after interior design firms. We believe that exceptional design is born from the intersection of artistry, innovation, and deep understanding of how people live."
    },
    {
      "id": "about-story-2",
      "body": "Every project we undertake is a collaborative journey. We listen, we dream, and we create spaces that are not only visually stunning but deeply personal - environments that enhance your daily life and stand the test of time."
    }
  ]'::jsonb;

alter table public.site_settings
  alter column about_stats set default '[
    {"id":"projects-completed","icon":"award","title":"150+","description":"Projects Completed"},
    {"id":"team-members","icon":"users","title":"12","description":"Team Members"},
    {"id":"years-experience","icon":"clock","title":"15","description":"Years Experience"},
    {"id":"countries-served","icon":"globe","title":"8","description":"Countries Served"}
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
