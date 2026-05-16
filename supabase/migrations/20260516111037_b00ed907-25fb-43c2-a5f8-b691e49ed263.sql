
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Staff profiles
CREATE TABLE public.staff_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  age INT,
  gender TEXT,
  state_of_origin TEXT,
  job_role TEXT NOT NULL,
  years_experience INT DEFAULT 0,
  duration_with_company TEXT,
  bio TEXT,
  skills TEXT,
  photo_url TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view staff" ON public.staff_profiles FOR SELECT USING (true);
CREATE POLICY "Admins manage staff" ON public.staff_profiles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Job applications
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  age INT,
  gender TEXT,
  state_of_origin TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  home_address TEXT,
  years_experience INT,
  job_category TEXT,
  work_history TEXT,
  certifications TEXT,
  photo_url TEXT,
  id_url TEXT,
  personal_statement TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit applications" ON public.job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view applications" ON public.job_applications FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Hire requests
CREATE TABLE public.hire_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  home_address TEXT,
  staff_type TEXT,
  live_preference TEXT,
  number_of_staff INT,
  requirements TEXT,
  preferred_start_date DATE,
  hear_about_us TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hire_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit hire requests" ON public.hire_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view hire requests" ON public.hire_requests FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view messages" ON public.contact_messages FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('staff-photos', 'staff-photos', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('applications', 'applications', false) ON CONFLICT DO NOTHING;

CREATE POLICY "Public read staff photos" ON storage.objects FOR SELECT USING (bucket_id = 'staff-photos');
CREATE POLICY "Admins upload staff photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'staff-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update staff photos" ON storage.objects FOR UPDATE USING (bucket_id = 'staff-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete staff photos" ON storage.objects FOR DELETE USING (bucket_id = 'staff-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone uploads applications" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'applications');
CREATE POLICY "Admins read applications storage" ON storage.objects FOR SELECT USING (bucket_id = 'applications' AND public.has_role(auth.uid(), 'admin'));
