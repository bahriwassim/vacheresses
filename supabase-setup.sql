-- =====================================================
-- SCRIPT SQL SUPABASE - MANOIR DE VACHERESSES
-- Backoffice complet pour la gestion des réservations
-- =====================================================

-- Activer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABLES PRINCIPALES
-- =====================================================

-- Table des utilisateurs (clients et admins)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(20) NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Autoriser le rôle super_admin dans la contrainte
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE public.users ADD CONSTRAINT users_role_check CHECK (role IN ('client', 'admin', 'super_admin'));

-- Table des forfaits de mariage
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id VARCHAR(50) UNIQUE NOT NULL, -- 'classic', 'premium', 'luxury'
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    max_guests INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des caractéristiques des forfaits
CREATE TABLE IF NOT EXISTS public.package_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
    feature_fr TEXT NOT NULL,
    feature_en TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des options supplémentaires
CREATE TABLE IF NOT EXISTS public.addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    addon_id VARCHAR(50) UNIQUE NOT NULL, -- 'rolls', 'lanterns', 'chairs', etc.
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des hébergements (chambres)
CREATE TABLE IF NOT EXISTS public.accommodations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id VARCHAR(50) UNIQUE NOT NULL, -- 'heures_du_jour', 'ruines_antiques', etc.
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

-- Table des réservations principales (mariages)
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

-- Table de liaison réservations - options
CREATE TABLE IF NOT EXISTS public.booking_addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    addon_id UUID REFERENCES public.addons(id),
    quantity INTEGER DEFAULT 1,
    price_at_booking DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des réservations d'hébergements
CREATE TABLE IF NOT EXISTS public.accommodation_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    accommodation_id UUID REFERENCES public.accommodations(id),
    user_id UUID REFERENCES public.users(id),
    booking_id UUID REFERENCES public.bookings(id), -- Lié à une réservation de mariage si applicable
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guest_count INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
    total_amount DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des contrats
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

-- Table des paiements
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

-- Table des messages entre clients et admins
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.users(id),
    sender_role VARCHAR(20) NOT NULL CHECK (sender_role IN ('client', 'admin', 'planner')),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table du calendrier de disponibilité
CREATE TABLE IF NOT EXISTS public.availability_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    booking_id UUID REFERENCES public.bookings(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des témoignages
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

-- Table des articles de blog
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

-- Table des overrides de contenu
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

-- =====================================================
-- FONCTIONS UTILITAIRES
-- =====================================================

-- Fonction pour générer une référence de réservation unique
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

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour calculer le nombre de nuits
CREATE OR REPLACE FUNCTION calculate_nights(check_in DATE, check_out DATE)
RETURNS INTEGER AS $$
BEGIN
    RETURN check_out - check_in;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour vérifier la disponibilité d'une date
CREATE OR REPLACE FUNCTION check_date_availability(event_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
    is_free BOOLEAN;
BEGIN
    SELECT is_available INTO is_free
    FROM public.availability_calendar
    WHERE date = event_date;

    IF is_free IS NULL THEN
        RETURN TRUE; -- Date non encore dans le calendrier = disponible
    END IF;

    RETURN is_free;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON public.packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addons_updated_at BEFORE UPDATE ON public.addons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accommodations_updated_at BEFORE UPDATE ON public.accommodations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.contracts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_overrides_updated_at BEFORE UPDATE ON public.content_overrides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Historique des overrides de contenu
CREATE TABLE IF NOT EXISTS public.content_override_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path TEXT NOT NULL,
    locale VARCHAR(5) NOT NULL,
    content TEXT,
    action VARCHAR(10) NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
    modified_by UUID REFERENCES public.users(id),
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fonction d'audit pour historiser les modifications
CREATE OR REPLACE FUNCTION audit_content_overrides()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO public.content_override_history(path, locale, content, action, modified_by, modified_at)
        VALUES (NEW.path, NEW.locale, NEW.content, 'insert', NEW.created_by, NOW());
        RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.content_override_history(path, locale, content, action, modified_by, modified_at)
        VALUES (NEW.path, NEW.locale, NEW.content, 'update', NEW.created_by, NOW());
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO public.content_override_history(path, locale, content, action, modified_by, modified_at)
        VALUES (OLD.path, OLD.locale, OLD.content, 'delete', OLD.created_by, NOW());
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_content_overrides_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.content_overrides
FOR EACH ROW EXECUTE FUNCTION audit_content_overrides();

-- Overrides de médias (images/vidéos)
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

CREATE TRIGGER update_media_overrides_updated_at BEFORE UPDATE ON public.media_overrides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.media_override_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    url TEXT,
    action VARCHAR(10) NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
    modified_by UUID REFERENCES public.users(id),
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION audit_media_overrides()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO public.media_override_history(path, media_type, url, action, modified_by, modified_at)
        VALUES (NEW.path, NEW.media_type, NEW.url, 'insert', NEW.created_by, NOW());
        RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.media_override_history(path, media_type, url, action, modified_by, modified_at)
        VALUES (NEW.path, NEW.media_type, NEW.url, 'update', NEW.created_by, NOW());
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO public.media_override_history(path, media_type, url, action, modified_by, modified_at)
        VALUES (OLD.path, OLD.media_type, OLD.url, 'delete', OLD.created_by, NOW());
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_media_overrides_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.media_overrides
FOR EACH ROW EXECUTE FUNCTION audit_media_overrides();

-- Trigger pour générer automatiquement une référence de réservation
CREATE OR REPLACE FUNCTION set_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_reference IS NULL THEN
        NEW.booking_reference := generate_booking_reference();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_booking_reference_trigger BEFORE INSERT ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION set_booking_reference();

-- Trigger pour mettre à jour le calendrier lors d'une réservation
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

CREATE TRIGGER update_calendar_trigger AFTER INSERT ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_calendar_on_booking();

-- =====================================================
-- POLITIQUES DE SÉCURITÉ (RLS - Row Level Security)
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_override_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_override_history ENABLE ROW LEVEL SECURITY;

-- Politique pour les utilisateurs : peuvent voir et modifier leurs propres données
CREATE POLICY users_select_own ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY users_update_own ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Politique pour les réservations : clients voient leurs réservations
CREATE POLICY bookings_select_own ON public.bookings
    FOR SELECT USING (
        user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );

-- Politique pour les contrats : clients voient leurs contrats
CREATE POLICY contracts_select_own ON public.contracts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = contracts.booking_id
            AND (bookings.user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin')))
        )
    );

-- Politique pour les paiements : clients voient leurs paiements
CREATE POLICY payments_select_own ON public.payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = payments.booking_id
            AND (bookings.user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin')))
        )
    );

-- Politique pour les messages : participants peuvent voir leurs messages
CREATE POLICY messages_select_own ON public.messages
    FOR SELECT USING (
        sender_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = messages.booking_id
            AND (bookings.user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin')))
        )
    );

-- Politiques pour content_overrides
CREATE POLICY content_overrides_select_all ON public.content_overrides
    FOR SELECT USING (true);

CREATE POLICY content_overrides_insert_admin ON public.content_overrides
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );

CREATE POLICY content_overrides_update_admin ON public.content_overrides
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );

CREATE POLICY content_overrides_delete_admin ON public.content_overrides
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );

-- Politiques pour l'historique des overrides
CREATE POLICY content_override_history_select_all ON public.content_override_history
    FOR SELECT USING (true);

CREATE POLICY content_override_history_insert_admin ON public.content_override_history
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );
-- Politiques pour media_overrides
CREATE POLICY media_overrides_select_all ON public.media_overrides
    FOR SELECT USING (true);

CREATE POLICY media_overrides_insert_admin ON public.media_overrides
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );

CREATE POLICY media_overrides_update_admin ON public.media_overrides
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );

CREATE POLICY media_overrides_delete_admin ON public.media_overrides
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );

CREATE POLICY media_override_history_select_all ON public.media_override_history
    FOR SELECT USING (true);

CREATE POLICY media_override_history_insert_admin ON public.media_override_history
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
    );
-- =====================================================
-- DONNÉES INITIALES
-- =====================================================

-- Insertion des forfaits de mariage
INSERT INTO public.packages (package_id, name_fr, name_en, description_fr, description_en, base_price, max_guests) VALUES
('classic', 'Élégance Classique', 'Classic Elegance', 'Notre forfait essentiel pour une journée magnifique et mémorable.', 'Our essential package for a beautiful and memorable day.', 15000.00, 100),
('premium', 'Romance Premium', 'Premium Romance', 'Une expérience améliorée avec des services et des détails haut de gamme.', 'An enhanced experience with premium services and details.', 25000.00, 150),
('luxury', 'Rêve de Luxe', 'Luxury Dream', 'Le forfait tout compris ultime pour un mariage vraiment magique.', 'The ultimate all-inclusive package for a truly magical wedding.', 40000.00, 200)
ON CONFLICT (package_id) DO NOTHING;

-- Récupérer les IDs des forfaits pour les caractéristiques
DO $$
DECLARE
    classic_id UUID;
    premium_id UUID;
    luxury_id UUID;
BEGIN
    SELECT id INTO classic_id FROM public.packages WHERE package_id = 'classic';
    SELECT id INTO premium_id FROM public.packages WHERE package_id = 'premium';
    SELECT id INTO luxury_id FROM public.packages WHERE package_id = 'luxury';

    -- Caractéristiques Classic
    INSERT INTO public.package_features (package_id, feature_fr, feature_en, display_order) VALUES
    (classic_id, 'Location du lieu pour 8 heures', 'Venue rental for 8 hours', 1),
    (classic_id, 'Places assises pour 100 invités', 'Seating for up to 100 guests', 2),
    (classic_id, 'Arrangements floraux standards', 'Standard floral arrangements', 3),
    (classic_id, 'Menu dîner trois services', 'Three-course dinner menu', 4)
    ON CONFLICT DO NOTHING;

    -- Caractéristiques Premium
    INSERT INTO public.package_features (package_id, feature_fr, feature_en, display_order) VALUES
    (premium_id, 'Location du lieu pour la journée complète', 'Full-day venue rental', 1),
    (premium_id, 'Places assises pour 150 invités', 'Seating for up to 150 guests', 2),
    (premium_id, 'Conception florale personnalisée', 'Custom floral design', 3),
    (premium_id, 'Dîner cinq services et cocktail', 'Five-course dinner & cocktail hour', 4),
    (premium_id, 'Quatuor à cordes pour la cérémonie', 'Live string quartet for ceremony', 5)
    ON CONFLICT DO NOTHING;

    -- Caractéristiques Luxury
    INSERT INTO public.package_features (package_id, feature_fr, feature_en, display_order) VALUES
    (luxury_id, 'Accès au lieu pour le week-end', 'Weekend venue access', 1),
    (luxury_id, 'Places assises pour 200 invités', 'Seating for up to 200 guests', 2),
    (luxury_id, 'Installations florales de designer', 'Designer floral installations', 3),
    (luxury_id, 'Menu dégustation gastronomique et bar ouvert', 'Gourmet tasting menu & open bar', 4),
    (luxury_id, 'Service complet de planification de mariage', 'Full wedding planning service', 5),
    (luxury_id, 'Feu d''artifice', 'Fireworks display', 6)
    ON CONFLICT DO NOTHING;
END $$;

-- Insertion des options supplémentaires
INSERT INTO public.addons (addon_id, name_fr, name_en, description_fr, description_en, price, is_active) VALUES
('rolls', 'Rolls-Royce avec chauffeur', 'Rolls-Royce with Chauffeur', 'La Rolls-Royce Silver Cloud de 1957 pour les mariés', 'The 1957 Rolls-Royce Silver Cloud for the bride and groom', 800.00, TRUE),
('lanterns', 'Lanternes', 'Lanterns', 'Lanternes en fer forgé de 1,20 m de hauteur', 'Wrought iron lanterns 1.20 m high', 500.00, TRUE),
('chairs', 'Chaises Napoléon III Outdoor', 'Outdoor Napoleon III Chairs', 'Chaises blanches pour cérémonie extérieure', 'White chairs for outdoor ceremony', 300.00, TRUE),
('bbq', 'Barbecue Ofyr', 'Ofyr BBQ', 'Barbecue Ofyr, brasero et plancha', 'Ofyr barbecue, brazier and plancha', 400.00, TRUE),
('flowers', 'Bar à Fleurs', 'Flower Bar', 'Animation bijoux fleurs sur-mesure', 'Custom flower jewelry animation', 600.00, TRUE),
('balloon', 'Vols en Montgolfière', 'Hot Air Balloon Flights', 'Vol captif en montgolfière', 'Captive hot air balloon flight', 1200.00, TRUE)
ON CONFLICT (addon_id) DO NOTHING;

-- Insertion des hébergements
INSERT INTO public.accommodations (room_id, name_fr, name_en, type_fr, type_en, capacity, surface, price_per_night, description_fr, description_en, is_available, has_online_booking) VALUES
('heures_du_jour', 'Les Heures du Jour', 'Les Heures du Jour', 'Duplex, jusqu''à 4 personnes', 'Duplex, up to 4 people', 4, '32 m²', 180.00, 'Suite familiale sur 2 niveaux', 'Family suite on 2 levels', TRUE, FALSE),
('ruines_antiques', 'Ruines Antiques', 'Ruines Antiques', 'Duplex, jusqu''à 4 personnes', 'Duplex, up to 4 people', 4, '32 m²', 180.00, 'Suite familiale ambiance Italie antique', 'Family suite with ancient Italy atmosphere', TRUE, TRUE),
('jardins_tivoli', 'Les Jardins Tivoli', 'Les Jardins Tivoli', 'Chambre, jusqu''à 3 personnes', 'Room, up to 3 people', 3, '24 m²', 150.00, 'Chambre PMR avec ambiance jardins italiens', 'PMR room with Italian gardens atmosphere', TRUE, FALSE),
('petit_trianon', 'Le Petit Trianon', 'Le Petit Trianon', 'Chambre, 2 personnes', 'Room, 2 people', 2, '16 m²', 120.00, 'Chambre double Hameau de la Reine', 'Double room Queen''s Hamlet', TRUE, TRUE),
('voyage_ballon', 'Voyage en Ballon', 'Voyage en Ballon', 'Chambre, 2 personnes', 'Room, 2 people', 2, '13 m²', 110.00, 'Chambre thème montgolfières', 'Hot air balloon themed room', TRUE, TRUE),
('la_loge', 'La Loge', 'La Loge', 'Guest House, 6 personnes', 'Guest House, 6 people', 6, '32 m²', 250.00, 'Guesthouse pour 6 personnes', 'Guesthouse for 6 people', TRUE, FALSE)
ON CONFLICT (room_id) DO NOTHING;

-- Création d'un utilisateur admin par défaut
INSERT INTO public.users (email, name, phone, role, password_hash) VALUES
('admin@manoirdevacheresses.com', 'Administrateur', '0611842021', 'admin', crypt('Admin2024!', gen_salt('bf')))
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- VUES UTILES POUR LE BACKOFFICE
-- =====================================================

-- Vue pour le résumé des réservations
CREATE OR REPLACE VIEW booking_summary AS
SELECT
    b.id,
    b.booking_reference,
    b.event_date,
    b.status,
    b.guest_count,
    b.total_amount,
    u.name AS client_name,
    u.email AS client_email,
    u.phone AS client_phone,
    p.name_fr AS package_name,
    COUNT(DISTINCT c.id) AS contract_count,
    COUNT(DISTINCT pay.id) FILTER (WHERE pay.status = 'paid') AS paid_payments,
    COUNT(DISTINCT pay.id) AS total_payments,
    b.created_at
FROM public.bookings b
LEFT JOIN public.users u ON b.user_id = u.id
LEFT JOIN public.packages p ON b.package_id = p.id
LEFT JOIN public.contracts c ON b.id = c.booking_id
LEFT JOIN public.payments pay ON b.id = pay.booking_id
GROUP BY b.id, u.name, u.email, u.phone, p.name_fr;

-- Vue pour les statistiques du dashboard
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM public.bookings WHERE status = 'booked' OR status = 'confirmed') AS upcoming_weddings,
    (SELECT COUNT(*) FROM public.bookings WHERE status = 'inquiry' AND created_at > NOW() - INTERVAL '30 days') AS new_inquiries,
    (SELECT COALESCE(SUM(total_amount), 0) FROM public.bookings WHERE status IN ('booked', 'confirmed', 'completed') AND EXTRACT(YEAR FROM event_date) = EXTRACT(YEAR FROM NOW())) AS total_revenue_year,
    (SELECT COUNT(*) FROM public.messages WHERE is_read = FALSE) AS unread_messages;

-- Vue pour le calendrier d'occupation
CREATE OR REPLACE VIEW calendar_occupancy AS
SELECT
    ac.date,
    ac.is_available,
    b.booking_reference,
    b.guest_count,
    u.name AS client_name,
    p.name_fr AS package_name
FROM public.availability_calendar ac
LEFT JOIN public.bookings b ON ac.booking_id = b.id
LEFT JOIN public.users u ON b.user_id = u.id
LEFT JOIN public.packages p ON b.package_id = p.id
WHERE ac.date >= CURRENT_DATE
ORDER BY ac.date;

-- =====================================================
-- INDEX POUR OPTIMISER LES PERFORMANCES
-- =====================================================

CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_event_date ON public.bookings(event_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_reference ON public.bookings(booking_reference);

CREATE INDEX idx_contracts_booking_id ON public.contracts(booking_id);
CREATE INDEX idx_contracts_status ON public.contracts(status);

CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_due_date ON public.payments(due_date);

CREATE INDEX idx_messages_booking_id ON public.messages(booking_id);
CREATE INDEX idx_messages_is_read ON public.messages(is_read);

CREATE INDEX idx_availability_date ON public.availability_calendar(date);

CREATE INDEX idx_accommodation_bookings_dates ON public.accommodation_bookings(check_in_date, check_out_date);

-- =====================================================
-- COMMENTAIRES SUR LES TABLES
-- =====================================================

COMMENT ON TABLE public.users IS 'Table des utilisateurs du système (clients et administrateurs)';
COMMENT ON TABLE public.packages IS 'Forfaits de mariage proposés';
COMMENT ON TABLE public.bookings IS 'Réservations de mariages';
COMMENT ON TABLE public.accommodations IS 'Chambres et hébergements disponibles';
COMMENT ON TABLE public.contracts IS 'Contrats associés aux réservations';
COMMENT ON TABLE public.payments IS 'Paiements et échéanciers';
COMMENT ON TABLE public.messages IS 'Messages entre clients et administrateurs';
COMMENT ON TABLE public.availability_calendar IS 'Calendrier de disponibilité du domaine';

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================

-- Pour vérifier que tout s'est bien passé
SELECT 'Installation terminée avec succès!' AS message;
