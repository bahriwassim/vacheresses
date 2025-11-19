-- =====================================================
-- SCRIPT D'INSERTION DES DONNÉES DE TEST (USA)
-- =====================================================

-- Insérer des utilisateurs de test (USA)
INSERT INTO public.users (id, email, name, phone, role, password_hash, created_at) VALUES
('a1b2c3d4-e5f6-7890-abcd-1234567890ab', 'john.smith@gmail.com', 'John Smith', '+1 555 123 4567', 'client', crypt('password123', gen_salt('bf')), '2024-01-15 10:30:00+00'),
('b2c3d4e5-f678-9012-bcde-234567890abc', 'emily.johnson@yahoo.com', 'Emily Johnson', '+1 555 234 5678', 'client', crypt('password123', gen_salt('bf')), '2024-02-20 14:15:00+00'),
('c3d4e5f6-7890-1234-cdef-34567890abcd', 'michael.brown@outlook.com', 'Michael Brown', '+1 555 345 6789', 'client', crypt('password123', gen_salt('bf')), '2024-03-10 09:45:00+00'),
('d4e5f6a7-8901-2345-def0-4567890abcde', 'sarah.davis@gmail.com', 'Sarah Davis', '+1 555 456 7890', 'client', crypt('password123', gen_salt('bf')), '2024-04-05 16:20:00+00'),
('e5f6a7b8-9012-3456-ef01-567890abcdef', 'admin@vacheresses.com', 'Administrator', '+33 6 11 84 20 21', 'admin', crypt('admin123', gen_salt('bf')), '2023-12-01 08:00:00+00')
ON CONFLICT (id) DO NOTHING;

-- Insérer des forfaits de mariage
INSERT INTO public.packages (id, package_id, name_fr, name_en, description_fr, description_en, base_price, max_guests, created_at) VALUES
('f6a7b8c9-0123-4567-f012-67890abcdef1', 'classic', 'Forfait Classique', 'Classic Package', 'Le forfait idéal pour un mariage intime et élégant', 'The ideal package for an intimate and elegant wedding', 8500.00, 80, NOW()),
('a7b8c9d0-1234-5678-0123-7890abcdef12', 'premium', 'Forfait Premium', 'Premium Package', 'Un mariage somptueux avec tous les services inclus', 'A sumptuous wedding with all services included', 12500.00, 120, NOW()),
('b8c9d0e1-2345-6789-1234-890abcdef123', 'luxury', 'Forfait Luxe', 'Luxury Package', 'L''expérience ultime pour un mariage inoubliable', 'The ultimate experience for an unforgettable wedding', 18000.00, 150, NOW())
ON CONFLICT (package_id) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  name_en = EXCLUDED.name_en,
  description_fr = EXCLUDED.description_fr,
  description_en = EXCLUDED.description_en,
  base_price = EXCLUDED.base_price,
  max_guests = EXCLUDED.max_guests;

-- Insérer des chambres/hébergements
INSERT INTO public.rooms (id, room_id, name_fr, name_en, description_fr, description_en, capacity, price_per_night, created_at) VALUES
('c9d0e1f2-3456-7890-2345-90abcdef1234', 'heures_du_jour', 'Les Heures du Jour', 'Les Heures du Jour', 'Suite familiale sur 2 niveaux', 'Family suite on 2 levels', 4, 180.00, NOW()),
('d0e1f2a3-4567-8901-3456-0abcdef12345', 'ruines_antiques', 'Ruines Antiques', 'Ruines Antiques', 'Suite familiale ambiance Italie antique', 'Family suite with ancient Italy atmosphere', 4, 180.00, NOW()),
('e1f2a3b4-5678-9012-4567-abcdef123456', 'jardins_tivoli', 'Les Jardins Tivoli', 'Les Jardins Tivoli', 'Chambre accessible PMR', 'Wheelchair accessible room', 3, 150.00, NOW()),
('f2a3b4c5-6789-0123-5678-bcdef1234567', 'petit_trianon', 'Le Petit Trianon', 'Le Petit Trianon', 'Chambre double romantique', 'Romantic double room', 2, 120.00, NOW()),
('a3b4c5d6-7890-1234-6789-cdef12345678', 'la_loge', 'La Loge', 'La Loge', 'Maison d''hôtes pour 6 personnes', 'Guest house for 6 people', 6, 250.00, NOW())
ON CONFLICT (room_id) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  name_en = EXCLUDED.name_en,
  description_fr = EXCLUDED.description_fr,
  description_en = EXCLUDED.description_en,
  capacity = EXCLUDED.capacity,
  price_per_night = EXCLUDED.price_per_night;

-- Insérer des réservations de MARIAGE (type: wedding)
INSERT INTO public.bookings (id, user_id, package_id, room_id, booking_type, start_date, end_date, guests_count, status, total_price, special_requests, created_at) VALUES
-- Mariage confirmé de John Smith
('1a2b3c4d-5678-9012-3456-789012345678', 'a1b2c3d4-e5f6-7890-abcd-1234567890ab', 'a7b8c9d0-1234-5678-0123-7890abcdef12', NULL, 'wedding', '2025-06-15', '2025-06-17', 100, 'confirmed', 12500.00, 'Vegetarian menu for 15 guests, live jazz band preferred', '2024-11-01 10:00:00+00'),

-- Mariage en attente d'Emily Johnson
('2b3c4d5e-6789-0123-4567-890123456789', 'b2c3d4e5-f678-9012-bcde-234567890abc', 'b8c9d0e1-2345-6789-1234-890abcdef123', NULL, 'wedding', '2025-09-20', '2025-09-22', 120, 'pending', 18000.00, 'Outdoor ceremony if weather permits, champagne reception', '2024-11-10 14:30:00+00'),

-- Mariage complété de Sarah Davis (passé)
('3c4d5e6f-7890-1234-5678-901234567890', 'd4e5f6a7-8901-2345-def0-4567890abcde', 'f6a7b8c9-0123-4567-f012-67890abcdef1', NULL, 'wedding', '2024-10-05', '2024-10-07', 75, 'completed', 8500.00, 'Gluten-free options needed, DJ for evening reception', '2024-08-15 16:00:00+00')
ON CONFLICT (id) DO NOTHING;

-- Insérer des réservations de LOGEMENT (type: stay)
INSERT INTO public.bookings (id, user_id, package_id, room_id, booking_type, start_date, end_date, guests_count, status, total_price, special_requests, created_at) VALUES
-- Séjour confirmé de Michael Brown
('4d5e6f7a-8901-2345-6789-012345678901', 'c3d4e5f6-7890-1234-cdef-34567890abcd', NULL, 'c9d0e1f2-3456-7890-2345-90abcdef1234', 'stay', '2025-03-20', '2025-03-23', 4, 'confirmed', 540.00, 'Early check-in requested, crib needed for infant', '2024-11-05 09:15:00+00'),

-- Séjour en attente d'Emily Johnson
('5e6f7a8b-9012-3456-7890-123456789012', 'b2c3d4e5-f678-9012-bcde-234567890abc', NULL, 'e1f2a3b4-5678-9012-4567-abcdef123456', 'stay', '2025-04-10', '2025-04-12', 2, 'pending', 300.00, 'Wheelchair accessible room needed, quiet location preferred', '2024-11-12 11:45:00+00'),

-- Séjour complété de John Smith (passé)
('6f7a8b9c-0123-4567-8901-234567890123', 'a1b2c3d4-e5f6-7890-abcd-1234567890ab', NULL, 'f2a3b4c5-6789-0123-5678-bcdef1234567', 'stay', '2024-08-15', '2024-08-18', 2, 'completed', 360.00, 'Anniversary celebration, champagne in room appreciated', '2024-07-20 13:20:00+00'),

-- Séjour confirmé de Sarah Davis
('7a8b9c0d-1234-5678-9012-345678901234', 'd4e5f6a7-8901-2345-def0-4567890abcde', NULL, 'a3b4c5d6-7890-1234-6789-cdef12345678', 'stay', '2025-07-01', '2025-07-05', 6, 'confirmed', 1000.00, 'Family reunion, kitchen access essential, children friendly', '2024-11-08 15:50:00+00'),

-- Séjour annulé de Michael Brown
('8b9c0d1e-2345-6789-0123-456789012345', 'c3d4e5f6-7890-1234-cdef-34567890abcd', NULL, 'd0e1f2a3-4567-8901-3456-0abcdef12345', 'stay', '2025-05-10', '2025-05-13', 4, 'cancelled', 540.00, 'Cancelled due to schedule conflict', '2024-10-25 10:30:00+00')
ON CONFLICT (id) DO NOTHING;

-- Message de confirmation
DO $$
BEGIN
    RAISE NOTICE 'Données de test (USA) insérées avec succès!';
    RAISE NOTICE '5 utilisateurs créés (4 clients + 1 admin)';
    RAISE NOTICE '3 forfaits de mariage créés';
    RAISE NOTICE '5 chambres/hébergements créés';
    RAISE NOTICE '3 réservations de mariage (1 confirmée, 1 en attente, 1 complétée)';
    RAISE NOTICE '5 réservations de logement (2 confirmées, 1 en attente, 1 complétée, 1 annulée)';
    RAISE NOTICE '';
    RAISE NOTICE 'Comptes de test:';
    RAISE NOTICE '- john.smith@gmail.com / password123';
    RAISE NOTICE '- emily.johnson@yahoo.com / password123';
    RAISE NOTICE '- michael.brown@outlook.com / password123';
    RAISE NOTICE '- sarah.davis@gmail.com / password123';
    RAISE NOTICE '- admin@vacheresses.com / admin123 (ADMIN)';
END $$;
