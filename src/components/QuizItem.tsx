import { useState } from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconPlayerPlay,
  IconDice2,
  IconStar,
  IconEdit,
  IconTrashX,
  IconDots,
} from "@tabler/icons-react";

import type { Quiz } from "@/types";
import DialogDeleteQuiz from "./Dialogs/DialogDeleteQuiz";
import DialogRandomQuiz from "./Dialogs/DialogRandomQuiz";
import { uniqueRandom } from "@/lib/questionSetManager";

interface QuizItemProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz, order: number[]) => void;
  onEditQuiz: () => void;
  onDeleteQuiz: () => void;
}

export default function QuizItem({
  quiz,
  onStartQuiz,
  onEditQuiz,
  onDeleteQuiz,
}: QuizItemProps) {
  const name = quiz.name;
  const questions = quiz.questions;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const getAllIndices = () =>
    Array.from({ length: questions.length }, (_, i) => i);

  const handleStartAll = () => {
    onStartQuiz(quiz, getAllIndices());
  };

  const handleStartRandom = (count: number) => {
    onStartQuiz(quiz, uniqueRandom(questions.length, count));
  };

  const handleStartFavourites = () => {
    const favouriteIndices = questions
      .map((q, index) => (q.is_favourite ? index : -1))
      .filter((index) => index !== -1);

    if (favouriteIndices.length === 0) {
      alert("Brak ulubionych pytań w tym zestawie!");
      return;
    }
    onStartQuiz(quiz, favouriteIndices);
  };

  return (
    <>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>
            {name} ({questions.length})
          </ItemTitle>
        </ItemContent>
        <ItemActions className="flex-wrap">
          <Button variant="outline" onClick={handleStartAll}>
            <IconPlayerPlay />
            All
          </Button>

          <DialogRandomQuiz
            maxQuestions={questions.length}
            onConfirm={handleStartRandom}
            customTrigger={
              <Button variant="outline">
                <IconDice2 />
                Random
              </Button>
            }
          />

          <Button variant="outline" onClick={handleStartFavourites}>
            <IconStar />
            Favourites
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline">
                  <IconDots />
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={onEditQuiz}>
                  <IconEdit />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <IconTrashX />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      <DialogDeleteQuiz
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={onDeleteQuiz}
        message="This action cannot be undone. This will delete your project which can't be recovered unless you have a backup."
      />
    </>
  );
}
