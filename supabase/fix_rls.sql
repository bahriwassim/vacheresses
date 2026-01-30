-- FIX RLS INFINITE RECURSION (CORRECTED)
-- Ce script corrige le problème de récursion infinie dans les politiques de sécurité
-- Il est idempotent (peut être exécuté plusieurs fois sans erreur)

-- Activer RLS explicitement (sécurité des tables)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 1. Nettoyer toutes les policies existantes sur public.users pour éviter les conflits / récursion
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('users','bookings','contracts','payments','messages')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
  END LOOP;
END $$;

-- 2. Recréer les politiques proprement (sans référence à public.users depuis la table users)

-- Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users view own profile" ON public.users
FOR SELECT USING (
    auth.uid() = id
);

-- Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users update own profile" ON public.users
FOR UPDATE USING (
    auth.uid() = id
);

-- Politique pour permettre au Service Role (serveur) de tout faire
CREATE POLICY "Service Role manages users" ON public.users
FOR ALL USING (
    auth.jwt() ->> 'role' = 'service_role'
);

-- Bookings: clients gèrent leurs propres réservations, service role complet
CREATE POLICY "Bookings select own" ON public.bookings
FOR SELECT USING (
  auth.uid() = user_id
);

CREATE POLICY "Bookings insert own" ON public.bookings
FOR INSERT WITH CHECK (
  auth.uid() = user_id
);

CREATE POLICY "Bookings update own" ON public.bookings
FOR UPDATE USING (
  auth.uid() = user_id
);

CREATE POLICY "Bookings delete own" ON public.bookings
FOR DELETE USING (
  auth.uid() = user_id
);

CREATE POLICY "Service Role manages bookings" ON public.bookings
FOR ALL USING (
  auth.jwt() ->> 'role' = 'service_role'
);

-- Contracts: lecture via booking de l'utilisateur, service role complet
CREATE POLICY "Contracts select via own booking" ON public.contracts
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);

CREATE POLICY "Service Role manages contracts" ON public.contracts
FOR ALL USING (
  auth.jwt() ->> 'role' = 'service_role'
);

-- Payments: lecture via booking de l'utilisateur, service role complet
CREATE POLICY "Payments select via own booking" ON public.payments
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);

CREATE POLICY "Service Role manages payments" ON public.payments
FOR ALL USING (
  auth.jwt() ->> 'role' = 'service_role'
);

-- Messages: lecture/insert liés aux bookings de l'utilisateur, service role complet
CREATE POLICY "Messages select via own booking" ON public.messages
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);

CREATE POLICY "Messages insert via own booking" ON public.messages
FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.bookings WHERE id = booking_id AND user_id = auth.uid())
);

CREATE POLICY "Service Role manages messages" ON public.messages
FOR ALL USING (
  auth.jwt() ->> 'role' = 'service_role'
);
