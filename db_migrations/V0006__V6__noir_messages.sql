CREATE TABLE t_p2841448_elite_concierge_land.noir_messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);