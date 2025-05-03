// app/api/contact/route.js
// This file handles the backend processing of the contact form submission

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase client with service role for admin access
// This allows us to write to the database without user authentication
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
const brevoApiKey = process.env.BREVO_API_KEY;

// Create a Supabase client with the service role key
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to verify reCAPTCHA token with Google's API
async function verifyRecaptcha(token) {
  try {
    // Make a POST request to Google's reCAPTCHA verification endpoint
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // Send the secret key and the token from the client
        body: `secret=${recaptchaSecretKey}&response=${token}`,
      }
    );

    // Parse the response from Google
    const data = await response.json();
    // Return whether the verification was successful
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

    // Store message in the database
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

    // If Brevo API key is available, send email notifications
    if (brevoApiKey) {
      try {
        // Send notification email to the portfolio owner
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoApiKey,
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
            "api-key": brevoApiKey,
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
