// app/lib/hooks/useProjects.js
"use client"

import { useState, useEffect } from "react";
import {
  fetchProjects,
  fetchProjectBySlug,
  fetchFeaturedProjects,
  fetchProjectCategories,
} from "../supabase/database";

/**
 * Hook for fetching all projects with optional category filtering
 * @param {String} initialCategory - Initial category filter (optional)
 * @returns {Object} - Projects data and state
 */
export const useProjects = (initialCategory = "All Projects") => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All Projects"]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load projects on mount and when category changes
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch projects based on selected category
        const { data, error } = await fetchProjects(
          selectedCategory === "All Projects" ? null : selectedCategory
        );

        if (error) throw new Error(error.message);

        setProjects(data || []);

        // Fetch categories if not loaded yet
        if (categories.length <= 1) {
          const { data: categoriesData, error: categoriesError } =
            await fetchProjectCategories();

          if (categoriesError) throw new Error(categoriesError.message);

          setCategories(categoriesData || ["All Projects"]);
        }
      } catch (err) {
        console.error("Error loading projects:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [selectedCategory]);

  return {
    projects,
    categories,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error,
  };
};

/**
 * Hook for fetching a single project by slug/id
 * @param {String} slug - Project slug/id
 * @returns {Object} - Project data and state
 */
export const useProject = (slug) => {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await fetchProjectBySlug(slug);

        if (error) throw new Error(error.message);

        setProject(data);
      } catch (err) {
        console.error("Error loading project:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  return { project, isLoading, error };
};

/**
 * Hook for fetching featured projects
 * @param {Number} limit - Maximum number of projects to fetch
 * @returns {Object} - Featured projects data and state
 */
export const useFeaturedProjects = (limit = 4) => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await fetchFeaturedProjects(limit);

        if (error) throw new Error(error.message);

        setFeaturedProjects(data || []);
      } catch (err) {
        console.error("Error loading featured projects:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProjects();
  }, [limit]);

  return { featuredProjects, isLoading, error };
};

export default useProjects;
