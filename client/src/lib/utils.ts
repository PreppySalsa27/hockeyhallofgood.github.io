import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to display month day, year (e.g. January 1, 2021)
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Format time on ice from seconds to MM:SS format
export function formatTimeOnIce(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Add plus sign to positive numbers
export function formatPlusMinus(value: number): string {
  return value > 0 ? `+${value}` : value.toString();
}

// Format percentage with one decimal place
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Get career span text
export function getCareerSpan(start: Date | string, end: Date | string | null): string {
  const startYear = new Date(start).getFullYear();
  if (!end) return `${startYear} - Present`;
  const endYear = new Date(end).getFullYear();
  return `${startYear} - ${endYear}`;
}
