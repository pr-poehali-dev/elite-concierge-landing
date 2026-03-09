CREATE TABLE t_p2841448_elite_concierge_land.meeting_requests (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL,
  girl_id INTEGER NOT NULL,
  manager_id INTEGER,
  date_preferred DATE,
  time_preferred VARCHAR(50),
  duration_hours INTEGER DEFAULT 2,
  location VARCHAR(500),
  city VARCHAR(100),
  country VARCHAR(100),
  format VARCHAR(50) DEFAULT 'dinner',
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  manager_notes TEXT,
  girl_response TEXT,
  budget_range VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p2841448_elite_concierge_land.concierge_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  manager_id INTEGER,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  budget VARCHAR(100),
  deadline DATE,
  priority VARCHAR(20) DEFAULT 'normal',
  status VARCHAR(20) DEFAULT 'new',
  manager_response TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p2841448_elite_concierge_land.concierge_messages (
  id SERIAL PRIMARY KEY,
  request_id INTEGER NOT NULL,
  sender_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);