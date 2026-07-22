import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import DialogNewQuiz from "./DialogNewQuiz";
import { IconCirclePlus } from "@tabler/icons-react";
interface Props {
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    fileInputRef: HTMLInputElement,
  ) => void;
}
export function EmptyQuizes({ handleFileUpload }: Props) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Quizes Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any quizes yet. Get started by creating or
          importing your first quiz.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <DialogNewQuiz
          onHandleImport={handleFileUpload}
          customTrigger={
            <Button>
              <IconCirclePlus />
              Add quiz
            </Button>
          }
        />
      </EmptyContent>
    </Empty>
  );
}
