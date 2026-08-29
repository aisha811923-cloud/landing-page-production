import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");
    const ref = searchParams.get("ref");

    if (handle) {
      const { data, error } = await supabase
        .from("waitlist")
        .select("handle, position, referral_count")
        .eq("handle", handle.toLowerCase())
        .maybeSingle();

      if (error || !data) {
        return NextResponse.json({ available: true, handle });
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

    // Default: Return exact live database count
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const totalClaimed = (typeof count === "number" && !error) ? count : 0;

    return NextResponse.json({
      claimedPasses: totalClaimed,
      totalLimit: 1000,
      remaining: Math.max(0, 1000 - totalClaimed),
    });
  } catch (err: any) {
    return NextResponse.json({
      claimedPasses: 0,
      totalLimit: 1000,
      remaining: 1000,
    });
  }
}
