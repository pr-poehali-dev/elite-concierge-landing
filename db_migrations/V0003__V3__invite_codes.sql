CREATE TABLE t_p2841448_elite_concierge_land.invite_codes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  created_by INTEGER REFERENCES t_p2841448_elite_concierge_land.users(id),
  used_by INTEGER REFERENCES t_p2841448_elite_concierge_land.users(id),
  is_used BOOLEAN DEFAULT false,
  max_uses INTEGER DEFAULT 1,
  use_count INTEGER DEFAULT 0,
  type VARCHAR(20) DEFAULT 'member',
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);