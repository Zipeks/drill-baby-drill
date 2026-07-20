import { useEffect, useState } from "react";
import type { Quiz } from "@/types";
import Question from "./Question";
import { Button } from "@/components/ui/button";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress";

interface QuizActiveProps {
  quiz: Quiz;
  onClose: () => void;
  order: number[];
  onToggleFavourite: (originalIndex: number) => void;
}

export default function QuizActive({
  quiz,
  onClose,
  order,
  onToggleFavourite,
}: QuizActiveProps) {
  const [orderIndex, setOrderIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    order[orderIndex],
  );
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(((orderIndex + 1) / order.length) * 100);
  }, [orderIndex]);
  useEffect(() => {
    setCurrentQuestionIndex(order[orderIndex]);
  }, [orderIndex]);

  const [selectedAnswers, setSelectedAnswers] = useState<string[][]>(() =>
    Array.from({ length: order.length }, () => []),
  );

  const [isAnswered, setIsAnswered] = useState<boolean[]>(() =>
    new Array(order.length).fill(false),
  );

  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerToggle = (answerText: string) => {
    if (isAnswered[orderIndex]) return;

    setSelectedAnswers((prev) => {
      const next = [...prev];

      if (quiz.type === "SINGLE_CHOICE") {
        next[orderIndex] = [answerText];
      } else {
        const currentSelection = next[orderIndex] || [];
        next[orderIndex] = currentSelection.includes(answerText)
          ? currentSelection.filter((text) => text !== answerText)
          : [...currentSelection, answerText];
      }

      return next;
    });
  };

  const checkAnswer = () => {
    setIsAnswered((prev) => {
      const next = [...prev];
      next[orderIndex] = true;
      return next;
    });

    const correctAnswers = currentQuestion.answers
      .filter((a) => a.is_correct)
      .map((a) => a.text);

    const currentSelection = selectedAnswers[orderIndex] || [];

    const isCorrect =
      currentSelection.length === correctAnswers.length &&
      currentSelection.every((ans) => correctAnswers.includes(ans));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (orderIndex > 0) {
      setOrderIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (orderIndex < order.length - 1) {
      setOrderIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="flex flex-col gap-6 p-6 border rounded-lg w-full max-w-[600px] mx-auto mt-10">
        <h2 className="text-xl font-bold">Finished! 🎉</h2>
        <p className="text-lg">
          Your score: <span className="font-bold">{score}</span> out of{" "}
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
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg">{quiz.name}</span>
        <div className="flex items-center justify-content-center">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} out of {order.length}
          </span>
          <Button
            className="bg-transparent text-muted-foreground p-1 hover:bg-transparent"
            onClick={() => onToggleFavourite(currentQuestionIndex)}
          >
            {currentQuestion.is_favourite ? <IconStarFilled /> : <IconStar />}
          </Button>
        </div>
      </div>
      <Progress value={progress} className="border-b h-5px" />
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
