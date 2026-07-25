export interface Stats {
  times_shown: number;
  times_wrong: number;
}
export interface Answer {
  text: string;
  is_correct: boolean;
}

export interface Question {
  description: string;
  answers: Answer[];
  stats: Stats;
  is_favourite: boolean;
}

type QuizType = "SINGLE_CHOICE" | "MULTIPLE_CHOICE";

export interface Quiz {
  id: string;
  type: QuizType;
  name: string;
  questions: Question[];
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
