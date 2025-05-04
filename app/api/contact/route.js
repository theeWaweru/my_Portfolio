// app/api/contact/route.js

import { NextResponse } from "next/server";

// Helper function to verify reCAPTCHA token with Google's API
async function verifyRecaptcha(token) {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

// Main handler for POST requests to /api/contact
export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { name, email, subject, message, recaptchaToken } = body;

    // Validate that all required fields are present
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token to prevent spam
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Initialize Supabase client only if environment variables are available
    let supabase = null;
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const { createClient } = await import("@supabase/supabase-js");
      supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
    }

    // Store message in the database if Supabase is configured
    if (supabase) {
      const { data, error } = await supabase.from("messages").insert([
        {
          name,
          email,
          subject,
          message,
          created_at: new Date().toISOString(),
          read: false,
        },
      ]);

      // Handle database errors
      if (error) {
        console.error("Error saving message to database:", error);
        return NextResponse.json(
          { error: "Failed to save your message" },
          { status: 500 }
        );
      }
    }

    // If Brevo API key is available, send email notifications
    if (process.env.BREVO_API_KEY) {
      try {
        // Send notification email to the portfolio owner
        await fetch("https://api.brevo.com/v3/smtp/email", {
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
            subject: `New Contact Form Submission: ${subject}`,
            htmlContent: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
              <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
            `,
          }),
        });

        // Send confirmation email to the user
        await fetch("https://api.brevo.com/v3/smtp/email", {
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
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
              <p>Best regards,</p>
              <p>David Waweru<br>AI Creative Developer</p>
              <p><a href="https://theewaweru.dev">theewaweru.dev</a></p>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // We still return success since the message was saved in the database
        return NextResponse.json(
          {
            success: true,
            message: "Your message was saved but email notification failed",
            emailStatus: "failed",
          },
          { status: 200 }
        );
      }
    }

    // Return success response
    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle any other errors that might occur
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
