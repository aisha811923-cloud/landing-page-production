"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function LiveCounter() {
  const [count, setCount] = useState<number | null>(null);

  const fetchLiveCount = async () => {
    try {
      const { count: total, error } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      if (!error && total !== null) {
        setCount(total);
      } else {
        // Fallback to API route
        const res = await fetch("/api/waitlist", { cache: "no-store" });
        const data = await res.json();
        if (typeof data?.claimedPasses === "number") {
          setCount(data.claimedPasses);
        }
      }
    } catch (err) {
      console.warn("Live counter sync error:", err);
    }
  };

  useEffect(() => {
    fetchLiveCount();

    const channel = supabase
      .channel("realtime-counter-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "waitlist" },
        () => {
          fetchLiveCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const displayCount = count ?? 0;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 border border-[#E8E1D3] shadow-xs backdrop-blur-md">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]"></span>
      </span>
      <span className="font-mono text-xs font-medium text-[#1A1815] tracking-wide">
        {displayCount} <span className="text-[#6E675F]">/ 100 Founding Passes</span>
      </span>
    </div>
  );
}

export default LiveCounter;
