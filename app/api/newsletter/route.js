// app/api/newsletter/route.js

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase client with service role for admin access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    // Parse request body
    const data = await request.json();
    const { email } = data;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = not found, which is expected
      console.error("Error checking for existing subscriber:", checkError);
      return NextResponse.json(
        { error: "Failed to check subscription status" },
        { status: 500 }
      );
    }

    if (existingSubscriber) {
      return NextResponse.json(
        {
          success: true,
          message: "You are already subscribed to the newsletter",
        },
        { status: 200 }
      );
    }

    // Store in Supabase
    const { error: supabaseError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
          status: "active",
        },
      ]);

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      return NextResponse.json(
        { error: "Failed to store subscription" },
        { status: 500 }
      );
    }

    // Send confirmation email via Brevo
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "David Waweru",
          email: "hello@theewaweru.dev",
        },
        to: [
          {
            email: email,
          },
        ],
        subject: "Welcome to My Newsletter!",
        htmlContent: `
          <h2>Thank you for subscribing!</h2>
          <p>Hi there,</p>
          <p>Thank you for subscribing to my newsletter. You'll now receive updates about new articles, projects, and insights on design, development, and AI.</p>
          <p>I'm excited to share my journey and knowledge with you!</p>
          <p>Best regards,</p>
          <p>David Waweru<br>AI Creative Developer</p>
          <p><a href="https://theewaweru.dev">theewaweru.dev</a></p>
          <p><small>If you didn't sign up for this newsletter, you can safely ignore this email.</small></p>
        `,
      }),
    });

    const brevoData = await brevoResponse.json();

    if (!brevoResponse.ok) {
      console.error("Brevo API error:", brevoData);
      // Still return success since the subscription was saved to Supabase
      return NextResponse.json(
        {
          success: true,
          message: "Subscription successful",
          emailStatus: "failed",
        },
        { status: 200 }
      );
    }

    // Also notify website owner about new subscriber
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Portfolio Newsletter",
          email: "noreply@theewaweru.dev",
        },
        to: [
          {
            email: "hello@theewaweru.dev", // Your email to receive notifications
            name: "David Waweru",
          },
        ],
        subject: "New Newsletter Subscriber",
        htmlContent: `
          <h2>New Newsletter Subscription</h2>
          <p>You have a new newsletter subscriber: ${email}</p>
          <p>Subscribed on: ${new Date().toLocaleString()}</p>
        `,
      }),
    });

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing to the newsletter!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
