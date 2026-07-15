import type { Question as QuestionType, Answer } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

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
  isAnswered: isAnswered,
}: QuestionProps) {
  const { description, answers } = question;

  return (
    <FieldSet>
      <FieldLegend variant="label">{description}</FieldLegend>

      <FieldGroup className="gap-3">
        {answers.map((answer: Answer, index) => {
          const isChecked = selectedAnswers.includes(answer.text);
          const id = `answer-${index}`;

          return (
            <>
              <Field
                key={index}
                orientation="horizontal"
                className={
                  "flex items-center gap-2 border p-3 rounded-xl " +
                  (isAnswered
                    ? answer.is_correct
                      ? "bg-green-500/40 border-green-700/70"
                      : isChecked
                        ? "bg-red-400/40 border-red-700/70"
                        : ""
                    : "")
                }
              >
                <Checkbox
                  id={id}
                  checked={isChecked}
                  onCheckedChange={() => onAnswerToggle(answer.text)}
                />
                <FieldLabel htmlFor={id} className="cursor-pointer select-none">
                  {answer.text}
                </FieldLabel>
              </Field>
            </>
          );
        })}
      </FieldGroup>
    </FieldSet>
  );
}
