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
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  IconPlayerPlay,
  IconDice2,
  IconStar,
  IconEdit,
  IconTrashX,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { NumberInput } from "@/components/NumberInput";
import { Label } from "@/components/ui/label";
import type { Quiz } from "@/types";
import { uniqueRandom } from "@/questionSetManager";

interface QuizItemProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz, order: number[]) => void;
  onEditQuiz: () => void;
}

export default function QuizItem({
  quiz,
  onStartQuiz,
  onEditQuiz,
}: QuizItemProps) {
  const name = quiz.name;
  const questions = quiz.questions;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRandomDialog, setShowRandomDialog] = useState(false);

  const [randomQuestionsAmount, setRandomQuestionsAmount] = useState(
    20 < questions.length ? 20 : questions.length,
  );
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
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline">Open</Button>}
            />
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleStartAll}>
                <IconPlayerPlay />
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowRandomDialog(true)}>
                <IconDice2 />
                Random
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleStartFavourites}>
                <IconStar />
                Favourites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onEditQuiz}>
                <IconEdit />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <IconTrashX />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will delete your project
                  which can't be recovered unless you have a backup.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ItemActions>
      </Item>

      <Dialog open={showRandomDialog} onOpenChange={setShowRandomDialog}>
        <form>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Questions in random order</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">How many?</Label>
                <NumberInput
                  value={randomQuestionsAmount}
                  onChange={setRandomQuestionsAmount}
                  max={questions.length}
                ></NumberInput>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button
                type="submit"
                onClick={() => handleStartRandom(randomQuestionsAmount)}
              >
                Start quiz
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
