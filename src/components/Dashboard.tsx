import type { Quiz } from "../types.tsx";
import QuizItem from "./QuizItem.tsx";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  entries: Quiz[];
  onStartQuiz: (quiz: Quiz, order: number[]) => void;
  onEditQuiz: (quiz: Quiz) => void;
}

export default function Dashboard({ entries, onStartQuiz, onEditQuiz }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Questions Sets</CardTitle>
        <CardAction>Add another</CardAction>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-5 justify-center content-center">
          {entries.map((entry, index) => {
            return (
              <QuizItem
                key={index}
                quiz={entry}
                onStartQuiz={(quizToStart, orderArray) => onStartQuiz(quizToStart, orderArray)}
                onEditQuiz={() => onEditQuiz(entry)}
              />
            );
          })}
        </section>
      </CardContent>
    </Card>
  );
}
