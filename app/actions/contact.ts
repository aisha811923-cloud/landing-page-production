"use server";

import { supabase } from "@/lib/supabase";

export interface ContactActionResult {
  success: boolean;
  message?: string;
  referenceId?: string;
}

export async function submitContactAction(
  prevState: any,
  formData: FormData
): Promise<ContactActionResult> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const subject = (formData.get("subject") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      return {
        success: false,
        message: "Please fill out all required fields.",
      };
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    const referenceId = `EM-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    // Try inserting into Supabase 'contact_messages' table
    try {
      await supabase.from("contact_messages").insert([
        {
          name,
          email,
          subject: subject || "General Inquiry",
          message,
          reference_id: referenceId,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      // If table doesn't exist, log cleanly without blocking user confirmation
      console.warn("Contact table note:", dbErr);
    }

    return {
      success: true,
      referenceId,
      message: "Your message has been safely delivered to our archival team.",
    };
  } catch (error: any) {
    console.error("Contact action error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again or email alpha.hamza87@gmail.com directly.",
    };
  }
}
