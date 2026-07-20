import { useState } from "react";
import { EmptyQuizes } from "./components/EmptyQuizes";
import Header from "./components/Header.tsx";
import type { Quiz } from "./types.tsx";
import Dashboard from "./components/Dashboard.tsx";
import QuizActive from "./components/QuizActive.tsx";
import { loadQuestions, mockupQuestions } from "./lib/questionSetManager.ts";

export function App() {
  const [setsOfQuestions, setSetsOfQuestions] =
    useState<Quiz[]>(mockupQuestions());

  const handleToggleFavourite = (
    setName: string,
    questionOriginalIndex: number,
  ) => {
    setSetsOfQuestions((prevSets) =>
      prevSets.map((set) => {
        if (set.name === setName) {
          const newQuestions = [...set.questions];
          newQuestions[questionOriginalIndex] = {
            ...newQuestions[questionOriginalIndex],
            is_favourite: !newQuestions[questionOriginalIndex].is_favourite,
          };

          const updatedSet = { ...set, questions: newQuestions };
          setActiveQuiz((prev) =>
            prev ? { ...prev, quiz: updatedSet } : null,
          );

          return updatedSet;
        }
        return set;
      }),
    );
  };

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
              onToggleFavourite={(originalIndex) =>
                handleToggleFavourite(activeQuiz.quiz.name, originalIndex)
              }
            />
          </div>
        ) : setsOfQuestions.length > 0 ? (
          <Dashboard
            entries={setsOfQuestions}
            onStartQuiz={(quiz, order) => setActiveQuiz({ quiz, order })}
            onEditQuiz={(quiz) => console.log("AAA", quiz.name)}
            onImportNewSet={(newSet) =>
              setSetsOfQuestions((prev) => [...prev, newSet])
            }
          />
        ) : (
          <EmptyQuizes />
        )}
      </div>
    </>
  );
}

export default App;
