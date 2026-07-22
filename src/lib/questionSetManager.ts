import type { Question, Quiz, Stats, Answer } from ".././types.tsx";

export function mockupQuestions(): Quiz[] {
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
  return [q1, q1, q1];
}

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
        throw new Error("Incorect JSON format.");
      }
      return parsed as Quiz;
    } catch (error) {
      throw new Error("Error reading JSON file.");
    }
  }

  const lines = content.split("\n");
  const questions: Question[] = [];

  let currentDesc = "";
  let currentAnswers: Answer[] = [];
  let is_single_choice = true;
  let current_correct_answers = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const isOption = /^(?:>>>)?\s*[A-Z][\.\)]/i.test(line);

    if (isOption) {
      current_correct_answers++;
      const isCorrect = line.startsWith(">>>");
      if (isCorrect) {
        current_correct_answers++;
      }
      const cleanText = line.replace(/^(?:>>>)?\s*[A-Z][\.\)]\s*/i, "").trim();
      currentAnswers.push({ text: cleanText, is_correct: isCorrect });
    } else {
      if (currentAnswers.length > 0) {
        if (current_correct_answers > 1) {
          is_single_choice = false;
        }
        questions.push({
          description: currentDesc.trim(),
          answers: currentAnswers,
          stats: { times_shown: 0, times_wrong: 0 },
          is_favourite: false,
        });
        currentDesc = line;
        currentAnswers = [];
      }
    }
  }

  if (currentDesc && currentAnswers.length > 0) {
    questions.push({
      description: currentDesc.trim(),
      answers: currentAnswers,
      stats: { times_shown: 0, times_wrong: 0 },
      is_favourite: false,
    });
  }

  return {
    name: filename.replace(".txt", ""),
    type: is_single_choice ? "SINGLE_CHOICE" : "MULTIPLE_CHOICE",
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
