import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date for landing/display. Use en-US so server and client match (avoids hydration errors). */
export function formatDateForLanding(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "text-green-500";
    case "Medium":
      return "text-orange-500";
    case "Hard":
      return "text-red-500";
    default:
      return "text-muted-foreground";
  }
}

export function getDifficultyBgColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-500/10 text-green-500 border-green-500/30";
    case "Medium":
      return "bg-orange-500/10 text-orange-500 border-orange-500/30";
    case "Hard":
      return "bg-red-500/10 text-red-500 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
}
