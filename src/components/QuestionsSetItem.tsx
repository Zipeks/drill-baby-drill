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
import type { QuestionSet } from "@/types";

interface QuestionsSetItemProps extends QuestionSet {
  onStartQuiz: () => void;
}

export default function QuestionsSetItem({
  name,
  questions,
  onStartQuiz,
}: QuestionsSetItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>
          {name} ({questions.length})
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline">Open</Button>}
            />
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onStartQuiz}>
                <IconPlayerPlay />
                All
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconDice2 />
                Random
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <IconStar />
                Favourites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
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
  );
}
