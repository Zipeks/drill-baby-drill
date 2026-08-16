import type { Question as QuestionType, Answer } from "@/lib/types";
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
interface QuestionProps {
  question: QuestionType;
  selectedAnswers: string[];
  onAnswerToggle: (answerText: string) => void;
  isAnswered: boolean;
}

export default function Question({
  question,
  selectedAnswers,
  onAnswerToggle,
  isAnswered,
}: QuestionProps) {
  const { description, answers } = question;

  return (
    <FieldSet>
      <FieldLegend variant="label" className="text-base font-semibold mb-3">
        {description}
      </FieldLegend>

      <FieldGroup className="gap-2.5">
        {answers.map((answer: Answer, index) => {
          const isChecked = selectedAnswers.includes(answer.text);

          return (
            <Field
              key={index}
              orientation="horizontal"
              className={cn(
                "flex items-center gap-3 border p-3.5 rounded-xl transition-all select-none text-sm font-medium",

                !isAnswered && [
                  "cursor-pointer hover:bg-muted/60",
                  isChecked
                    ? "border-primary bg-primary/10 ring-2 ring-primary shadow-sm"
                    : "border-border bg-card",
                ],

                isAnswered && [
                  "cursor-default pointer-events-none",
                  answer.is_correct &&
                    "bg-green-500/20 border-green-600 text-green-800 dark:text-green-300 font-semibold",
                  !answer.is_correct &&
                    isChecked &&
                    "bg-red-500/20 border-red-600 text-red-800 dark:text-red-300 line-through opacity-80",
                  !answer.is_correct &&
                    !isChecked &&
                    "opacity-50 border-border bg-muted/20",
                ],
              )}
              onClick={() => !isAnswered && onAnswerToggle(answer.text)}
            >
              <span>{answer.text}</span>
            </Field>
          );
        })}
      </FieldGroup>
    </FieldSet>
  );
}
