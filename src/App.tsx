import { useState } from "react";
import { EmptyQuizes } from "./components/EmptyQuizes";
import Header from "./components/Header.tsx";
import type { Quiz } from "./types.tsx";
import Dashboard from "./components/Dashboard.tsx";
import QuizActive from "./components/QuizActive.tsx";
import { loadQuestions, mockupQuestions } from "./lib/questionSetManager.ts";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

export function App() {
  const navigate = useNavigate();
  const [setsOfQuestions, setSetsOfQuestions] = useState<Quiz[]>([]);
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

  const handleStartQuiz = (quiz: Quiz, order: number[]) => {
    setActiveQuiz({ quiz, order });
    navigate("/quiz");
  };

  const handleCloseQuiz = () => {
    setActiveQuiz(null);
    navigate("/");
  };

  const [activeQuiz, setActiveQuiz] = useState<{
    quiz: Quiz;
    order: number[];
  } | null>(null);

  return (
    <div className="mx-auto max-w-[1200px] w-full mt-10 px-4 flex flex-col gap-6">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              entries={setsOfQuestions}
              onStartQuiz={handleStartQuiz}
              onEditQuiz={(quiz) => {
                console.log("Edit:", quiz.name);
              }}
              onHandleImport={(newSet) =>
                setSetsOfQuestions((prev) => [...prev, newSet])
              }
            />
          }
        />

        <Route
          path="/quiz"
          element={
            activeQuiz ? (
              <QuizActive
                quiz={activeQuiz.quiz}
                order={activeQuiz.order}
                onClose={handleCloseQuiz}
                onToggleFavourite={(originalIndex) =>
                  handleToggleFavourite(activeQuiz.quiz.name, originalIndex)
                }
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<div>Error: page not found (404)</div>} />
      </Routes>
    </div>
  );
}

export default App;
