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

type QuestionSetType = "SINGLE_CHOICE" | "MULTIPLE_CHOICE";

export interface QuestionSet {
  type: QuestionSetType;
  name: string;
  questions: Question[];
}
