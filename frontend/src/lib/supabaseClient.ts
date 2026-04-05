/**
 * lib/supabaseClient.ts
 * ─────────────────────
 * Singleton Supabase client for the frontend.
 * Uses the public anon key — all queries are governed by Row Level Security.
 *
 * FIX F5 / F10: Creates the Supabase client that was completely missing.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Copy frontend/.env.example to frontend/.env and fill in the values.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Persist session in localStorage across page reloads
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
