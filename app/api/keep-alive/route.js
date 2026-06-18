// Keep-alive cron: runs daily (see vercel.json) and touches the database so the
// free Supabase project never hits the 7-day inactivity pause. A single cheap
// read counts as activity and resets the timer.
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  // If CRON_SECRET is set in the environment, Vercel sends it as a Bearer token.
  // We only enforce it when it exists, so local/manual hits still work.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { ok: false, error: "Supabase env vars missing" },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(url, key);
    // Lightweight count query, enough to register database activity.
    const { error } = await supabase
      .from("projects")
      .select("id", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({ ok: true, pinged: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
