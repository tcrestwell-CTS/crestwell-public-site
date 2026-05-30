-- Payment IP log table
-- Run in CTS Supabase (zbtnulzvwreqzbmxulpv) SQL Editor

CREATE TABLE IF NOT EXISTS payment_ip_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  page            TEXT NOT NULL,
  ip_address      TEXT,
  user_agent      TEXT,
  referer         TEXT,
  country         TEXT,
  amount_cents    INTEGER,
  currency        TEXT DEFAULT 'usd',
  stripe_pm_id    TEXT,
  last_four       TEXT,
  client_id       UUID REFERENCES clients(id) ON DELETE SET NULL,
  booking_id      UUID REFERENCES bookings(id) ON DELETE SET NULL,
  rental_id       UUID REFERENCES car_rental_requests(id) ON DELETE SET NULL,
  outcome         TEXT CHECK (outcome IN ('attempted','succeeded','failed','blocked')),
  failure_reason  TEXT,
  flagged         BOOLEAN DEFAULT FALSE,
  flag_reason     TEXT
);

ALTER TABLE payment_ip_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "agent_read_ip_logs"    ON payment_ip_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "anon_insert_ip_logs"   ON payment_ip_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "service_insert_ip_logs" ON payment_ip_logs FOR INSERT TO service_role WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_ip_logs_ip      ON payment_ip_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_ip_logs_page    ON payment_ip_logs(page, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ip_logs_flagged ON payment_ip_logs(flagged) WHERE flagged = true;
