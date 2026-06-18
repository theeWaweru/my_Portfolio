// app/lib/supabase/projects.js
// Functions for interacting with the projects table in Supabase

import supabase from "./client";

/**
 * Get all projects from the database
 */
export async function getProjects() {
  if (!supabase) return { data: [], error: "Supabase not configured" };
  try {
    const { error: tableError } = await supabase
      .from("projects")
      .select("count")
      .limit(1);

    if (tableError) {
      console.error("Table check error:", tableError);
      if (tableError.code === "PGRST116") {
        return { data: [], error: "The 'projects' table doesn't exist." };
      } else if (tableError.code === "42P01") {
        return { data: [], error: "Relation 'projects' does not exist." };
      } else {
        return { data: [], error: `Database error: ${tableError.message}` };
      }
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { data: [], error: error.message };
  }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id) {
  if (!supabase) return { data: null, error: "Supabase not configured" };
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    return { data: null, error: error.message };
  }
}

/**
 * Create a new project
 */
export async function createProject(projectData) {
  if (!supabase) return { data: null, error: "Supabase not configured" };
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error creating project:", error);
    return { data: null, error: error.message };
  }
}

/**
 * Update an existing project
 */
export async function updateProject(id, projectData) {
  if (!supabase) return { data: null, error: "Supabase not configured" };
  try {
    const { data, error } = await supabase
      .from("projects")
      .update(projectData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    return { data: null, error: error.message };
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id) {
  if (!supabase) return { error: "Supabase not configured" };
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    return { error: error.message };
  }
}

/**
 * Get only featured, published projects (for the homepage slider)
 */
export async function getFeaturedProjects() {
  if (!supabase) return { data: [], error: "Supabase not configured" };
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return { data: [], error: error.message };
  }
}
