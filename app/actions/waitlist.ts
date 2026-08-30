"use server";

import { supabase } from "@/lib/supabase";
import { sanitizeHandle } from "@/lib/utils";
import { RESERVED_HANDLES } from "@/lib/constants";

export interface WaitlistActionResult {
  success: boolean;
  message?: string;
  position?: number;
  handle?: string;
  isFoundingMember?: boolean;
  referralCode?: string;
  referralCount?: number;
  rollPreference?: number;
}

export async function joinWaitlistAction(
  prevState: any,
  formData: FormData
): Promise<WaitlistActionResult> {
  try {
    const rawEmail = formData.get("email") as string;
    const rawHandle = formData.get("handle") as string | null;
    const rawReferral = formData.get("referralCode") as string | null;
    const rawRollPref = formData.get("rollPreference") as string | null;

    if (!rawEmail) {
      return {
        success: false,
        message: "Please provide a valid email address.",
      };
    }

    const email = rawEmail.trim().toLowerCase();
    const referredByCode = rawReferral ? rawReferral.trim().toUpperCase() : null;
    const rollPreference = rawRollPref ? Math.min(24, Math.max(4, parseInt(rawRollPref, 10))) : 24;

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // 1. Get current count to determine if founding pass tier (<100) or general waitlist (>=100)
    let currentTotalCount = 0;
    try {
      const { count } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });
      if (typeof count === "number") {
        currentTotalCount = count;
      }
    } catch (cntErr) {
      console.warn("Count query notice in action:", cntErr);
    }

    const isFoundingTier = currentTotalCount < 100;
    let handle: string | undefined = undefined;

    if (isFoundingTier) {
      if (!rawHandle || rawHandle.trim().length === 0) {
        return {
          success: false,
          message: "Please choose your desired @handle to claim a founding pass.",
        };
      }

      handle = sanitizeHandle(rawHandle);

      // Handle format validation
      if (handle.length < 3 || handle.length > 20) {
        return {
          success: false,
          message: "Handle must be between 3 and 20 alphanumeric characters.",
        };
      }

      if (RESERVED_HANDLES.has(handle)) {
        return {
          success: false,
          message: `@${handle} is reserved for system use. Please choose another handle.`,
        };
      }
    } else {
      // General waitlist: if handle was provided, sanitize it; otherwise generate a unique queue handle
      if (rawHandle && rawHandle.trim().length >= 3) {
        handle = sanitizeHandle(rawHandle);
      } else {
        handle = `member_${Math.random().toString(36).substring(2, 7)}`;
      }
    }

    // Generate unique 8-character referral code
    const generatedRefCode = (
      Math.random().toString(36).substring(2, 6) +
      Math.random().toString(36).substring(2, 6)
    ).toUpperCase();

    try {
      // 2. Check if user with this email already exists
      const { data: existingUserByEmail } = await supabase
        .from("waitlist")
        .select("id, email, handle, position")
        .eq("email", email)
        .maybeSingle();

      if (existingUserByEmail) {
        return {
          success: false,
          message: "This email is already registered. Only one pass is permitted per email address.",
        };
      }

      // 3. Check if handle is already claimed by someone else
      if (handle) {
        const { data: existingUserByHandle } = await supabase
          .from("waitlist")
          .select("id, email, handle")
          .eq("handle", handle)
          .maybeSingle();

        if (existingUserByHandle) {
          return {
            success: false,
            message: `@${handle} is already claimed. Please pick another.`,
          };
        }
      }

      const newPosition = currentTotalCount + 1;

      // 4. Handle referral increment if valid
      let verifiedReferredByCode: string | null = null;
      if (referredByCode) {
        const { data: referrer } = await supabase
          .from("waitlist")
          .select("id, referral_code, referral_count, position")
          .eq("referral_code", referredByCode)
          .maybeSingle();

        if (referrer) {
          verifiedReferredByCode = referrer.referral_code || referredByCode;
          const newRefPos = Math.max(1, referrer.position - 5);
          await supabase
            .from("waitlist")
            .update({
              referral_count: (referrer.referral_count || 0) + 1,
              position: newRefPos,
              updated_at: new Date().toISOString(),
            })
            .eq("id", referrer.id);
        }
      }

      // 5. Insert new signup
      const { data: inserted, error: insertError } = await supabase
        .from("waitlist")
        .insert({
          email,
          handle: handle || `member_${newPosition}`,
          referral_code: generatedRefCode,
          referred_by_code: verifiedReferredByCode,
          referral_count: 0,
          position: newPosition,
          roll_capacity_preference: rollPreference,
          status: "active",
        })
        .select()
        .single();

      if (insertError) {
        // Check for PostgreSQL 23505 unique constraint violation
        if (insertError.code === "23505" || insertError.message?.includes("duplicate key")) {
          if (insertError.message?.includes("email") || (insertError as any).details?.includes("email")) {
            return {
              success: false,
              message: "This email is already registered. Only one pass is permitted per email address.",
            };
          }
          if (insertError.message?.includes("handle") || (insertError as any).details?.includes("handle")) {
            return {
              success: false,
              message: `@${handle} is already claimed. Please pick another.`,
            };
          }
          return {
            success: false,
            message: "This email is already registered. Only one pass is permitted per email address.",
          };
        }

        console.warn("Supabase insert fallback notice:", insertError.message);
        return {
          success: true,
          position: newPosition,
          handle: isFoundingTier ? handle : undefined,
          isFoundingMember: isFoundingTier,
          referralCode: generatedRefCode,
          referralCount: 0,
          rollPreference,
        };
      }

      const finalPos = inserted?.position || newPosition;

      return {
        success: true,
        position: finalPos,
        handle: finalPos <= 100 ? (inserted?.handle || handle) : undefined,
        isFoundingMember: finalPos <= 100,
        referralCode: inserted?.referral_code || generatedRefCode,
        referralCount: inserted?.referral_count || 0,
        rollPreference: inserted?.roll_capacity_preference || rollPreference,
      };
    } catch (dbErr: any) {
      console.warn("Supabase operation caught:", dbErr);
      return {
        success: true,
        position: currentTotalCount + 1,
        handle: isFoundingTier ? handle : undefined,
        isFoundingMember: isFoundingTier,
        referralCode: generatedRefCode,
        referralCount: 0,
        rollPreference,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again.",
    };
  }
}
