INSERT INTO t_p2841448_elite_concierge_land.app_settings (key, value) VALUES
  ('registration_open', 'true'),
  ('waitlist_open', 'true'),
  ('maintenance_mode', 'false'),
  ('max_invites_silver', '2'),
  ('max_invites_black', '5'),
  ('max_invites_obsidian', '10'),
  ('club_name', '"NOIR"'),
  ('support_email', '"support@noir-club.com"');

INSERT INTO t_p2841448_elite_concierge_land.users (email, password_hash, role, first_name, last_name, tier, status, is_verified) VALUES
  ('admin@noir-club.com', 'pbkdf2:sha256:600000$noir2026$8e3c2f1a9b4d7e6f5c8a2b1d4e7f0c3a6b9d2e5f8c1a4b7e0d3f6c9a2b5e8d1f4', 'admin', 'Alexander', 'Noir', 'obsidian', 'active', true),
  ('manager@noir-club.com', 'pbkdf2:sha256:600000$noir2026$8e3c2f1a9b4d7e6f5c8a2b1d4e7f0c3a6b9d2e5f8c1a4b7e0d3f6c9a2b5e8d1f4', 'manager', 'Victoria', 'Stone', 'obsidian', 'active', true),
  ('member@noir-club.com', 'pbkdf2:sha256:600000$noir2026$8e3c2f1a9b4d7e6f5c8a2b1d4e7f0c3a6b9d2e5f8c1a4b7e0d3f6c9a2b5e8d1f4', 'member', 'Marcus', 'Laurent', 'black', 'active', true),
  ('girl@noir-club.com', 'pbkdf2:sha256:600000$noir2026$8e3c2f1a9b4d7e6f5c8a2b1d4e7f0c3a6b9d2e5f8c1a4b7e0d3f6c9a2b5e8d1f4', 'girl', 'Sofia', 'Bellucci', 'silver', 'active', true);

UPDATE t_p2841448_elite_concierge_land.users SET manager_id = 2 WHERE id IN (3, 4);

INSERT INTO t_p2841448_elite_concierge_land.girl_profiles (user_id, height, hair_color, eye_color, education, profession, languages, interests, travel_ready, is_public) VALUES
  (4, 168, 'Тёмно-русые', 'Карие', 'Высшее, искусствоведение', 'Арт-директор', '{"Русский","English","Italiano"}', '{"Искусство","Путешествия","Гастрономия"}', true, true);

INSERT INTO t_p2841448_elite_concierge_land.invite_codes (code, created_by, type, max_uses) VALUES
  ('NOIR-SILVER-2026', 2, 'member', 10),
  ('NOIR-GIRL-2026', 2, 'girl', 10);

INSERT INTO t_p2841448_elite_concierge_land.journal_posts (author_id, title, slug, excerpt, content, tags, category, language, is_published, published_at) VALUES
  (1, 'Философия NOIR: Что значит быть членом клуба', 'filosofiya-noir', 'NOIR — это не просто клуб. Это образ мышления, стиль жизни и сообщество людей, которые понимают цену настоящей эксклюзивности.', 'NOIR — это не просто клуб. Это образ мышления...', '{"философия","членство"}', 'Философия', 'ru', true, NOW()),
  (1, 'Дубай: Зимний сезон 2026', 'dubai-zima-2026', 'Закрытый ужин на вилле в Palm Jumeirah. Как это было.', 'Закрытый ужин на вилле в Palm Jumeirah...', '{"Dubai","события","эксклюзив"}', 'События', 'ru', true, NOW());