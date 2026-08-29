import { createClient, SupabaseClient } from "@supabase/supabase-js";

const DEFAULT_URL = "https://itzdzdkcfezvaxweilwy.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0emR6ZGtjZmV6dmF4d2VpbHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5OTQ1OTIsImV4cCI6MjEwMzU3MDU5Mn0.1mM_X5i0-DMMWz-iVC0-lZyElGYBoLE6C31SZwtdKdc";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  DEFAULT_URL;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  DEFAULT_ANON_KEY;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

export default supabase;
