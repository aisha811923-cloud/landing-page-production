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
