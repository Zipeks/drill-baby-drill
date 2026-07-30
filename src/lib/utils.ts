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

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function uniqueRandom(size: number, amount: number): number[] {
  const idx: Set<number> = new Set();

  for (let i = size - amount; i < size; i++) {
    let new_idx = getRandomInt(i);
    if (idx.has(new_idx)) {
      new_idx = i;
    }
    idx.add(new_idx);
  }

  return Array.from(idx);
}

