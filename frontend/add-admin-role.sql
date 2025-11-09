-- Manuel olarak admin rolü ekleme
-- Supabase Dashboard > SQL Editor'de çalıştırın

-- 1. Önce kullanıcı ID'sini bulalım
SELECT id, email, created_at, email_confirmed_at
FROM auth.users
WHERE email = 'erozturkdev@icloud.com';

-- 2. User roles tablosunu kontrol et
SELECT * FROM public.user_roles;

-- 3. Admin rolü ekle (yukarıdaki SELECT'ten aldığın ID'yi kullan)
-- ÖNEMLİ: 'YOUR_USER_ID' yerine gerçek ID'yi yapıştır
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- 4. Kontrol et
SELECT u.email, ur.role
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'erozturkdev@icloud.com';
