// app/lib/supabase/messages.js

import supabase from "./client";

// Get all messages
export async function getMessages() {
  if (!supabase) return { data: [], error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { data: [], error: error.message };
  }
}

// Get a single message by ID
export async function getMessageById(id) {
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching message with ID ${id}:`, error);
    return { data: null, error: error.message };
  }
}

// Create a new message (from contact form)
export async function createMessage(messageData) {
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([messageData])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error creating message:", error);
    return { data: null, error: error.message };
  }
}

// Mark a message as read
export async function markMessageAsRead(id, isRead = true) {
  if (!supabase) return { data: null, error: "Supabase not configured" };

  try {
    const { data, error } = await supabase
      .from("messages")
      .update({ read: isRead })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error updating message with ID ${id}:`, error);
    return { data: null, error: error.message };
  }
}

// Delete a message
export async function deleteMessage(id) {
  if (!supabase) return { error: "Supabase not configured" };

  try {
    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error(`Error deleting message with ID ${id}:`, error);
    return { error: error.message };
  }
}
