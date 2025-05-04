// app/lib/supabase/client.js

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for the entire app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof supabaseUrl === "string" &&
  typeof supabaseAnonKey === "string" &&
  supabaseUrl.startsWith("https://") &&
  supabaseAnonKey.length > 0;

// Helper function to handle Supabase errors consistently
export const handleSupabaseError = (error) => {
  console.error("Supabase error:", error);

  if (error.code === "PGRST116") {
    return { data: null, error: "No data found" };
  }

  if (error.code === "42P01") {
    return { data: null, error: "Table does not exist" };
  }

  if (error.message && error.message.includes("storage")) {
    return { data: null, error: `Storage error: ${error.message}` };
  }

  return { data: null, error: error.message || "An error occurred" };
};

// Create Supabase client or null if not configured
const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Log configuration status
if (!isSupabaseConfigured) {
  console.warn(
    "Supabase is not properly configured. Check your environment variables."
  );
} else {
  console.log("Supabase client initialized successfully.");
}

export default supabase;
