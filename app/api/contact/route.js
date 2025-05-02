// app/api/contact/route.js

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
    const { name, email, inquiryType, message, referral } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Store in Supabase
    const { error: supabaseError } = await supabaseAdmin
      .from("contacts")
      .insert([
        {
          name,
          email,
          inquiry_type: inquiryType,
          message,
          referral,
          created_at: new Date().toISOString(),
        },
      ]);

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      return NextResponse.json(
        { error: "Failed to store contact submission" },
        { status: 500 }
      );
    }

    // Send email notification via Brevo
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "Portfolio Contact Form",
          email: "noreply@theewaweru.dev",
        },
        to: [
          {
            email: "hello@theewaweru.dev", // Your email to receive notifications
            name: "David Waweru",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `New Contact Form Submission: ${inquiryType}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          ${referral ? `<p><strong>Referral:</strong> ${referral}</p>` : ""}
          <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
        `,
      }),
    });

    const brevoData = await brevoResponse.json();

    if (!brevoResponse.ok) {
      console.error("Brevo API error:", brevoData);
      // Still return success since the form data was saved to Supabase
      return NextResponse.json(
        {
          success: true,
          message: "Contact form submitted successfully",
          emailStatus: "failed",
        },
        { status: 200 }
      );
    }

    // Send confirmation email to the user
    const confirmationResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
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
              name: name,
            },
          ],
          subject: "Thank you for your message",
          htmlContent: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you within 48 hours.</p>
          <p>Here's a copy of what you submitted:</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <p>Best regards,</p>
          <p>David Waweru<br>AI Creative Developer</p>
          <p><a href="https://theewaweru.dev">theewaweru.dev</a></p>
        `,
        }),
      }
    );

    // Return success
    return NextResponse.json(
      { success: true, message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
