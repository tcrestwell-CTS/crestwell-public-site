CREATE TABLE IF NOT EXISTS trip_nurture_log (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id      uuid        NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
  step         integer     NOT NULL,
  label        text        NOT NULL,
  scheduled_at timestamptz NOT NULL,
  sent_at      timestamptz,
  status       text        NOT NULL DEFAULT 'pending',
  resend_id    text,
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_nurture_pending ON trip_nurture_log(status, scheduled_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_nurture_lead ON trip_nurture_log(lead_id);
ALTER TABLE trip_nurture_log ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION notify_chris_booked()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.status = 'booked' AND (OLD.status IS DISTINCT FROM 'booked')) THEN
    PERFORM net.http_post(
      url     := 'https://zbtnulzvwreqzbmxulpv.supabase.co/functions/v1/chris',
      headers := jsonb_build_object('Content-Type','application/json','x-agent-secret', current_setting('app.cw_agent_secret', true)),
      body    := jsonb_build_object('lead_id', NEW.id),
      timeout_milliseconds := 5000
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_lead_booked ON quote_requests;
CREATE TRIGGER on_lead_booked
  AFTER UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION notify_chris_booked();

SELECT cron.schedule(
  'crestwell-chris-daily',
  '0 9 * * *',
  $$
  SELECT net.http_post(
    url     := 'https://zbtnulzvwreqzbmxulpv.supabase.co/functions/v1/chris',
    headers := '{"Content-Type":"application/json","x-agent-secret":"YOUR_SECRET"}'::jsonb,
    body    := '{"run_due":true}'::jsonb,
    timeout_milliseconds := 55000
  ) AS request_id;
  $$
);
