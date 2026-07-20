import type { Question, Quiz, Stats, Answer } from "./types.tsx";

export function loadQuestions(): Quiz[] {
  const saved = localStorage.getItem("setsOfQuestions");
  const stat: Stats = {
    times_shown: 3,
    times_wrong: 1,
  };
  const a1: Answer = {
    text: "3",
    is_correct: false,
  };
  const a2: Answer = {
    text: "4",
    is_correct: true,
  };
  const a3: Answer = {
    text: "5",
    is_correct: false,
  };
  const que1: Question = {
    description: "Ile to 2+2:",
    answers: [a1, a2, a3],
    is_favourite: false,
    stats: stat,
  };
  const q1: Quiz = {
    name: "Fizyka",
    type: "SINGLE_CHOICE",
    questions: [que1, que1, que1],
  };
  return saved ? JSON.parse(saved) : [q1, q1, q1];
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
