CREATE TABLE t_p2841448_elite_concierge_land.girl_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL,
  height INTEGER,
  weight INTEGER,
  measurements VARCHAR(50),
  eye_color VARCHAR(50),
  hair_color VARCHAR(50),
  education VARCHAR(200),
  profession VARCHAR(200),
  languages TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  travel_ready BOOLEAN DEFAULT true,
  photos JSONB DEFAULT '[]',
  is_public BOOLEAN DEFAULT false,
  available_cities TEXT[] DEFAULT '{}',
  schedule_notes TEXT,
  min_meeting_hours INTEGER DEFAULT 2,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p2841448_elite_concierge_land.availability (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  time_slots JSONB DEFAULT '[]',
  notes VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE TABLE t_p2841448_elite_concierge_land.notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(300) NOT NULL,
  body TEXT,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);