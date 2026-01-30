-- =====================================================
-- RLS POLICIES FOR MANOIR DE VACHERESSES (ROBUST VERSION)
-- =====================================================

-- 0. Helper Functions to avoid recursion
-- These functions use SECURITY DEFINER to bypass RLS when checking roles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check JWT first
  IF (auth.jwt() ->> 'role' = 'service_role') THEN
    RETURN TRUE;
  END IF;
  
  -- Check user metadata
  IF (auth.jwt() -> 'user_metadata' ->> 'role' IN ('admin', 'super_admin')) THEN
    RETURN TRUE;
  END IF;

  -- Final check in database
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check JWT first (fastest)
  IF (auth.jwt() ->> 'role' = 'service_role') THEN
    RETURN TRUE;
  END IF;
  
  -- Check user metadata (available in JWT)
  IF (auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin') THEN
    RETURN TRUE;
  END IF;

  -- Final check in database
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 2. Grant basic permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- 3. USERS POLICIES
DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
CREATE POLICY "Users can read own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can read all profiles" ON public.users;
CREATE POLICY "Admins can read all profiles" ON public.users
    FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.users;
CREATE POLICY "Admins can update all profiles" ON public.users
    FOR UPDATE USING (is_admin());

-- 4. BOOKINGS POLICIES
DROP POLICY IF EXISTS "Users can read own bookings" ON public.bookings;
CREATE POLICY "Users can read own bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings;
CREATE POLICY "Users can create own bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins full access bookings" ON public.bookings;
CREATE POLICY "Admins full access bookings" ON public.bookings
    FOR ALL USING (is_admin());

-- 5. CONTENT & MEDIA OVERRIDES (Public Read, SuperAdmin Write)
DROP POLICY IF EXISTS "Public read content" ON public.content_overrides;
CREATE POLICY "Public read content" ON public.content_overrides FOR SELECT USING (true);

DROP POLICY IF EXISTS "SuperAdmins modify content" ON public.content_overrides;
CREATE POLICY "SuperAdmins modify content" ON public.content_overrides
    FOR ALL 
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

DROP POLICY IF EXISTS "Public read media" ON public.media_overrides;
CREATE POLICY "Public read media" ON public.media_overrides FOR SELECT USING (true);

DROP POLICY IF EXISTS "SuperAdmins modify media" ON public.media_overrides;
CREATE POLICY "SuperAdmins modify media" ON public.media_overrides
    FOR ALL 
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- 6. PUBLIC TABLES (Packages, Accommodations, Testimonials, Blog)
DROP POLICY IF EXISTS "Public read packages" ON public.packages;
CREATE POLICY "Public read packages" ON public.packages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins modify packages" ON public.packages;
CREATE POLICY "Admins modify packages" ON public.packages FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Public read accommodations" ON public.accommodations;
CREATE POLICY "Public read accommodations" ON public.accommodations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins modify accommodations" ON public.accommodations;
CREATE POLICY "Admins modify accommodations" ON public.accommodations FOR ALL USING (is_admin());

-- 7. MESSAGES, CONTRACTS, PAYMENTS
DROP POLICY IF EXISTS "Users can read own messages" ON public.messages;
CREATE POLICY "Users can read own messages" ON public.messages
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins full access messages" ON public.messages;
CREATE POLICY "Admins full access messages" ON public.messages FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Users can read own contracts" ON public.contracts;
CREATE POLICY "Users can read own contracts" ON public.contracts
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins full access contracts" ON public.contracts;
CREATE POLICY "Admins full access contracts" ON public.contracts FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins modify availability" ON public.availability_calendar;
CREATE POLICY "Admins modify availability" ON public.availability_calendar
    FOR ALL USING (is_admin());

-- =====================================================
-- STORAGE POLICIES (Supabase Storage)
-- =====================================================

-- Note: These policies should be applied to the 'storage.objects' table
-- for the specific bucket (site-media)

-- 1. Public Read Access
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'site-media');

-- 2. SuperAdmin Upload/Delete Access
DROP POLICY IF EXISTS "SuperAdmin Upload Access" ON storage.objects;
CREATE POLICY "SuperAdmin Upload Access" ON storage.objects
    FOR ALL USING (
        bucket_id = 'site-media' AND is_super_admin()
    );
