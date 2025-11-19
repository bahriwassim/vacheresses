import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  package_id?: string;
  room_id?: string;
  booking_type: 'wedding' | 'stay' | 'event';
  start_date: string;
  end_date: string;
  guests_count: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  special_requests?: string;
  created_at: string;
  updated_at: string;
};

// Fonctions d'authentification
export const authService = {
  // Inscription
  async signUp(email: string, password: string, name: string, phone?: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Créer le profil utilisateur dans la table users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id,
          email,
          name,
          phone,
          role: 'client',
        },
      ])
      .select()
      .single();

    if (userError) throw userError;

    return { user: authData.user, profile: userData };
  },

  // Connexion
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Récupérer le profil utilisateur
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return { user: data.user, profile };
  },

  // Déconnexion
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return { user, profile };
  },

  // Mettre à jour le profil
  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Fonctions de gestion des réservations
export const bookingService = {
  // Récupérer les réservations d'un utilisateur
  async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        packages(name_fr, name_en),
        rooms(name_fr, name_en)
      `)
      .eq('user_id', userId)
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Créer une réservation
  async createBooking(booking: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour une réservation
  async updateBooking(bookingId: string, updates: Partial<Booking>) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Annuler une réservation
  async cancelBooking(bookingId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};