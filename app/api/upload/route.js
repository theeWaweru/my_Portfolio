// app/api/upload/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/client";

export async function POST(request) {
  console.log("Upload API route hit");

  if (!supabaseAdmin) {
    console.error(
      "Supabase admin client not configured - check environment variables"
    );
    return NextResponse.json(
      {
        error:
          "Supabase admin not configured. Check your environment variables.",
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");
    const id = formData.get("id");

    if (!file || !folder || !id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${id}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log("Uploading to path:", filePath);

    // Convert file to ArrayBuffer for upload
    const fileArrayBuffer = await file.arrayBuffer();
    const fileUint8Array = new Uint8Array(fileArrayBuffer);

    // Upload to the 'media' bucket
    const { data, error } = await supabaseAdmin.storage
      .from("media")
      .upload(filePath, fileUint8Array, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("media").getPublicUrl(filePath);

    console.log("Upload successful:", { path: filePath, url: publicUrl });

    return NextResponse.json({
      path: filePath,
      url: publicUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
