-- theeWaweru portfolio: database restore
-- Source: db_cluster-28-01-2026 backup (newer of the two exports)
-- How to use: open your new Supabase project > SQL Editor > New query > paste this whole file > Run.
--
-- NOTE ON SECURITY: the GRANTs below intentionally reproduce your previous
-- wide-open setup so the site works immediately (anon key can read/write).
-- This is the hole we agreed to fix right after restore (RLS + real auth).

-- =========================================================
-- 1. TABLES
-- =========================================================

create table if not exists public.blog_posts (
    id               text primary key,
    title            text not null,
    excerpt          text not null,
    content          text not null,
    category         text,
    tags             text[],
    cover_image_url  text,
    cover_image_path text,
    status           text default 'draft',
    featured         boolean default false,
    published_date   timestamptz,
    created_at       timestamptz default now(),
    updated_at       timestamptz default now()
);

create table if not exists public.projects (
    id               text primary key,
    title            text not null,
    description      text not null,
    full_description text,
    category         text,
    client           text,
    timeline         text,
    role             text,
    tags             text[],
    cover_image_url  text,
    cover_image_path text,
    gallery          text[],
    status           text default 'draft',
    featured         boolean default false,
    created_at       timestamptz default now(),
    updated_at       timestamptz default now()
);

create table if not exists public.messages (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    email       text not null,
    subject     text,
    message     text not null,
    read        boolean default false,
    created_at  timestamptz default now()
);

create table if not exists public.newsletter_subscribers (
    id             uuid primary key default gen_random_uuid(),
    email          text not null unique,
    status         text default 'active',
    subscribed_at  timestamptz default now()
);

-- =========================================================
-- 2. DATA
-- =========================================================

-- Projects (3 real projects)
insert into public.projects
    (id, title, description, full_description, category, client, timeline, role, tags, cover_image_url, cover_image_path, gallery, status, featured, created_at, updated_at)
values
(
    'vault22', 'Vault22',
    'Crypto wallet application with simplified user interface for secure digital asset management.',
    'Vault22 required a user-friendly crypto wallet that simplifies complex blockchain operations. I designed an intuitive interface that makes cryptocurrency management accessible to newcomers while maintaining security for experienced users.',
    'UI/UX Design', 'Vault22 Technologies', 'March - June 2023', 'UX/UI Designer',
    array['Cryptocurrency','Mobile App','Security','Web3'],
    null, null,            -- cover image was on deleted Supabase storage; re-link during redesign
    null, 'published', true,
    '2025-05-04 09:49:26.181297+00', '2025-05-04 21:14:16.230686+00'
),
(
    'chupachap', 'Chupachap',
    'E-commerce platform for a local marketplace with integrated payment processing.',
    'Chupachap needed an e-commerce platform to connect local artisans with customers. I designed and developed a marketplace solution that showcases products effectively and streamlines the purchase process.',
    'Web Development', 'Chupachap Marketplace', 'May - August 2023', 'UI Designer & Front-end Developer',
    array['E-commerce','Web App','Payments'],
    null, null, null, 'published', true,
    '2025-05-04 09:49:26.181297+00', '2025-05-04 10:52:47.274316+00'
),
(
    'furaha-financial', 'Furaha Financial',
    'Complete redesign of a digital banking platform focused on improving user experience and accessibility.',
    'Furaha Financial needed a complete overhaul of their digital banking platform to improve user experience, increase customer satisfaction, and reduce drop-off rates. I led the UI/UX redesign process from research to implementation.',
    'UI/UX Design', 'Furaha Financial Services', 'January - April 2023', 'Lead UI/UX Designer',
    array['Fintech','Web App','Mobile App','User Research'],
    null, null, null, 'published', true,
    '2025-05-04 09:49:26.181297+00', '2025-05-04 11:17:53.778044+00'
)
on conflict (id) do nothing;

-- Messages (contact form history)
insert into public.messages (id, name, email, subject, message, read, created_at)
values
('d0e7fc7f-1ae9-4f2b-bf04-73c6ae6ef8ed', 'David',     'davidngari47@gmail.com',   'Website Restoration', 'Jambo dave 1', false, '2025-05-04 19:37:06.816+00'),
('fe28c664-19c4-4fba-93a4-93f42ad5a480', 'David',     'davidngari47@gmail.com',   'Website Restoration', 'Send',         false, '2025-05-04 23:28:47.262+00'),
('a52dc438-0c7d-4d1e-944e-f3ebfe591d9f', 'David',     'davidngari47@gmail.com',   'Website Restoration', 'Test 2',       false, '2025-05-04 23:29:20.533+00'),
('3840b2b0-3c4b-4c00-ad04-0da191faf909', 'Imma',      'davidngari47@gmail.com',   'Website Restoration', 'Test 3',       false, '2025-05-04 23:34:19.807+00'),
('2bc1a403-8049-4ef1-925a-1d4de70949c6', 'David Ngari','developerat96@gmail.com', 'Jambo',               'Test',         false, '2025-07-13 17:43:42.156+00'),
('f6ebb28f-aca5-4adc-a587-6b6c2296a42f', 'David Ngari','davidngari47@gmail.com',  'Website Restoration', 'More?!',       false, '2025-10-06 06:13:41.61+00')
on conflict (id) do nothing;

-- Blog: the only saved row was a placeholder "Test" post, omitted on purpose.
-- If you ever want it back, here it is:
-- insert into public.blog_posts (id, title, excerpt, content, category, tags, status, featured, created_at, updated_at)
-- values ('test','Test','Short excerpt','The blog','UX Research',
--   array['UX design','Paramount pictures','Design in Nairobi','Developer in Nairobi'],
--   'published', false, '2025-05-04 21:42:39.438+00', '2025-05-04 21:42:39.438+00');

-- Newsletter: no subscribers existed.

-- =========================================================
-- 3. ACCESS (temporary, permissive - to be tightened with RLS later)
-- =========================================================
grant all on public.blog_posts, public.projects, public.messages, public.newsletter_subscribers
    to anon, authenticated, service_role;
