import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IconTrashX, IconPlus, IconX } from "@tabler/icons-react";
import { type Question } from "@/lib/types";
import { createEmptyAnswer } from "@/lib/questionSetManager";
import { useState } from "react";
import DialogDeleteQuiz from "./Dialogs/DialogDeleteQuiz";

interface QuestionItemProps {
  question: Question;
  qIndex: number;
  quizType: "SINGLE_CHOICE" | "MULTIPLE_CHOICE";
  onUpdate: (qIndex: number, updatedQuestion: Question) => void;
  onDelete: (qIndex: number) => void;
}

export default function QuestionItem({
  question,
  qIndex,
  quizType,
  onUpdate,
  onDelete,
}: QuestionItemProps) {
  const [dialogDeleteQuestion, setDialogDeleteQuestion] = useState(false);

  const handleDescChange = (newDesc: string) => {
    onUpdate(qIndex, { ...question, description: newDesc });
  };

  const handleAnswerTextChange = (aIndex: number, newText: string) => {
    const nextAnswers = [...question.answers];
    nextAnswers[aIndex] = { ...nextAnswers[aIndex], text: newText };
    onUpdate(qIndex, { ...question, answers: nextAnswers });
  };

  const handleAnswerCorrectChange = (aIndex: number, isCorrect: boolean) => {
    let nextAnswers = [...question.answers];

    if (quizType === "SINGLE_CHOICE" && isCorrect) {
      nextAnswers = nextAnswers.map((ans, i) => ({
        ...ans,
        is_correct: i === aIndex,
      }));
    } else {
      nextAnswers[aIndex] = { ...nextAnswers[aIndex], is_correct: isCorrect };
    }

    onUpdate(qIndex, { ...question, answers: nextAnswers });
  };

  const handleAnswerDelete = (aIndex: number) => {
    const nextAnswers = question.answers.filter((_, i) => i !== aIndex);
    onUpdate(qIndex, { ...question, answers: nextAnswers });
  };

  const handleAnswerAdd = () => {
    onUpdate(qIndex, {
      ...question,
      answers: [...question.answers, createEmptyAnswer()],
    });
  };

  return (
    <>
      <div className="rounded-lg border p-4 bg-muted/10 shadow-sm">
        <div className="flex justify-between mb-1 align-center mb-2">
          <span className="text-sm font-semibold text-muted-foreground block">
            Question {qIndex + 1}
          </span>
          <Button
            size="sm"
            type="button"
            variant="destructive"
            onClick={() =>
              question.description.length > 0
                ? setDialogDeleteQuestion(true)
                : onDelete(qIndex)
            }
          >
            <IconX />
          </Button>
        </div>
        <Input
          type="text"
          value={question.description}
          onChange={(e) => handleDescChange(e.target.value)}
          placeholder="Question description"
          className="mb-4 font-medium"
        />

        <div className="space-y-3 pl-2 border-l-2 border-muted">
          {question.answers.map((answer, aIndex) => (
            <div key={aIndex} className="flex items-center gap-3">
              <Checkbox
                checked={answer.is_correct}
                onCheckedChange={(checked) =>
                  handleAnswerCorrectChange(aIndex, !!checked)
                }
              />
              <Input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerTextChange(aIndex, e.target.value)}
                className={
                  answer.is_correct
                    ? "border-green-500/50 bg-green-500/20 focus-visible:ring-green-500/8"
                    : ""
                }
                placeholder={
                  answer.is_correct
                    ? "Example correct answer."
                    : "Example wrong answer."
                }
              />
              <Button
                variant="destructive"
                type="button"
                size="sm"
                onClick={() => handleAnswerDelete(aIndex)}
              >
                <IconTrashX className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex">
            <Button
              type="button"
              onClick={handleAnswerAdd}
              className="w-full"
              variant="outline"
              size="sm"
            >
              <IconPlus className="h-4 w-4 mr-2" /> Add Answer
            </Button>
          </div>
        </div>

        <DialogDeleteQuiz
          open={dialogDeleteQuestion}
          onConfirmDelete={() => onDelete(qIndex)}
          onOpenChange={setDialogDeleteQuestion}
          message="This question is not empty."
        />
      </div>
    </>
  );
}
