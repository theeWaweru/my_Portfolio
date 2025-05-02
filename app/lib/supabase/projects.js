// app/lib/supabase/projects.js

import supabase from "./client";

// Get all projects
export async function getProjects() {
  if (!supabase) return { data: [], error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { data: [], error: error.message };
  }
}

// Get a single project by ID
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

// Create a new project
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

// Update an existing project
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

// Delete a project
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
