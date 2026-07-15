import type { QuestionSet } from "../types.tsx";
import QuestionsSetItem from "./QuestionsSetItem.tsx";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface Props {
  entries: QuestionSet[];
  onStartQuiz: (quiz: QuestionSet) => void;
}

export default function Dashboard({ entries, onStartQuiz }: Props) {
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
              <QuestionsSetItem
                key={index}
                {...entry}
                onStartQuiz={() => onStartQuiz(entry)}
              />
            );
          })}
        </section>
      </CardContent>
    </Card>
  );
}
