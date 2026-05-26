
-- Replace existing staff with 3 real photos + 1 placeholder card
DELETE FROM public.staff_profiles;

INSERT INTO public.staff_profiles (full_name, job_role, years_experience, duration_with_company, bio, photo_url, available, display_order) VALUES
('Staff Member Name', 'Job Role', 0, '0 years', 'Personal bio to be added by admin', 'https://kdgfbmxwtcfnsajyakht.supabase.co/storage/v1/object/public/staff-photos/real-staff-3.jpg', true, 1),
('Staff Member Name', 'Job Role', 0, '0 years', 'Personal bio to be added by admin', 'https://kdgfbmxwtcfnsajyakht.supabase.co/storage/v1/object/public/staff-photos/real-staff-2.jpg', true, 2),
('Staff Member Name', 'Job Role', 0, '0 years', 'Personal bio to be added by admin', 'https://kdgfbmxwtcfnsajyakht.supabase.co/storage/v1/object/public/staff-photos/real-staff-1.jpg', true, 3),
('Awaiting Photo Upload', 'Job Role', 0, '0 years', 'Personal bio to be added by admin', NULL, true, 4);
