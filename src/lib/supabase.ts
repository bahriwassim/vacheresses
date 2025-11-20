'use client';

import { createClient, User as SupabaseUser } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize supabase client only if the URL and key are provided
export const supabase = 
    supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Types pour la base de données
export type UserProfile = {
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
    if (!supabase) throw new Error("Supabase is not configured.");
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("User not created");

    // Créer le profil utilisateur dans la table users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
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
    if (!supabase) throw new Error("Supabase is not configured.");
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("User not found");

    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();
    
    if (profileError) throw profileError;

    return { user: authData.user, profile };
  },

  // Déconnexion
  async signOut() {
    if (!supabase) throw new Error("Supabase is not configured.");
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    if (!supabase) throw new Error("Supabase is not configured.");
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) return { user: null, profile: null };

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
      
    return { user, profile: profile || null };
  },
  
  // Mettre à jour le profil utilisateur
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    if (!supabase) throw new Error("Supabase is not configured.");
    
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
