import type { Quiz } from "../types.tsx";
import QuizItem from "./QuizItem.tsx";
import DialogNewQuiz from "@/components/Dialogs/DialogNewQuiz.tsx";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parseImportedFile } from "@/lib/questionSetManager.ts";
import { EmptyQuizes } from "./EmptyQuizes.tsx";

interface Props {
  entries: Quiz[];
  onStartQuiz: (quiz: Quiz, order: number[]) => void;
  onEditQuiz: (quiz: Quiz) => void;
  onHandleImport: (newQuiz: Quiz) => void;
  onHandleCreate: () => void;
  onHandleDelete: (quiz: Quiz) => void;
}

export default function Dashboard({
  entries,
  onStartQuiz,
  onEditQuiz,
  onHandleImport,
  onHandleCreate,
  onHandleDelete,
}: Props) {
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileInputRef: HTMLInputElement,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const newQuizSet = parseImportedFile(content, file.name);

        onHandleImport(newQuizSet);
      } catch (err) {
        console.error(err);
      }

      fileInputRef.value = "";
    };

    reader.readAsText(file);
  };

  return entries.length > 0 ? (
    <Card>
      <CardHeader>
        <CardTitle>Your Questions Sets</CardTitle>
        <CardAction>
          <DialogNewQuiz
            onHandleImport={handleFileUpload}
            onHandleCreate={onHandleCreate}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-5 justify-center content-center">
          {entries.map((entry, index) => {
            return (
              <QuizItem
                key={index}
                quiz={entry}
                onStartQuiz={(quizToStart, orderArray) =>
                  onStartQuiz(quizToStart, orderArray)
                }
                onEditQuiz={() => onEditQuiz(entry)}
                onDeleteQuiz={() => onHandleDelete(entry)}
              />
            );
          })}
        </section>
      </CardContent>
    </Card>
  ) : (
    <EmptyQuizes handleFileUpload={handleFileUpload} />
  );
}
