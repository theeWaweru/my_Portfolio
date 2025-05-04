// app/lib/supabase/uploadImage.js
import supabase from "./client";

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {String} folder - Storage folder (e.g., 'projects', 'blog')
 * @param {String} id - Unique identifier for the file (usually project/post ID)
 * @returns {Promise} - Promise resolving to { data, error }
 */
export async function uploadImage(file, folder, id) {
  if (!supabase) return { data: null, error: "Supabase not configured" };
  if (!file) return { data: null, error: "No file provided" };

  try {
    // Create a unique file name to avoid conflicts
    const fileExt = file.name.split(".").pop();
    const fileName = `${id}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log("Attempting to upload to:", filePath);

    // Upload the file
    const { data, error } = await supabase.storage
      .from("media")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return { data: null, error: error.message };
    }

    console.log("Upload successful:", data);

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(filePath);

    return {
      data: {
        path: filePath,
        url: publicUrl,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { data: null, error: error.message };
  }
}

/**
 * Delete an image from Supabase Storage
 * @param {String} path - The file path to delete
 * @returns {Promise} - Promise resolving to { data, error }
 */
export async function deleteImage(path) {
  if (!supabase) return { error: "Supabase not configured" };
  if (!path) return { error: "No file path provided" };

  try {
    const { data, error } = await supabase.storage.from("media").remove([path]);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { error: error.message };
  }
}

export default { uploadImage, deleteImage };
