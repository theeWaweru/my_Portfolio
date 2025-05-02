// app/lib/supabase/client.js

import { createClient } from "@supabase/supabase-js";

/**
 * Initialize and export Supabase client for frontend use
 * This file sets up the Supabase client with the proper environment variables
 */

// Get environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials not found. Make sure you have .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

// Create the Supabase client
const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

// Helper for handling Supabase errors consistently
export const handleSupabaseError = (error) => {
  console.error("Supabase error:", error);

  if (error.message) {
    return {
      error: true,
      message: error.message,
    };
  } else {
    return {
      error: true,
      message: "An unknown error occurred",
    };
  }
};

export default supabase;
