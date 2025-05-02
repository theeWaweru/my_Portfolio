// app/lib/hooks/useBlogPosts.js
"use client"


import { useState, useEffect } from "react";
import {
  fetchBlogPosts,
  fetchBlogPostBySlug,
  fetchFeaturedBlogPosts,
  fetchBlogCategories,
} from "../supabase/database";

/**
 * Hook for fetching all blog posts with optional category filtering and search
 * @param {String} initialCategory - Initial category filter (optional)
 * @returns {Object} - Blog posts data and state
 */
export const useBlogPosts = (initialCategory = "All Posts") => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All Posts"]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load posts on mount and when category or search changes
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Add debounce for search query
        const timeoutId = setTimeout(async () => {
          // Fetch posts based on selected category and search query
          const { data, error } = await fetchBlogPosts(
            selectedCategory === "All Posts" ? null : selectedCategory,
            searchQuery
          );

          if (error) throw new Error(error.message);

          setPosts(data || []);

          // Fetch categories if not loaded yet
          if (categories.length <= 1) {
            const { data: categoriesData, error: categoriesError } =
              await fetchBlogCategories();

            if (categoriesError) throw new Error(categoriesError.message);

            setCategories(categoriesData || ["All Posts"]);
          }

          setIsLoading(false);
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [selectedCategory, searchQuery]);

  return {
    posts,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
  };
};

/**
 * Hook for fetching a single blog post by slug/id
 * @param {String} slug - Blog post slug/id
 * @returns {Object} - Blog post data and state
 */
export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await fetchBlogPostBySlug(slug);

        if (error) throw new Error(error.message);

        setPost(data);
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  return { post, isLoading, error };
};

/**
 * Hook for fetching featured blog posts
 * @param {Number} limit - Maximum number of posts to fetch
 * @returns {Object} - Featured blog posts data and state
 */
export const useFeaturedBlogPosts = (limit = 3) => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await fetchFeaturedBlogPosts(limit);

        if (error) throw new Error(error.message);

        setFeaturedPosts(data || []);
      } catch (err) {
        console.error("Error loading featured blog posts:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedPosts();
  }, [limit]);

  return { featuredPosts, isLoading, error };
};

export default useBlogPosts;
