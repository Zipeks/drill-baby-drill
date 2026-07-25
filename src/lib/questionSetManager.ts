import type { Question, Quiz, Stats, Answer } from ".././types.tsx";
import { genUniqueId } from "./utils.ts";
//
// export function mockupQuestions(): Quiz[] {
//   const stat: Stats = {
//     times_shown: 3,
//     times_wrong: 1,
//   };
//   const a1: Answer = {
//     text: "3",
//     is_correct: false,
//   };
//   const a2: Answer = {
//     text: "4",
//     is_correct: true,
//   };
//   const a3: Answer = {
//     text: "5",
//     is_correct: false,
//   };
//   const que1: Question = {
//     description: "Ile to 2+2:",
//     answers: [a1, a2, a3],
//     is_favourite: false,
//     stats: stat,
//   };
//   const q1: Quiz = {
//     name: "Fizyka",
//     type: "SINGLE_CHOICE",
//     questions: [que1, que1, que1],
//   };
//   return [q1, q1, q1];
// }

export function loadQuestions(): Quiz[] {
  const saved = localStorage.getItem("setsOfQuestions");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error while reading localStorage", error);
      return [];
    }
  }
  return [];
}

export function parseImportedFile(content: string, filename: string): Quiz {
  if (filename.endsWith(".json")) {
    try {
      const parsed = JSON.parse(content);
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error("Nieprawidłowy format JSON.");
      }
      return parsed as Quiz;
    } catch {
      throw new Error("Błąd podczas odczytu pliku JSON.");
    }
  }

  const lines = content.split("\n");
  const questions: Question[] = [];
  
  let currentDesc = "";
  let currentAnswers: Answer[] = [];

  const pushCurrentQuestion = () => {
    if (currentDesc.trim() && currentAnswers.length > 0) {
      questions.push({
        description: currentDesc.trim(),
        answers: currentAnswers,
        stats: { times_shown: 0, times_wrong: 0 },
        is_favourite: false,
      });
    }
    currentDesc = "";
    currentAnswers = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; 

    const isOption = /^(?:>>>)?\s*[A-Z][\.\)]/i.test(line);

    if (isOption) {
      const isCorrect = line.startsWith(">>>");
      const cleanText = line.replace(/^(?:>>>)?\s*[A-Z][\.\)]\s*/i, "").trim();
      currentAnswers.push({ text: cleanText, is_correct: isCorrect });
    } else {
      if (currentAnswers.length > 0) {
        pushCurrentQuestion();
      }

      currentDesc = currentDesc ? currentDesc + "\n" + line : line;
    }
  }

    pushCurrentQuestion();

  const hasMultipleCorrect = questions.some(
    (q) => q.answers.filter((a) => a.is_correct).length > 1
  );

  return {
    id: genUniqueId(),
    name: filename.replace(/\.[^/.]+$/, ""), 
    type: hasMultipleCorrect ? "MULTIPLE_CHOICE" : "SINGLE_CHOICE",
    questions: questions,
  };
  
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
