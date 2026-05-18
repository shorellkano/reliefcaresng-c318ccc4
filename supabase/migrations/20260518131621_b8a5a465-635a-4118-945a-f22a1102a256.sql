
-- ADVERTS
CREATE TABLE public.adverts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'COMPANY NEWS',
  description TEXT NOT NULL,
  link_url TEXT,
  visible BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.adverts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view visible adverts" ON public.adverts FOR SELECT USING (visible = true);
CREATE POLICY "Admins manage adverts" ON public.adverts FOR ALL USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- VACANCIES
CREATE TABLE public.vacancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  work_type TEXT NOT NULL,
  salary TEXT,
  accommodation BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view vacancies" ON public.vacancies FOR SELECT USING (true);
CREATE POLICY "Admins manage vacancies" ON public.vacancies FOR ALL USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- CANDIDATES (shortlisted, distinct from staff_profiles)
CREATE TABLE public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  job_role TEXT NOT NULL,
  years_experience INTEGER DEFAULT 0,
  languages TEXT,
  location TEXT,
  preferred_job_type TEXT,
  skills TEXT,
  bio TEXT,
  photo_url TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view candidates" ON public.candidates FOR SELECT USING (true);
CREATE POLICY "Admins manage candidates" ON public.candidates FOR ALL USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- TRAINING ENQUIRIES
CREATE TABLE public.training_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  program TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.training_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submit enquiry" ON public.training_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view enquiries" ON public.training_enquiries FOR SELECT USING (has_role(auth.uid(),'admin'));

-- Seed initial placeholder content
INSERT INTO public.adverts (title, category, description, display_order) VALUES
('Experienced Nannies Needed in Lagos', 'URGENT VACANCY', 'We are currently recruiting experienced nannies in Lagos. Apply now to be matched with families looking for childcare support.', 1),
('New Services Now Available', 'COMPANY NEWS', 'Relief Care is now offering Wound Care and Palliative Care services across Lagos State. Speak to our team for details.', 2),
('Next Caregiver Training Cohort Open', 'TRAINING', 'Enroll in our next caregiver training cohort. Limited spaces available. Reserve your spot today.', 3);

INSERT INTO public.vacancies (title, location, work_type, salary, accommodation, description, requirements, display_order) VALUES
('Experienced Nanny', 'Lekki, Lagos', 'Live-in', 'NGN 40,000 to NGN 60,000 per month', true,
 'We are looking for a warm, experienced nanny to care for two children aged 2 and 5 in a family home in Lekki. The ideal candidate is patient, responsible, and has at least 2 years of childcare experience. Duties include feeding, bathing, school drop-off support, and light household tidying related to the children.',
 'Minimum 2 years childcare experience, patient, responsible, references required.', 1),
('Female Housekeeper', 'Ikeja, Lagos', 'Live-out', 'NGN 30,000 to NGN 45,000 per month', false,
 'A family in Ikeja GRA requires a hardworking and trustworthy female housekeeper for daily cleaning and home management duties. Experience in washing, ironing, cooking, and general household upkeep is required. Candidate must be neat, punctual, and reliable.',
 'Washing, ironing, cooking, household upkeep experience.', 2),
('Elderly Caregiver', 'Abuja, FCT', 'Live-in', 'NGN 50,000 to NGN 80,000 per month', true,
 'Seeking a compassionate and experienced caregiver to provide daily support to an elderly woman in Abuja. Duties include personal hygiene assistance, medication reminders, mobility support, and companionship. Previous experience in elderly care is essential.',
 'Previous elderly care experience essential, compassionate, reliable.', 3),
('Private Cook', 'Victoria Island, Lagos', 'Live-out', 'NGN 40,000 per month', false,
 'A professional household on Victoria Island requires a skilled Nigerian cook proficient in local and continental cuisine. Must be hygienic, creative with meal planning, and available Monday through Saturday.',
 'Skilled in Nigerian and continental cuisine, hygienic, available Mon-Sat.', 4);

INSERT INTO public.candidates (full_name, job_role, years_experience, languages, location, preferred_job_type, skills, bio, available, display_order) VALUES
('Blessing Okonkwo', 'Nanny', 4, 'English, Igbo', 'Lagos', 'Live-in', 'Childcare, Cooking, Light cleaning, First aid', 'I am a warm, patient nanny with four years of experience caring for children from newborn to age eight. I love what I do.', true, 1),
('Grace Adeleke', 'Housekeeper', 6, 'English, Yoruba', 'Lagos', 'Live-out', 'Cleaning, Laundry, Ironing, Organization', 'I have spent six years keeping homes running smoothly. I am detail-oriented, respectful, and proud of my work.', true, 2),
('Mary Eze', 'Elderly Caregiver', 5, 'English, Igbo', 'Lagos', 'Live-in', 'Personal care, Mobility support, Companionship, Medication reminders', 'Caring for elders is a calling for me. Five years of experience and a heart for the people I serve.', true, 3),
('Ngozi Olawale', 'Cook', 8, 'English, Yoruba', 'Lagos', 'Live-out', 'Nigerian cuisine, Continental cuisine, Meal planning, Pastries', 'Cooking is my craft. I prepare meals that families look forward to every day.', true, 4);
