'use client';

import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CLIENT ---

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = 
    supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
const mediaBucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || 'site-media';

// --- AUTHENTICATION SERVICE ---

export const authService = {
  // Inscription
  async signUp(email: string, password: string, name: string, phone?: string) {
    if (!supabase) throw new Error("Supabase non configuré");
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          role: 'client', // Par défaut
        },
      },
    });

    if (error) throw error;
    
    // Le trigger SQL s'occupera de créer l'entrée dans public.users
    return { user: data.user, session: data.session };
  },

  // Connexion
  async signIn(email: string, password: string) {
    if (!supabase) throw new Error("Supabase non configuré");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    // Récupérer le profil complet depuis public.users
    if (data.user) {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      // Stocker le profil dans le localStorage pour l'accès rapide (legacy support)
      if (profile) {
        localStorage.setItem('user', JSON.stringify(profile));
      }
      
      return { user: data.user, session: data.session, profile };
    }

    return { user: data.user, session: data.session, profile: null };
  },

  // Déconnexion
  async signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    localStorage.removeItem('user');
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    if (!supabase) return { user: null, profile: null };
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { user: null, profile: null };
    }

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return { user, profile };
  },
  
  // Mettre à jour le profil utilisateur
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    if (!supabase) throw new Error("Supabase non configuré");
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    
    // Mettre à jour le localStorage si c'est l'utilisateur courant
    const currentUser = await authService.getCurrentUser();
    if (currentUser.user?.id === userId) {
      localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
  },
};

// Types pour la base de données
export type UserProfile = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'client' | 'admin' | 'super_admin';
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

function setNestedValue(obj: any, path: string[], val: any) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    if (typeof cur[k] !== 'object' || cur[k] === null || Array.isArray(cur[k])) {
      cur[k] = {};
    }
    cur = cur[k];
  }
  cur[path[path.length - 1]] = val;
  return obj;
}

export async function loadTextOverrides(locale: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('content_overrides')
    .select('path, locale, content')
    .eq('locale', locale);
  if (error) return null;
  if (!data || !Array.isArray(data)) return null;
  const root: any = {};
  for (const row of data as any[]) {
    setNestedValue(root, String(row.path).split('.'), String(row.content));
  }
  return root;
}

export async function saveTextOverride(path: string, locale: string, content: string) {
  let remoteSaved = false;
  if (supabase) {
    let created_by: string | undefined = undefined;
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      const u = raw ? JSON.parse(raw) : null;
      created_by = u?.id;
    } catch {}
    try {
      const { error } = await supabase
        .from('content_overrides')
        .upsert({ path, locale, content, created_by });
      if (!error) remoteSaved = true;
    } catch {}
  }
  if (!remoteSaved) {
    try {
      await fetch('/api/overrides/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, locale, content }),
      });
    } catch {}
  }
  try {
    const raw = localStorage.getItem('textOverrides');
    const overrides = raw ? JSON.parse(raw) : {};
    const localeObj = overrides[locale] || {};
    setNestedValue(localeObj, path.split('.'), content);
    overrides[locale] = localeObj;
    localStorage.setItem('textOverrides', JSON.stringify(overrides));
  } catch {}
  try {
    window.dispatchEvent(new Event('textOverridesUpdated'));
  } catch {}
}

export function subscribeTextOverrides(locale: string, onChange: () => void) {
  if (!supabase) return null;
  const channel = supabase
    .channel('content_overrides_' + locale)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'content_overrides', filter: `locale=eq.${locale}` },
      () => {
        onChange();
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

export function getLocalOverride(locale: string, path: string): string | null {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('textOverrides') : null;
    const overrides = raw ? JSON.parse(raw) : null;
    let cur = overrides && overrides[locale] ? overrides[locale] : null;
    for (const k of path.split('.')) {
      if (!cur || typeof cur !== 'object') return null;
      cur = cur[k];
    }
    return typeof cur === 'string' ? cur : null;
  } catch {
    return null;
  }
}

export async function loadMediaOverridesByPath() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('media_overrides')
    .select('path, url, media_type');
  if (error) return null;
  if (!data || !Array.isArray(data)) return null;
  const imageMap: Record<string, string> = {};
  let videoId: string | null = null;
  for (const row of data as any[]) {
    const p = String(row.path);
    const u = String(row.url);
    const mt = String(row.media_type);
    if (mt === 'image') {
      imageMap[p] = u;
    } else if (mt === 'video' && p === 'videoId') {
      videoId = u;
    }
  }
  try {
    localStorage.setItem('imageOverridesByPath', JSON.stringify(imageMap));
    localStorage.setItem('imageOverridesById', JSON.stringify(imageMap));
    if (videoId) localStorage.setItem('videoId', JSON.stringify(videoId));
  } catch {}
  return { images: imageMap, videoId };
}

export async function getMediaOverride(path: string): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('media_overrides')
    .select('url')
    .eq('path', path)
    .single();
  if (error) return null;
  return (data as any)?.url ? String((data as any).url) : null;
}

export async function setMediaOverride(path: string, mediaType: 'image' | 'video', url: string) {
  if (!supabase) return;
  let created_by: string | undefined = undefined;
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const u = raw ? JSON.parse(raw) : null;
    created_by = u?.id;
  } catch {}
  await supabase
    .from('media_overrides')
    .upsert({ path, media_type: mediaType, url, created_by });
  if (mediaType === 'image') {
    try {
      const raw = localStorage.getItem('imageOverridesByPath');
      const map = raw ? JSON.parse(raw) : {};
      map[path] = url;
      localStorage.setItem('imageOverridesByPath', JSON.stringify(map));
      localStorage.setItem('imageOverridesById', JSON.stringify(map));
    } catch {}
  } else if (mediaType === 'video' && path === 'videoId') {
    try {
      localStorage.setItem('videoId', JSON.stringify(url));
    } catch {}
  }
}

export async function uploadAndOverrideMedia(path: string, mediaType: 'image' | 'video', file: File) {
  // Try client-side upload first; if it fails (due to RLS), fallback to server API
  if (supabase) {
    try {
      const ext = (file.name.split('.').pop() || (mediaType === 'image' ? 'jpg' : 'mp4')).toLowerCase();
      const folder = mediaType === 'image' ? 'images' : 'videos';
      const key = `${folder}/${path}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from(mediaBucket).upload(key, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from(mediaBucket).getPublicUrl(key);
      const url = pub.publicUrl;
      await setMediaOverride(path, mediaType, url);
      return url;
    } catch {}
  }
  const form = new FormData();
  form.append('path', path);
  form.append('mediaType', mediaType);
  form.append('file', file);
  const res = await fetch('/api/overrides/media', { method: 'POST', body: form });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.ok || !json?.url) {
    throw new Error(String(json?.error || 'Upload failed'));
  }
  const url = String(json.url);
  await setMediaOverride(path, mediaType, url);
  return url;
}
