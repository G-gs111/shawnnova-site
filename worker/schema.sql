CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  notification_status TEXT NOT NULL CHECK (
    notification_status IN ('pending', 'sent', 'failed')
  )
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at
ON leads(created_at DESC);
