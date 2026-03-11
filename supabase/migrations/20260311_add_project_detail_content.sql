alter table public.projects
add column if not exists narrative_eyebrow text not null default 'Project Narrative',
add column if not exists narrative_title text not null default 'Designed with atmosphere,',
add column if not exists narrative_highlight text not null default 'clarity, and detail.',
add column if not exists detail_status_label text not null default 'Project Status',
add column if not exists detail_status_title text not null default '',
add column if not exists detail_status_description text not null default 'This page is structured to support full galleries, descriptive storytelling, and premium project presentation for both editorial browsing and client review.';

update public.projects
set detail_status_title = status
where coalesce(nullif(trim(detail_status_title), ''), '') = '';
