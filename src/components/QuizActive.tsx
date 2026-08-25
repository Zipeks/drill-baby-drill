import { useEffect, useState } from "react";
import type { Quiz } from "@/lib/types";
import { cn } from "@/lib/utils";
import Question from "./Question";
import { Button } from "@/components/ui/button";
import {
  IconMoodCheck,
  IconMoodSad2,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress";
import GaugeChart from "./animata/graphs/gauge-chart";

interface Props {
  quiz: Quiz;
  onClose: () => void;
  order: number[];
  onToggleFavourite: (originalIndex: number) => void;
  repeatIncorrect: (quiz: Quiz, indexes: number[]) => void;
}

export default function QuizActive({
  quiz,
  onClose,
  order,
  onToggleFavourite,
  repeatIncorrect,
}: Props) {
  const [start] = useState(() => Date.now());
  const [orderIndex, setOrderIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentQuestionIndex = order[orderIndex];

  useEffect(() => {
    setProgress(((orderIndex + 1) / order.length) * 100);
  }, [orderIndex, order.length]);

  const [selectedAnswers, setSelectedAnswers] = useState<string[][]>(() =>
    Array.from({ length: order.length }, () => []),
  );

  const [questionsStatus, setQuestionsStatus] = useState<
    { answered: boolean; correctly: boolean | null }[]
  >(() =>
    Array.from({ length: order.length }, () => ({
      answered: false,
      correctly: null,
    })),
  );

  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerToggle = (answerText: string) => {
    if (questionsStatus[orderIndex].answered) return;

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

    setQuestionsStatus((prev) => {
      const next = [...prev];
      next[orderIndex] = {
        answered: true,
        correctly: isCorrect,
      };
      return next;
    });
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
  const incorrectIndexes = questionsStatus
    .map((status, index) =>
      !status.correctly && status.answered ? order[index] : null,
    )
    .filter((idx): idx is number => idx !== null);

  if (showResult) {
    let end = Date.now();

    let totalSeconds = Math.floor((end - start) / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return (
      <div className="flex flex-col gap-6 p-6 border rounded-lg w-full max-w-[600px] mx-auto mt-10 items-center">
        <h2 className="text-xl font-bold">Finished! 🎉</h2>
        <p className="text-lg">
          Your score: <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{order.length}</span>
        </p>
        <p>
          Time: {minutes !== 0 && minutes + "min"} {seconds + "s"}{" "}
        </p>
        <GaugeChart
          size={150}
          gap={100}
          progress={Math.round((score / order.length) * 100)}
          showValue={true}
        />

        {incorrectIndexes.length > 0 && (
          <Button
            onClick={() => repeatIncorrect(quiz, incorrectIndexes)}

            className="w-full"
            variant="outline"
          >
            Repeat Incorrect ({incorrectIndexes.length})
          </Button>
        )}

        <Button onClick={onClose} className="w-full">
          Return Home
        </Button>
      </div>
    );
  }

  const currentSelection = selectedAnswers[orderIndex] || [];
  const currentIsAnswered = questionsStatus[orderIndex].answered;
  const currentIsCorrect = questionsStatus[orderIndex].correctly;

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-lg w-full max-w-[600px] mx-auto mt-3 sm:mt-10">
      <div className="flex justify-between items-center flex-wrap">
        <span className="font-semibold text-lg">{quiz.name}</span>
        <div className="flex items-center justify-content-center">
          <span className="text-sm text-muted-foreground">
            Question {orderIndex + 1} out of {order.length}
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

      <div className="flex justify-between items-center">
        <Button onClick={handlePrevious} disabled={orderIndex === 0}>
          Previous
        </Button>

        <div
          className={cn(
            "border rounded-full px-3 py-1",
            currentIsCorrect
              ? "bg-green-500/40 border-green-700/70"
              : "bg-red-400/40 border-red-700/70",
            !currentIsAnswered && "invisible",
          )}
        >
          {currentIsCorrect ? (
            <p className="flex flex-row gap-2">
              <IconMoodCheck /> <span> Correct </span>
            </p>
          ) : (
            <p className="flex flex-row gap-2">
              <IconMoodSad2 /> <span> Incorrect </span>
            </p>
          )}
        </div>
        {!currentIsAnswered ? (
          <Button
            onClick={checkAnswer}
            disabled={currentSelection.length === 0}
          >
            Check
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {orderIndex < order.length - 1 ? "Next" : "End quiz"}
          </Button>
        )}
      </div>
    </div>
  );
}
