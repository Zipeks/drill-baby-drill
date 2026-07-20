import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  IconPlusFilled,
  IconFileUpload,
  IconNewSection,
} from "@tabler/icons-react";

import { useRef } from "react";

interface Props {
  onHandleImport: (
    event: React.ChangeEvent<HTMLInputElement>,
    fileInputRef: HTMLInputElement,
  ) => void;
}

export default function DialogNewQuiz({ onHandleImport }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline">
            <IconPlusFilled />{" "}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New quiz</DialogTitle>
          <DialogDescription>Import or create new quiz?</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 justify-center">
          <input
            type="file"
            accept=".txt,.json"
            ref={fileInputRef}
            className="hidden"
            onChange={onHandleImport}
          />

          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <IconFileUpload />
            Import
          </Button>
          <Button variant="outline">
            <IconNewSection />
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
