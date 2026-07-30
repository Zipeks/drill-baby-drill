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
