CREATE TABLE t_p2841448_elite_concierge_land.journal_posts (
  id SERIAL PRIMARY KEY,
  author_id INTEGER,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  language VARCHAR(10) DEFAULT 'ru',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p2841448_elite_concierge_land.admin_logs (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50),
  target_id INTEGER,
  details JSONB DEFAULT '{}',
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p2841448_elite_concierge_land.app_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_by INTEGER,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p2841448_elite_concierge_land.events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  location VARCHAR(500),
  city VARCHAR(100),
  country VARCHAR(100),
  cover_image_url TEXT,
  max_attendees INTEGER,
  min_tier VARCHAR(20) DEFAULT 'silver',
  status VARCHAR(20) DEFAULT 'upcoming',
  created_by INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p2841448_elite_concierge_land.event_attendees (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'invited',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);