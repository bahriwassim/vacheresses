'use client';

import { createClient, User as SupabaseUser } from '@supabase/supabase-js';

// --- MOCK AUTHENTICATION SERVICE ---

const mockUser = {
  id: 'user-123',
  email: 'alex.jordan@example.com',
  name: 'Alex & Jordan',
  phone: '+123456789',
  role: 'client',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockAdmin = {
  id: 'admin-123',
  email: 'admin@manoirdevacheresses.com',
  name: 'Admin',
  phone: '+987654321',
  role: 'admin',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};


export const authService = {
  // Inscription
  async signUp(email: string, password: string, name: string, phone?: string) {
    console.log("Mock SignUp:", { email, name, phone });
    const newUser = { ...mockUser, email, name, phone };
    return { user: { id: newUser.id, email: newUser.email }, profile: newUser };
  },

  // Connexion
  async signIn(email: string, password: string) {
    console.log("Mock SignIn:", { email });
    if (email.toLowerCase() === 'admin@manoirdevacheresses.com') {
      return { user: { id: mockAdmin.id, email: mockAdmin.email }, profile: mockAdmin };
    }
    const clientUser = { ...mockUser, email };
    return { user: { id: clientUser.id, email: clientUser.email }, profile: clientUser };
  },

  // Déconnexion
  async signOut() {
     console.log("Mock SignOut");
     return Promise.resolve();
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    // This is a simplified mock. In a real app, you'd get this from session/localStorage
    return { user: null, profile: null };
  },
  
  // Mettre à jour le profil utilisateur
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
     console.log("Mock UpdateProfile:", { userId, updates });
     const userToUpdate = userId === mockAdmin.id ? mockAdmin : mockUser;
     const updatedProfile = { ...userToUpdate, ...updates };
     return Promise.resolve(updatedProfile);
  },
};

// --- END OF MOCK ---

// The original Supabase client is kept here but will not be used by the mock service.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
