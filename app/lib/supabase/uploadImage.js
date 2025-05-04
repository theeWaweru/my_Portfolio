// app/lib/supabase/uploadImage.js
import { supabaseAdmin } from "./client";

export async function uploadImage(file, folder, id) {
  if (!supabaseAdmin) {
    console.error("Supabase admin client not configured");
    return {
      data: null,
      error: "Supabase admin not configured. Check your environment variables.",
    };
  }

  if (!file) return { data: null, error: "No file provided" };

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${id}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log("Attempting to upload to:", filePath);

    const { data, error } = await supabaseAdmin.storage
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

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("media").getPublicUrl(filePath);

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
