// app/lib/supabase/storage.js

import supabase, { handleSupabaseError } from "./client";

/**
 * Upload file to Supabase storage
 * @param {File} file - The file to upload
 * @param {String} bucket - Storage bucket name
 * @param {String} path - Storage path (including filename)
 * @returns {Object} - { data, error }
 */
export const uploadFile = async (file, bucket, path) => {
  try {
    if (!file) throw new Error("No file provided");

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    return {
      data: { ...data, publicUrl },
      error: null,
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Upload project image
 * @param {File} file - Image file
 * @param {String} projectId - Project ID
 * @returns {Object} - { data, error }
 */
export const uploadProjectImage = async (file, projectId) => {
  if (!file) return { data: null, error: "No file provided" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${projectId}-${Date.now()}.${fileExt}`;
  const filePath = `project-images/${fileName}`;

  return uploadFile(file, "portfolio-media", filePath);
};

/**
 * Upload blog post image
 * @param {File} file - Image file
 * @param {String} postId - Blog post ID
 * @returns {Object} - { data, error }
 */
export const uploadBlogImage = async (file, postId) => {
  if (!file) return { data: null, error: "No file provided" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${postId}-${Date.now()}.${fileExt}`;
  const filePath = `blog-images/${fileName}`;

  return uploadFile(file, "portfolio-media", filePath);
};

/**
 * Delete file from Supabase storage
 * @param {String} bucket - Storage bucket name
 * @param {String} path - File path to delete
 * @returns {Object} - { data, error }
 */
export const deleteFile = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage.from(bucket).remove([path]);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get a signed URL for a file (for temporary access)
 * @param {String} bucket - Storage bucket name
 * @param {String} path - File path
 * @param {Number} expiresIn - Seconds until the URL expires (default: 60)
 * @returns {Object} - { data, error }
 */
export const getSignedUrl = async (bucket, path, expiresIn = 60) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * List files in a bucket/folder
 * @param {String} bucket - Storage bucket name
 * @param {String} folder - Folder path (optional)
 * @returns {Object} - { data, error }
 */
export const listFiles = async (bucket, folder = "") => {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(folder);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return handleSupabaseError(error);
  }
};
