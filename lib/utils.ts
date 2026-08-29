import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeHandle(handle: string): string {
  return handle.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase().slice(0, 20);
}

export function formatHandle(handle: string): string {
  const clean = sanitizeHandle(handle);
  return clean ? `@${clean}` : "";
}

export function formatPosition(pos: number): string {
  return `#${pos.toLocaleString()}`;
}

export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://slow-blink-sooty.vercel.app"
  );
}

export function getReferralUrl(referralCode: string): string {
  return `${getBaseUrl()}/?ref=${referralCode}`;
}
