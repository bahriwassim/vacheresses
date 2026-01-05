-- =====================================================
-- SCRIPT SQL SUPABASE COMPLET - MANOIR DE VACHERESSES
-- Version: 2.0 (Authentification Supabase Native)
-- =====================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 2. GESTION UTILISATEURS & AUTH
-- =====================================================

-- Table publique des utilisateurs (liée à auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(20) NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fonction de synchronisation automatique (auth.users -> public.users)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, phone, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', 'Utilisateur'),
        COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
        COALESCE(NEW.raw_user_meta_data->>'role', 'client')
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        role = EXCLUDED.role;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger sur auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 3. CONTENU & MÉDIAS ÉDITABLES
-- =====================================================

-- Table des overrides de contenu (Textes)
CREATE TABLE IF NOT EXISTS public.content_overrides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path TEXT NOT NULL,
    locale VARCHAR(5) NOT NULL,
    content TEXT NOT NULL,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT content_overrides_unique UNIQUE (path, locale)
);

-- Historique des modifications de texte
CREATE TABLE IF NOT EXISTS public.content_override_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path TEXT NOT NULL,
    locale VARCHAR(5) NOT NULL,
    content TEXT,
    action VARCHAR(10) NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
    modified_by UUID REFERENCES public.users(id),
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des overrides de médias (Images/Vidéos globales)
CREATE TABLE IF NOT EXISTS public.media_overrides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    url TEXT NOT NULL,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT media_overrides_unique UNIQUE (path)
);

-- Historique des modifications de médias
CREATE TABLE IF NOT EXISTS public.media_override_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    url TEXT,
    action VARCHAR(10) NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
    modified_by UUID REFERENCES public.users(id),
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. TABLES MÉTIER (MARIAGES & HÉBERGEMENTS)
-- =====================================================

-- Forfaits
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id VARCHAR(50) UNIQUE NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    max_guests INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Caractéristiques des forfaits
CREATE TABLE IF NOT EXISTS public.package_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
    feature_fr TEXT NOT NULL,
    feature_en TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Options supplémentaires (Addons)
CREATE TABLE IF NOT EXISTS public.addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    addon_id VARCHAR(50) UNIQUE NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hébergements
CREATE TABLE IF NOT EXISTS public.accommodations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id VARCHAR(50) UNIQUE NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    type_fr VARCHAR(100),
    type_en VARCHAR(100),
    capacity INTEGER NOT NULL,
    surface VARCHAR(20),
    price_per_night DECIMAL(10, 2) NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    has_online_booking BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Réservations
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    package_id UUID REFERENCES public.packages(id),
    event_date DATE NOT NULL,
    guest_count INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'booked', 'confirmed', 'completed', 'cancelled')),
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    deposit_amount DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Liaison Réservations - Options
CREATE TABLE IF NOT EXISTS public.booking_addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    addon_id UUID REFERENCES public.addons(id),
    quantity INTEGER DEFAULT 1,
    price_at_booking DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Réservations Hébergements
CREATE TABLE IF NOT EXISTS public.accommodation_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    accommodation_id UUID REFERENCES public.accommodations(id),
    user_id UUID REFERENCES public.users(id),
    booking_id UUID REFERENCES public.bookings(id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guest_count INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
    total_amount DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contrats
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    contract_type VARCHAR(50) NOT NULL CHECK (contract_type IN ('main', 'catering', 'accommodation')),
    document_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'awaiting_signature' CHECK (status IN ('awaiting_signature', 'signed', 'completed')),
    signed_at TIMESTAMP WITH TIME ZONE,
    document_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Paiements
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    payment_type VARCHAR(50) NOT NULL CHECK (payment_type IN ('deposit', 'initial', 'booking_fee', 'balance', 'accommodation')),
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'due' CHECK (status IN ('due', 'pending', 'paid', 'overdue')),
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.users(id),
    sender_role VARCHAR(20) NOT NULL CHECK (sender_role IN ('client', 'admin', 'planner')),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendrier de disponibilité
CREATE TABLE IF NOT EXISTS public.availability_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    booking_id UUID REFERENCES public.bookings(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Témoignages
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id),
    client_name VARCHAR(255) NOT NULL,
    testimonial_fr TEXT NOT NULL,
    testimonial_en TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_published BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_fr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    excerpt_fr TEXT,
    excerpt_en TEXT,
    content_fr TEXT NOT NULL,
    content_en TEXT NOT NULL,
    author VARCHAR(255),
    cover_image_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. FONCTIONS UTILITAIRES & TRIGGERS
-- =====================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addons_updated_at BEFORE UPDATE ON public.addons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accommodations_updated_at BEFORE UPDATE ON public.accommodations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_overrides_updated_at BEFORE UPDATE ON public.content_overrides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_overrides_updated_at BEFORE UPDATE ON public.media_overrides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Audit Content
CREATE OR REPLACE FUNCTION audit_content_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        INSERT INTO public.content_override_history(path, locale, content, action, modified_by, modified_at)
        VALUES (NEW.path, NEW.locale, NEW.content, LOWER(TG_OP), auth.uid(), NOW());
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO public.content_override_history(path, locale, content, action, modified_by, modified_at)
        VALUES (OLD.path, OLD.locale, OLD.content, 'delete', auth.uid(), NOW());
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_content_trigger AFTER INSERT OR UPDATE OR DELETE ON public.content_overrides FOR EACH ROW EXECUTE FUNCTION audit_content_changes();

-- Audit Media
CREATE OR REPLACE FUNCTION audit_media_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        INSERT INTO public.media_override_history(path, media_type, url, action, modified_by, modified_at)
        VALUES (NEW.path, NEW.media_type, NEW.url, LOWER(TG_OP), auth.uid(), NOW());
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO public.media_override_history(path, media_type, url, action, modified_by, modified_at)
        VALUES (OLD.path, OLD.media_type, OLD.url, 'delete', auth.uid(), NOW());
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_media_trigger AFTER INSERT OR UPDATE OR DELETE ON public.media_overrides FOR EACH ROW EXECUTE FUNCTION audit_media_changes();

-- Génération référence réservation
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
    ref TEXT;
    exists BOOLEAN;
BEGIN
    LOOP
        ref := 'VAC' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
        SELECT COUNT(*) > 0 INTO exists FROM public.bookings WHERE booking_reference = ref;
        EXIT WHEN NOT exists;
    END LOOP;
    RETURN ref;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_reference IS NULL THEN
        NEW.booking_reference := generate_booking_reference();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_booking_reference_trigger BEFORE INSERT ON public.bookings FOR EACH ROW EXECUTE FUNCTION set_booking_reference();

-- Mise à jour calendrier sur réservation
CREATE OR REPLACE FUNCTION update_calendar_on_booking()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.availability_calendar (date, is_available, booking_id)
    VALUES (NEW.event_date, FALSE, NEW.id)
    ON CONFLICT (date) DO UPDATE
    SET is_available = FALSE, booking_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_calendar_trigger AFTER INSERT ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_calendar_on_booking();

-- =====================================================
-- 6. POLITIQUES DE SÉCURITÉ (RLS)
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_overrides ENABLE ROW LEVEL SECURITY;

-- Users
CREATE POLICY "Users view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins view all profiles" ON public.users FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Bookings
CREATE POLICY "Clients view own bookings" ON public.bookings FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);
CREATE POLICY "Admins manage bookings" ON public.bookings FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

-- Content & Media (Admins only for write, Public for read)
CREATE POLICY "Public view content" ON public.content_overrides FOR SELECT USING (true);
CREATE POLICY "Admins manage content" ON public.content_overrides FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin'))
);

CREATE POLICY "Public view media" ON public.media_overrides FOR SELECT USING (true);
CREATE POLICY "Super admins insert media" ON public.media_overrides FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "Super admins update media" ON public.media_overrides FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
);
CREATE POLICY "Super admins delete media" ON public.media_overrides FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
);

-- =====================================================
-- 7. DONNÉES INITIALES
-- =====================================================

-- Forfaits
INSERT INTO public.packages (package_id, name_fr, name_en, description_fr, description_en, base_price, max_guests) VALUES
('classic', 'Élégance Classique', 'Classic Elegance', 'Notre forfait essentiel.', 'Our essential package.', 15000.00, 100),
('premium', 'Romance Premium', 'Premium Romance', 'Une expérience améliorée.', 'An enhanced experience.', 25000.00, 150),
('luxury', 'Rêve de Luxe', 'Luxury Dream', 'Le forfait tout compris ultime.', 'The ultimate all-inclusive package.', 40000.00, 200)
ON CONFLICT (package_id) DO NOTHING;

-- Hébergements
INSERT INTO public.accommodations (room_id, name_fr, name_en, capacity, price_per_night, is_available) VALUES
('heures_du_jour', 'Les Heures du Jour', 'Les Heures du Jour', 4, 180.00, TRUE),
('ruines_antiques', 'Ruines Antiques', 'Ruines Antiques', 4, 180.00, TRUE),
('jardins_tivoli', 'Les Jardins Tivoli', 'Les Jardins Tivoli', 3, 150.00, TRUE),
('petit_trianon', 'Le Petit Trianon', 'Le Petit Trianon', 2, 120.00, TRUE)
ON CONFLICT (room_id) DO NOTHING;

-- =====================================================
-- 8. VUES (DASHBOARD)
-- =====================================================

CREATE OR REPLACE VIEW booking_summary AS
SELECT
    b.id, b.booking_reference, b.event_date, b.status, b.guest_count, b.total_amount,
    u.name AS client_name, u.email AS client_email,
    p.name_fr AS package_name
FROM public.bookings b
LEFT JOIN public.users u ON b.user_id = u.id
LEFT JOIN public.packages p ON b.package_id = p.id;

-- Fin du script
