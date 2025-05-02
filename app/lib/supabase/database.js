// app/lib/supabase/database.js

import supabase, { handleSupabaseError } from "./client";

/**
 * Projects-related database functions
 */

// Fetch all projects
export const fetchProjects = async (category = null) => {
  try {
    let query = supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (category && category !== "All Projects") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Fetch a single project by slug/id
export const fetchProjectBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", slug)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Fetch featured projects
export const fetchFeaturedProjects = async (limit = 4) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Get all project categories
export const fetchProjectCategories = async () => {
  try {
    const { data, error } = await supabase.from("projects").select("category");

    if (error) throw error;

    // Extract unique categories
    const categories = [
      "All Projects",
      ...new Set(data.map((item) => item.category)),
    ];

    return { data: categories, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Blog-related database functions
 */

// Fetch all blog posts
export const fetchBlogPosts = async (category = null, searchQuery = "") => {
  try {
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("published_date", { ascending: false });

    if (category && category !== "All Posts") {
      query = query.eq("category", category);
    }

    if (searchQuery) {
      query = query.or(
        `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
      );
    }

    const { data, error } = await query;

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Fetch a single blog post by slug/id
export const fetchBlogPostBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", slug)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Fetch featured blog posts
export const fetchFeaturedBlogPosts = async (limit = 3) => {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("featured", true)
      .order("published_date", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Get all blog categories
export const fetchBlogCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("category");

    if (error) throw error;

    // Extract unique categories
    const categories = [
      "All Posts",
      ...new Set(data.map((item) => item.category)),
    ];

    return { data: categories, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Contact-related database functions
 */

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const { data, error } = await supabase.from("contacts").insert([
      {
        name: formData.name,
        email: formData.email,
        inquiry_type: formData.inquiryType,
        message: formData.message,
        referral: formData.referral,
        created_at: new Date(),
      },
    ]);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  try {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          subscribed_at: new Date(),
        },
      ]);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};
