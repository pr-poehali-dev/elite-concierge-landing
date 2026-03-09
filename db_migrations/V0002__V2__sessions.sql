CREATE TABLE t_p2841448_elite_concierge_land.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES t_p2841448_elite_concierge_land.users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT
);
CREATE INDEX idx_sessions_token ON t_p2841448_elite_concierge_land.sessions(token);
CREATE INDEX idx_sessions_user ON t_p2841448_elite_concierge_land.sessions(user_id);