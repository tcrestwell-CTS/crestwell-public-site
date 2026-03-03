-- ============================================================
-- Migration: Public Site Support
-- ============================================================

-- 1. trip_inquiries — stores contact form submissions from public site
CREATE TABLE IF NOT EXISTS public.trip_inquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT,
  group_size  TEXT,
  trip_name   TEXT,
  trip_id     UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  source      TEXT DEFAULT 'public_website',
  status      TEXT DEFAULT 'new', -- new | contacted | converted | closed
  agent_notes TEXT,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX idx_trip_inquiries_trip_id ON public.trip_inquiries(trip_id);
CREATE INDEX idx_trip_inquiries_status  ON public.trip_inquiries(status);
CREATE INDEX idx_trip_inquiries_created ON public.trip_inquiries(created_at DESC);

-- RLS: agents can see all inquiries
ALTER TABLE public.trip_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can view all inquiries"
  ON public.trip_inquiries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'agent'
    )
  );

CREATE POLICY "Agents can update inquiries"
  ON public.trip_inquiries FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'agent'
    )
  );

-- Allow public (anon) inserts via service role key from Next.js API route
-- The API route uses service_role key, so no RLS needed for INSERT

-- ============================================================
-- 2. Add published flag to trips (if not already present)
-- The existing published_at column serves this purpose.
-- To publish a trip from the agent portal, set:
--   published_at = now()
-- To unpublish:
--   published_at = null
-- ============================================================

-- Optional: add a helper boolean view for convenience
CREATE OR REPLACE VIEW public.published_trips AS
  SELECT *
  FROM public.trips
  WHERE published_at IS NOT NULL
  AND parent_trip_id IS NULL;

-- ============================================================
-- 3. RLS for public read access to published trips
-- Allow anonymous users to read published trips on the public site
-- ============================================================
CREATE POLICY "Public can view published trips"
  ON public.trips FOR SELECT
  USING (published_at IS NOT NULL);
