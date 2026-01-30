-- FIX ALL RLS POLICIES (COMPLETE RESET)
-- Ce script nettoie TOUTES les politiques existantes et les recrée proprement.
-- Il corrige les erreurs "policy already exists" et "permission denied".

-- 1. Activer RLS explicitement sur toutes les tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_overrides ENABLE ROW LEVEL SECURITY;

-- 2. Nettoyer TOUTES les policies existantes pour ces tables
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'users', 'bookings', 'contracts', 'payments', 'messages',
        'packages', 'accommodations', 'content_overrides', 'media_overrides'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
  END LOOP;
END $$;

-- 3. Recréer les politiques

-- === USERS ===
CREATE POLICY "Users view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service Role manages users" ON public.users FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins view all users" ON public.users FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- === BOOKINGS ===
CREATE POLICY "Bookings select own" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Bookings insert own" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Bookings update own" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Bookings delete own" ON public.bookings FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Service Role manages bookings" ON public.bookings FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins manage bookings" ON public.bookings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- === PACKAGES ===
CREATE POLICY "Public read packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Service Role manages packages" ON public.packages FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins manage packages" ON public.packages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- === ACCOMMODATIONS ===
CREATE POLICY "Public read accommodations" ON public.accommodations FOR SELECT USING (true);
CREATE POLICY "Service Role manages accommodations" ON public.accommodations FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins manage accommodations" ON public.accommodations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- === CONTENT OVERRIDES ===
CREATE POLICY "Public read content" ON public.content_overrides FOR SELECT USING (true);
CREATE POLICY "Service Role manages content" ON public.content_overrides FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins manage content" ON public.content_overrides FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- === MEDIA OVERRIDES ===
CREATE POLICY "Public read media" ON public.media_overrides FOR SELECT USING (true);
CREATE POLICY "Service Role manages media" ON public.media_overrides FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins manage media" ON public.media_overrides FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- === CONTRACTS, PAYMENTS, MESSAGES (Linked to Booking) ===
-- Contracts
CREATE POLICY "Contracts select via own booking" ON public.contracts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);
CREATE POLICY "Service Role manages contracts" ON public.contracts FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins manage contracts" ON public.contracts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Payments
CREATE POLICY "Payments select via own booking" ON public.payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);
CREATE POLICY "Service Role manages payments" ON public.payments FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins manage payments" ON public.payments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Messages
CREATE POLICY "Messages select via own booking" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);
CREATE POLICY "Messages insert via own booking" ON public.messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);
CREATE POLICY "Service Role manages messages" ON public.messages FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Admins manage messages" ON public.messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);
