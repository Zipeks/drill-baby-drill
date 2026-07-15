import { useState } from "react";
import { EmptyQuizes } from "./components/EmptyQuizes";
import Header from "./components/Header.tsx";
import type { Question, QuestionSet, Stats, Answer } from "./types.tsx";
import Dashboard from "./components/Dashboard.tsx";
import QuizActive from "./components/QuizActive.tsx";

export function App() {
  const [setsOfQuestions, setSetsOfQuestions] = useState<QuestionSet[]>(() => {
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
    const q1: QuestionSet = {
      name: "Fizyka",
      type: "SINGLE_CHOICE",
      questions: [que1, que1, que1],
    };
    return saved ? JSON.parse(saved) : [q1, q1, q1];
  });

  const [activeQuiz, setActiveQuiz] = useState<QuestionSet | null>(null);
  return (
    <>
      <div className="mx-auto max-w-[1200px] w-full mt-10 px-4 flex flex-col gap-6">
        <Header />

        {activeQuiz ? (
          <div className="flex justify-center">
            <QuizActive quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />
          </div>
        ) : setsOfQuestions.length > 0 ? (
          <Dashboard entries={setsOfQuestions} onStartQuiz={setActiveQuiz} />
        ) : (
          <EmptyQuizes />
        )}
      </div>
    </>
  );
}

export default App;
