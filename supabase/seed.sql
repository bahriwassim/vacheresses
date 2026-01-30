-- Seed Data for Packages
-- Correction: Utilisation de ON CONFLICT (package_id) pour éviter les doublons
INSERT INTO public.packages (id, package_id, name_fr, name_en, description_fr, description_en, base_price, max_guests)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'classic', 'Forfait Classique', 'Classic Package', 'Une célébration intime et élégante.', 'An intimate and elegant celebration.', 15000, 100),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'premium', 'Forfait Premium', 'Premium Package', 'L''expérience complète du Manoir.', 'The complete Manor experience.', 25000, 200),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'luxury', 'Forfait Luxe', 'Luxury Package', 'Le summum du raffinement pour votre grand jour.', 'The ultimate refinement for your big day.', 40000, 300)
ON CONFLICT (package_id) DO UPDATE SET
    base_price = EXCLUDED.base_price,
    name_fr = EXCLUDED.name_fr,
    name_en = EXCLUDED.name_en,
    description_fr = EXCLUDED.description_fr,
    description_en = EXCLUDED.description_en,
    max_guests = EXCLUDED.max_guests;

-- Seed Data for Addons
-- Correction: Utilisation de ON CONFLICT (addon_id)
INSERT INTO public.addons (id, addon_id, name_fr, name_en, price, is_active)
VALUES 
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'rolls', 'Rolls Royce avec Chauffeur', 'Rolls Royce with Driver', 500, true),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'lanterns', 'Lâcher de Lanternes', 'Lantern Release', 300, true),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'chairs', 'Chaises Chiavari', 'Chiavari Chairs', 800, true),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'bbq', 'BBQ Lendemain de fête', 'Next Day BBQ', 1200, true),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'flowers', 'Décoration Florale Extra', 'Extra Floral Decoration', 1500, true),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'balloon', 'Montgolfière', 'Hot Air Balloon', 2500, true)
ON CONFLICT (addon_id) DO UPDATE SET
    price = EXCLUDED.price,
    name_fr = EXCLUDED.name_fr,
    name_en = EXCLUDED.name_en,
    is_active = EXCLUDED.is_active;

-- Ensure Trigger exists (re-runnable)
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
