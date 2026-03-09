CREATE TABLE t_p2841448_elite_concierge_land.conversations (
  id SERIAL PRIMARY KEY,
  participant1_id INTEGER NOT NULL REFERENCES t_p2841448_elite_concierge_land.users(id),
  participant2_id INTEGER NOT NULL REFERENCES t_p2841448_elite_concierge_land.users(id),
  last_message_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(participant1_id, participant2_id)
);