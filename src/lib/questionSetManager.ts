import type { Question, Quiz, Answer, FileType } from "./types.tsx";
import { genUniqueId } from "./utils.ts";

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
        throw new Error("Incorrect JSON format.");
      }
      return parsed as Quiz;
    } catch {
      throw new Error("Error while reading JSON.");
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
    (q) => q.answers.filter((a) => a.is_correct).length > 1,
  );

  return {
    id: genUniqueId(),
    name: filename.replace(/\.[^/.]+$/, ""),
    type: hasMultipleCorrect ? "MULTIPLE_CHOICE" : "SINGLE_CHOICE",
    questions: questions,
  };
}
export function exportQuiz(quiz: Quiz, fileType: FileType) {
  if (fileType === "JSON") {
    const data = JSON.stringify(quiz);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${quiz.name}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  } else {
    let data = "";
    quiz.questions.map((question) => {
      data += question.description + "\n";
      question.answers.map((ans, index) => {
        data +=
          (ans.is_correct ? ">>>" : "") +
          String.fromCharCode(65 + index) +
          ") " +
          ans.text +
          "\n";
      });
    });
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${quiz.name}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
  }
}

export const createEmptyAnswer = (text = "", is_correct = false): Answer => ({
  text,
  is_correct,
});

export const createEmptyQuestion = (): Question => ({
  description: "",
  answers: [createEmptyAnswer("", true), createEmptyAnswer("", false)],
  stats: {
    times_shown: 0,
    times_wrong: 0,
  },
  is_favourite: false,
});

export const createEmptyQuiz = (name = "New Quiz"): Quiz => ({
  id: crypto.randomUUID(),
  type: "SINGLE_CHOICE",
  name: name,
  questions: [createEmptyQuestion()],
});
