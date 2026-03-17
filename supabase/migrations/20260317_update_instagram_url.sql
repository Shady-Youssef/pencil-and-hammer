alter table public.site_settings
  alter column instagram_url set default 'https://www.instagram.com/pencil.hammer.qa/';

update public.site_settings
set instagram_url = 'https://www.instagram.com/pencil.hammer.qa/'
where id = 1;
