import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function indexToLetter (index) {
  const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz");
  return alphabet[index];
}