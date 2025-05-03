// app/lib/supabase/projects.js
// This file contains functions for interacting with the projects table in Supabase

import supabase from "./client";

/**
 * Get all projects from the database
 * @returns {Object} Object containing data and error properties
 */
export async function getProjects() {
  // Check if Supabase client is initialized
  if (!supabase) return { data: [], error: "Supabase not configured" };

  try {
    // Check if the table exists first (helps diagnose issues)
    const { error: tableError } = await supabase
      .from("projects")
      .select("count")
      .limit(1);

    if (tableError) {
      // Log detailed error information for debugging
      console.error("Table check error:", tableError);

      // Return helpful error messages based on the error code
      if (tableError.code === "PGRST116") {
        return {
          data: [],
          error:
            "The 'projects' table doesn't exist. Please create it in your Supabase dashboard.",
        };
      } else if (tableError.code === "42P01") {
        return {
          data: [],
          error:
            "Relation 'projects' does not exist. Please create the table in your Supabase dashboard.",
        };
      } else {
        return {
          data: [],
          error: `Database error: ${tableError.message}`,
        };
      }
    }

    // If table exists, fetch all projects ordered by creation date (newest first)
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    // Handle query error
    if (error) throw error;

    // Return the data with no error
    return { data: data || [], error: null };
  } catch (error) {
    // Log and return any errors that occurred
    console.error("Error fetching projects:", error);
    return { data: [], error: error.message };
  }
}

/**
 * Get a single project by ID
 * @param {string} id - Project ID or slug
 * @returns {Object} Object containing data and error properties
 */
export async function getProjectById(id) {
  // Check if Supabase client is initialized
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    // Query the projects table for a record with the specified ID
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single(); // Return a single object instead of an array

    // Handle query error
    if (error) throw error;

    // Return the data with no error
    return { data, error: null };
  } catch (error) {
    // Log and return any errors that occurred
    console.error(`Error fetching project with ID ${id}:`, error);
    return { data: null, error: error.message };
  }
}

/**
 * Create a new project
 * @param {Object} projectData - Project data to insert
 * @returns {Object} Object containing data and error properties
 */
export async function createProject(projectData) {
  // Check if Supabase client is initialized
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    // Insert the project data into the projects table
    const { data, error } = await supabase
      .from("projects")
      .insert([projectData]) // Insert a single record
      .select() // Return the inserted records
      .single(); // Return a single object instead of an array

    // Handle query error
    if (error) throw error;

    // Return the newly created project with no error
    return { data, error: null };
  } catch (error) {
    // Log and return any errors that occurred
    console.error("Error creating project:", error);
    return { data: null, error: error.message };
  }
}

/**
 * Update an existing project
 * @param {string} id - Project ID to update
 * @param {Object} projectData - Updated project data
 * @returns {Object} Object containing data and error properties
 */
export async function updateProject(id, projectData) {
  // Check if Supabase client is initialized
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    // Update the project with the specified ID
    const { data, error } = await supabase
      .from("projects")
      .update(projectData) // Update with new data
      .eq("id", id) // Where id equals the provided id
      .select() // Return the updated records
      .single(); // Return a single object instead of an array

    // Handle query error
    if (error) throw error;

    // Return the updated project with no error
    return { data, error: null };
  } catch (error) {
    // Log and return any errors that occurred
    console.error(`Error updating project with ID ${id}:`, error);
    return { data: null, error: error.message };
  }
}

/**
 * Delete a project
 * @param {string} id - Project ID to delete
 * @returns {Object} Object containing error property
 */
export async function deleteProject(id) {
  // Check if Supabase client is initialized
  if (!supabase) return { error: "Supabase not configured" };

  try {
    // Delete the project with the specified ID
    const { error } = await supabase.from("projects").delete().eq("id", id);

    // Handle query error
    if (error) throw error;

    // Return success (no error)
    return { error: null };
  } catch (error) {
    // Log and return any errors that occurred
    console.error(`Error deleting project with ID ${id}:`, error);
    return { error: error.message };
  }
}
