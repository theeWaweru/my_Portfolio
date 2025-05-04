// app/lib/supabase/uploadImage.js
export async function uploadImage(file, folder, id) {
  console.log("Upload attempt started:", { folder, id });

  if (!file) {
    console.error("No file provided for upload");
    return { data: null, error: "No file provided" };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("id", id);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to upload");
    }

    console.log("Upload successful:", data);

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { data: null, error: error.message };
  }
}

export async function deleteImage(path) {
  try {
    const response = await fetch("/api/upload", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete");
    }

    return { error: null };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { error: error.message };
  }
}
