-- ============================================================
-- Crestwell Travel Services — Supabase Schema
-- Run this in your Supabase SQL editor to set up all tables
-- ============================================================

-- Quote Requests
create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  trip_type text not null,
  destination text,
  departure_date date,
  travelers_adults integer not null default 2,
  travelers_children integer not null default 0,
  budget text,
  flexibility text default 'flexible',
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'booked', 'closed'))
);

-- Contact Messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'replied'))
);

-- Newsletter Subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text not null unique,
  source text default 'website',
  active boolean default true
);

-- ── Row Level Security ──────────────────────────────────────

-- Quote Requests: allow anonymous inserts, restrict reads to auth users
alter table quote_requests enable row level security;

create policy "Allow anonymous insert" on quote_requests
  for insert to anon with check (true);

create policy "Auth users can view all" on quote_requests
  for select to authenticated using (true);

create policy "Auth users can update" on quote_requests
  for update to authenticated using (true);

-- Contact Messages: same pattern
alter table contact_messages enable row level security;

create policy "Allow anonymous insert" on contact_messages
  for insert to anon with check (true);

create policy "Auth users can view all" on contact_messages
  for select to authenticated using (true);

create policy "Auth users can update" on contact_messages
  for update to authenticated using (true);

-- Newsletter: allow anonymous inserts, prevent duplicates handled by unique constraint
alter table newsletter_subscribers enable row level security;

create policy "Allow anonymous insert" on newsletter_subscribers
  for insert to anon with check (true);

create policy "Auth users can view all" on newsletter_subscribers
  for select to authenticated using (true);

-- ── Indexes ─────────────────────────────────────────────────

create index if not exists idx_quote_requests_email on quote_requests(email);
create index if not exists idx_quote_requests_status on quote_requests(status);
create index if not exists idx_quote_requests_created on quote_requests(created_at desc);

create index if not exists idx_contact_messages_status on contact_messages(status);
create index if not exists idx_contact_messages_created on contact_messages(created_at desc);

create index if not exists idx_newsletter_email on newsletter_subscribers(email);
