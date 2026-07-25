import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import QuestionItem from "./EditQuestion";
import type { Quiz, Question } from "@/types";

interface Props {
  quiz: Quiz;
  onSave: (updatedQuiz: Quiz) => void;
}

export default function EditQuiz({ quiz }: Props) {
  const [quizName, setQuizName] = useState(quiz.name);
  const [quizType, setQuizType] = useState(quiz.type);
  const [questions, setQuizQuestions] = useState<Question[]>(
    structuredClone(quiz.questions),
  );

  const handleUpdateQuestion = (qIndex: number, updatedQuestion: Question) => {
    setQuizQuestions((prev) => {
      const next = [...prev];
      next[qIndex] = updatedQuestion;
      return next;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Quiz</CardTitle>
          <CardDescription>Manage settings and questions.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="quiz-name" className="text-sm font-medium">
              Quiz name
            </Label>
            <Input
              id="quiz-name"
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Input quiz name..."
            />
          </div>

          <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm gap-4">
            <div className="space-y-0.5">
              <Label className="text-base">Multiple choice</Label>
              <p className="text-sm text-muted-foreground">
                Allow for multiple choice questions.
              </p>
            </div>
            <Switch
              checked={quizType === "MULTIPLE_CHOICE"}
              onCheckedChange={(checked) => {
                setQuizType(checked ? "MULTIPLE_CHOICE" : "SINGLE_CHOICE");
              }}
            />
          </div>

          <div className="pt-4 border-t">
            <h3 className="mb-4 text-lg font-medium">Questions</h3>
            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <QuestionItem
                  key={qIndex}
                  question={question}
                  qIndex={qIndex}
                  quizType={quizType}
                  onUpdate={handleUpdateQuestion}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
