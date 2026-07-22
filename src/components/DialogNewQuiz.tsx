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
  customTrigger?: React.ReactElement;
}

export default function DialogNewQuiz({
  onHandleImport,
  customTrigger,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultTrigger = (
    <Button variant="outline">
      <IconPlusFilled />
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger render={customTrigger || defaultTrigger} />

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
            onChange={(e) => {
              if (fileInputRef.current) {
                onHandleImport(e, fileInputRef.current);
              }
            }}
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
