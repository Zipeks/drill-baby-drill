import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function genUniqueId(): string {
  const dateStr = Date
    .now()
    .toString(36); 

  const randomStr = Math
    .random()
    .toString(36)
    .substring(2, 8);

  return `${dateStr}-${randomStr}`;
}
