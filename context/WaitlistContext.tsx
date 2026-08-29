"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { WaitlistActionResult } from "@/app/actions/waitlist";
import { supabase } from "@/lib/supabase";

interface WaitlistContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  vipData: WaitlistActionResult | null;
  setVipData: (data: WaitlistActionResult | null) => void;
  claimedCount: number;
  isLoadingCount: boolean;
  triggerConfetti: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vipData, setVipData] = useState<WaitlistActionResult | null>(null);
  const [claimedCount, setClaimedCount] = useState<number>(0);
  const [isLoadingCount, setIsLoadingCount] = useState<boolean>(true);

  useEffect(() => {
    // 1. Check localStorage for existing VIP reservation
    try {
      const saved = localStorage.getItem("emulsion_vip_pass");
      if (saved) {
        setVipData(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Storage check skipped:", e);
    }

    // 2. Fetch true live count directly from Supabase
    async function fetchExactCount() {
      try {
        const { count, error } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });

        if (!error && typeof count === "number") {
          setClaimedCount(count);
        } else {
          // Fallback to API route if direct query encounters policy issue
          const res = await fetch("/api/waitlist");
          const data = await res.json();
          if (typeof data?.claimedPasses === "number") {
            setClaimedCount(data.claimedPasses);
          }
        }
      } catch (err) {
        console.warn("Count query notice:", err);
      } finally {
        setIsLoadingCount(false);
      }
    }

    fetchExactCount();

    // 3. Subscribe to Realtime Supabase PostgreSQL changes (INSERT on waitlist table)
    const channel = supabase
      .channel("public:waitlist_counter")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "waitlist",
        },
        () => {
          setClaimedCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C5A870", "#C86428", "#F59E0B", "#1A1815", "#F9F6F0"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#C5A870", "#C86428", "#F59E0B"],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#C5A870", "#C86428", "#F59E0B"],
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti skipped:", e);
    }
  };

  const handleSetVipData = (data: WaitlistActionResult | null) => {
    setVipData(data);
    if (data && data.success) {
      try {
        localStorage.setItem("emulsion_vip_pass", JSON.stringify(data));
      } catch (e) {}
      setClaimedCount((prev) => prev + 1);
      setIsModalOpen(true);
      triggerConfetti();
    }
  };

  return (
    <WaitlistContext.Provider
      value={{
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        vipData,
        setVipData: handleSetVipData,
        claimedCount,
        isLoadingCount,
        triggerConfetti,
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error("useWaitlist must be used within a WaitlistProvider");
  }
  return context;
}
