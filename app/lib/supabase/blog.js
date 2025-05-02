// app/lib/supabase/blog.js

import supabase from "./client";

// Get all blog posts
export async function getBlogPosts() {
  if (!supabase) return { data: [], error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { data: [], error: error.message };
  }
}

// Get a single blog post by ID
export async function getBlogPostById(id) {
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    return { data: null, error: error.message };
  }
}

// Create a new blog post
export async function createBlogPost(postData) {
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([postData])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { data: null, error: error.message };
  }
}

// Update an existing blog post
export async function updateBlogPost(id, postData) {
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(postData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error updating blog post with ID ${id}:`, error);
    return { data: null, error: error.message };
  }
}

// Delete a blog post
export async function deleteBlogPost(id) {
  if (!supabase) return { error: "Supabase not configured" };

  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error(`Error deleting blog post with ID ${id}:`, error);
    return { error: error.message };
  }
}
