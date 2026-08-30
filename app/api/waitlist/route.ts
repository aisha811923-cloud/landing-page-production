import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { RESERVED_HANDLES } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");
    const emailParam = searchParams.get("email");
    const ref = searchParams.get("ref");

    if (emailParam) {
      const cleanEmail = emailParam.toLowerCase().trim();
      const { data, error } = await supabase
        .from("waitlist")
        .select("email, position")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (error || !data) {
        return NextResponse.json({ available: true, email: cleanEmail });
      }

      return NextResponse.json({
        available: false,
        email: data.email,
        position: data.position,
      });
    }

    if (handle) {
      const cleanHandle = handle.toLowerCase().trim();

      // Check system reserved handles
      if (RESERVED_HANDLES.has(cleanHandle)) {
        return NextResponse.json({
          available: false,
          handle: cleanHandle,
          reason: "reserved",
        });
      }

      const { data, error } = await supabase
        .from("waitlist")
        .select("handle, position, referral_count")
        .eq("handle", cleanHandle)
        .maybeSingle();

      if (error || !data) {
        return NextResponse.json({ available: true, handle: cleanHandle });
      }

      return NextResponse.json({
        available: false,
        handle: data.handle,
        position: data.position,
      });
    }

    if (ref) {
      const { data } = await supabase
        .from("waitlist")
        .select("handle, referral_code, referral_count, position")
        .eq("referral_code", ref.toUpperCase())
        .maybeSingle();

      return NextResponse.json({ referrer: data || null });
    }

    // Default: Return exact live database count capped at 100
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const totalClaimed = typeof count === "number" && !error ? count : 0;

    return NextResponse.json({
      claimedPasses: totalClaimed,
      totalLimit: 100,
      remaining: Math.max(0, 100 - totalClaimed),
    });
  } catch (err: any) {
    return NextResponse.json({
      claimedPasses: 0,
      totalLimit: 100,
      remaining: 100,
    });
  }
}
