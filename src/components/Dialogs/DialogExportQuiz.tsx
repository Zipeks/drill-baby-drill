import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FileType } from "@/lib/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onHandleExport: (fileType: FileType) => void;
}

export default function DialogExportQuiz({
  open,
  onOpenChange,
  onHandleExport,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export quiz</DialogTitle>
          <DialogDescription>Select export type</DialogDescription>
        </DialogHeader>

        <div className="flex flex-row justify-center">
          <div className="flex flex-row gap-3">
            <HoverCard>
              <HoverCardTrigger
                delay={10}
                closeDelay={100}
                render={
                  <Button
                    variant="outline"
                    onClick={() => onHandleExport("TXT")}
                  >
                    Simple
                  </Button>
                }
              />
              <HoverCardContent className="flex w-64 flex-col gap-0.5">
                <div className="font-semibold">Simple</div>
                <div>Export only questions and answers.</div>
                <div className="mt-1 text-xs text-muted-foreground">.txt</div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger
                delay={10}
                closeDelay={100}
                render={
                  <Button
                    variant="outline"
                    onClick={() => onHandleExport("JSON")}
                  >
                    Full
                  </Button>
                }
              />
              <HoverCardContent className="flex w-64 flex-col gap-0.5">
                <div className="font-semibold">Full</div>
                <div>
                  Export whole quiz including your favourites, stats etc.
                </div>
                <div className="mt-1 text-xs text-muted-foreground">.json</div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
