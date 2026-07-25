import { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import type { Quiz } from "./types.tsx";
import Dashboard from "./components/Dashboard.tsx";
import QuizActive from "./components/QuizActive.tsx";
import { loadQuestions } from "./lib/questionSetManager.ts";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import EditQuiz from "./components/EditQuiz.tsx";

export function App() {
  const navigate = useNavigate();
  const [setsOfQuestions, setSetsOfQuestions] =
    useState<Quiz[]>(loadQuestions());

  const [activeQuiz, setActiveQuiz] = useState<{
    quiz: Quiz;
    order: number[];
  } | null>(null);

  const [editedQuiz, setEditedQuiz] = useState<Quiz>();
  useEffect(() => {
    localStorage.setItem("setsOfQuestions", JSON.stringify(setsOfQuestions));
  }, [setsOfQuestions]);

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

  const handleEditQuiz = (quiz: Quiz) => {
    setEditedQuiz(quiz);
    navigate("/edit");
  };

  return (
    <div className="mx-auto max-w-[1200px] w-full mt-5 sm:mt-10  px-4 flex flex-col gap-6">
      <Header
        onHandleCloseQuiz={handleCloseQuiz}
        isQuizActive={Boolean(activeQuiz)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              entries={setsOfQuestions}
              onStartQuiz={handleStartQuiz}
              onEditQuiz={(quiz) => {
                handleEditQuiz(quiz);
              }}
              onHandleImport={(newSet) =>
                setSetsOfQuestions((prev) => [...prev, newSet])
              }
            />
          }
        />
        <Route
          path="/edit"
          element={
            editedQuiz ? (
              <EditQuiz quiz={editedQuiz} />
            ) : (
              <Navigate to="/" replace />
            )
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
