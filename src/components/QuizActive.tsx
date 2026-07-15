import { useState } from "react";
import type { QuestionSet } from "@/types";
import Question from "./Question";
import { Button } from "@/components/ui/button";

interface QuizActiveProps {
  quiz: QuestionSet;
  onClose: () => void;
}

export default function QuizActive({ quiz, onClose }: QuizActiveProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<string[][]>(() =>
    Array.from({ length: quiz.questions.length }, () => []),
  );

  const [isAnswered, setIsAnswered] = useState<boolean[]>(() =>
    new Array(quiz.questions.length).fill(false),
  );

  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerToggle = (answerText: string) => {
    if (isAnswered[currentQuestionIndex]) return;

    setSelectedAnswers((prev) => {
      const next = [...prev];

      if (quiz.type === "SINGLE_CHOICE") {
        next[currentQuestionIndex] = [answerText];
      } else {
        const currentSelection = next[currentQuestionIndex] || [];
        next[currentQuestionIndex] = currentSelection.includes(answerText)
          ? currentSelection.filter((text) => text !== answerText)
          : [...currentSelection, answerText];
      }

      return next;
    });
  };

  const checkAnswer = () => {
    setIsAnswered((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = true;
      return next;
    });

    const correctAnswers = currentQuestion.answers
      .filter((a) => a.is_correct)
      .map((a) => a.text);

    const currentSelection = selectedAnswers[currentQuestionIndex] || [];

    const isCorrect =
      currentSelection.length === correctAnswers.length &&
      currentSelection.every((ans) => correctAnswers.includes(ans));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="flex flex-col gap-6 p-6 border rounded-lg w-full max-w-[600px] mx-auto mt-10">
        <h2 className="text-xl font-bold">Finished! 🎉</h2>
        <p className="text-lg">
          Your score: <span className="font-bold">{score}</span> z{" "}
          <span className="font-bold">{quiz.questions.length}</span>
        </p>
        <Button onClick={onClose} className="w-full">
          Return Home
        </Button>
      </div>
    );
  }

  const currentSelection = selectedAnswers[currentQuestionIndex] || [];
  const currentIsAnswered = isAnswered[currentQuestionIndex];

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-lg w-full max-w-[600px] mx-auto mt-10">
      <div className="flex justify-between items-center border-b pb-2">
        <span className="font-semibold text-lg">{quiz.name}</span>
        <span className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} out of {quiz.questions.length}
        </span>
      </div>

      <Question
        question={currentQuestion}
        selectedAnswers={currentSelection}
        onAnswerToggle={handleAnswerToggle}
        isAnswered={currentIsAnswered}
      />

      <div className="flex justify-between mt-4">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>

        {!currentIsAnswered ? (
          <Button
            onClick={checkAnswer}
            disabled={currentSelection.length === 0}
          >
            Check
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentQuestionIndex < quiz.questions.length - 1
              ? "Next"
              : "End quiz"}
          </Button>
        )}
      </div>
    </div>
  );
}
