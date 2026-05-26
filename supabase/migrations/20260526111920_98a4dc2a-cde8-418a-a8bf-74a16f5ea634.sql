
-- Staff profiles: update the three real cards
UPDATE public.staff_profiles SET
  full_name = 'Oluwafemi Mary Adekoya',
  job_role = 'Caregiver',
  years_experience = 8,
  bio = 'My name is Oluwafemi Mary Adekoya and I have been working as a professional caregiver for 8 years. I am passionate about providing compassionate, dignified care to every person I work with. I take pride in creating a safe, comfortable and supportive environment for my clients, whether they are elderly, recovering from illness, or in need of daily assistance. I am trained, reliable and deeply committed to the wellbeing of those in my care.',
  skills = 'Elderly care, patient hygiene, medication reminders, mobility support, companionship, wound care awareness',
  duration_with_company = 'Live-in or Live-out',
  available = true,
  photo_url = '/staff/oluwafemi-mary-adekoya.jpg',
  updated_at = now()
WHERE display_order = 1;

UPDATE public.staff_profiles SET
  full_name = 'Bukola Tolani',
  job_role = 'Cook and Chef',
  years_experience = 11,
  bio = 'My name is Bukola Tolani and I have over 11 years of experience as a professional cook and chef working in private homes and households. I specialize in Nigerian cuisine and can prepare a wide variety of local and continental dishes to a high standard. I am hygienic, creative with meal planning, and take great care in making sure every meal I prepare is nourishing and delicious. I bring warmth and professionalism into every kitchen I work in.',
  skills = 'Nigerian cuisine, continental cooking, meal planning, kitchen hygiene, baking, food presentation',
  duration_with_company = 'Live-in or Live-out',
  available = true,
  photo_url = '/staff/bukola-tolani.jpg',
  updated_at = now()
WHERE display_order = 2;

UPDATE public.staff_profiles SET
  full_name = 'Adekunle Toheeb Badmus',
  job_role = 'Driver',
  years_experience = 8,
  bio = 'My name is Adekunle Toheeb Badmus and I am a professional driver with 8 years of experience working for private households and individuals. I am punctual, trustworthy, and highly familiar with routes across Lagos and surrounding areas. I prioritize the safety and comfort of everyone in the vehicle at all times. I hold a valid driver''s license and have a clean driving record. I am calm under pressure, discreet, and committed to providing reliable, professional driving services.',
  skills = 'Private chauffeuring, Lagos routes, vehicle maintenance awareness, time management, discretion, safety-first driving',
  duration_with_company = 'Live-out or Daily',
  available = true,
  photo_url = '/staff/adekunle-toheeb-badmus.jpg',
  updated_at = now()
WHERE display_order = 3;

UPDATE public.staff_profiles SET
  full_name = 'Coming Soon',
  job_role = 'New Team Member',
  years_experience = 0,
  bio = NULL,
  skills = NULL,
  duration_with_company = NULL,
  available = false,
  photo_url = '/staff/coming-soon.jpg',
  updated_at = now()
WHERE display_order = 4;

-- Candidates: clear and reseed with the same real profiles + placeholder
DELETE FROM public.candidates;

INSERT INTO public.candidates (full_name, job_role, years_experience, location, languages, photo_url, bio, skills, preferred_job_type, available, display_order) VALUES
('Oluwafemi Mary Adekoya', 'Caregiver', 8, 'Lagos', 'English, Yoruba', '/staff/oluwafemi-mary-adekoya.jpg',
 'My name is Oluwafemi Mary Adekoya and I have been working as a professional caregiver for 8 years. I am passionate about providing compassionate, dignified care to every person I work with.',
 'Elderly care, patient hygiene, medication reminders, mobility support, companionship, wound care awareness',
 'Live-in or Live-out', true, 1),
('Bukola Tolani', 'Cook and Chef', 11, 'Lagos', 'English, Yoruba', '/staff/bukola-tolani.jpg',
 'My name is Bukola Tolani and I have over 11 years of experience as a professional cook and chef working in private homes and households. I specialize in Nigerian cuisine.',
 'Nigerian cuisine, continental cooking, meal planning, kitchen hygiene, baking, food presentation',
 'Live-in or Live-out', true, 2),
('Adekunle Toheeb Badmus', 'Driver', 8, 'Lagos', 'English, Yoruba', '/staff/adekunle-toheeb-badmus.jpg',
 'My name is Adekunle Toheeb Badmus and I am a professional driver with 8 years of experience working for private households and individuals across Lagos.',
 'Private chauffeuring, Lagos routes, vehicle maintenance awareness, time management, discretion, safety-first driving',
 'Live-out or Daily', true, 3),
('Coming Soon', 'New Candidate', 0, NULL, NULL, '/staff/coming-soon.jpg', NULL, NULL, NULL, false, 4);
