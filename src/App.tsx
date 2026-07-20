import { useState } from "react";
import { EmptyQuizes } from "./components/EmptyQuizes";
import Header from "./components/Header.tsx";
import type { Quiz } from "./types.tsx";
import Dashboard from "./components/Dashboard.tsx";
import QuizActive from "./components/QuizActive.tsx";
import { loadQuestions } from "./questionSetManager.ts";

export function App() {
  const [setsOfQuestions, setSetsOfQuestions] =
    useState<Quiz[]>(loadQuestions());

  const [activeQuiz, setActiveQuiz] = useState<{
    quiz: Quiz;
    order: number[];
  } | null>(null);

  return (
    <>
      <div className="mx-auto max-w-[1200px] w-full mt-10 px-4 flex flex-col gap-6">
        <Header />

        {activeQuiz ? (
          <div className="flex justify-center">
            <QuizActive
              quiz={activeQuiz.quiz}
              order={activeQuiz.order}
              onClose={() => setActiveQuiz(null)}
            />
          </div>
        ) : setsOfQuestions.length > 0 ? (
          <Dashboard
            entries={setsOfQuestions}
            onStartQuiz={(quiz, order) => setActiveQuiz({ quiz, order })}
            onEditQuiz={(quiz) => console.log("AAA", quiz.name)}
          />
        ) : (
          <EmptyQuizes />
        )}
      </div>
    </>
  );
}

export default App;
