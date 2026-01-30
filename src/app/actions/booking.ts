'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;

function generateBookingReference() {
  return 'VAC' + Math.floor(Math.random() * 999999).toString().padStart(6, '0');
}

export async function createBooking(payload: any) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing Supabase configuration for server-side operations. Check SUPABASE_SERVICE_ROLE_KEY in .env");
    return { error: "Configuration serveur manquante (clé API). Veuillez contacter l'administrateur." };
  }

  // Debug: Log key usage (first 10 chars)
  console.log("Using Supabase Key starting with:", supabaseServiceRoleKey.substring(0, 10), "Length:", supabaseServiceRoleKey.length);

  // Parse JWT to check role
  try {
      const parts = supabaseServiceRoleKey.split('.');
      if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
          console.log("Key Role:", payload.role);
          
          // if (supabaseServiceRoleKey.length < 220) {
          //    console.warn("WARNING: Key length (" + supabaseServiceRoleKey.length + ") is shorter than expected (~220). It might be truncated.");
          // }

          if (payload.role !== 'service_role') {
              console.error("CRITICAL: The configured SUPABASE_SERVICE_ROLE_KEY has role '" + payload.role + "'. It MUST be 'service_role' to bypass RLS.");
              return { error: "Configuration serveur incorrecte : La clé API n'est pas une clé 'service_role'. Vérifiez votre fichier .env." };
          }
      }
  } catch (e) {
      console.error("Error parsing key JWT:", e);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });

  try {
    // Force using the service role by explicitly not setting any session
    // The client is already initialized with service role key, so it should be admin.
    
    console.log("Attempting to insert booking with service role...");

    // Ensure booking_reference is present
    if (!payload.booking_reference) {
        payload.booking_reference = generateBookingReference();
    }

    console.log("Final payload before insert:", JSON.stringify(payload, null, 2));
    
    // Test admin access (optional, can be removed in production)
    // const { error: userError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 });
    // if (userError) {
    //    console.error("Service role key verification failed:", userError);
    //    return { error: "Clé 'service_role' invalide ou permissions insuffisantes." };
    // }

    const { data, error } = await supabase
      .from('bookings')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Server-side booking error code:", error.code);
      console.error("Server-side booking error details:", error.details);
      console.error("Server-side booking error message:", error.message);
      console.error("Server-side booking error hint:", error.hint);
      
      if (error.code === '42501') {
          return { error: "Erreur de permission (42501). Veuillez exécuter le script 'supabase/fix_rls.sql' dans votre tableau de bord Supabase." };
      }
      return { error: `Erreur (${error.code}): ${error.message}` };
    }

    return { data };
  } catch (err: any) {
    console.error("Unexpected booking error:", err);
    return { error: err.message || "Une erreur inattendue est survenue." };
  }
}
