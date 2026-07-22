import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { NumberInput } from "@/components/NumberInput";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  maxQuestions: number;
  onConfirm: (amount: number) => void;
  customTrigger: React.ReactElement;
}

export default function DialogRandomQuiz({
  maxQuestions,
  onConfirm,
  customTrigger,
}: Props) {
  const [amount, setAmount] = useState(maxQuestions > 20 ? 20 : maxQuestions);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(amount);
  };
  return (
    <Dialog>
      <DialogTrigger render={customTrigger} />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Questions in random order</DialogTitle>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label className="flex justify-center items-center mt-2">
                How many?
              </Label>
              <NumberInput
                value={amount}
                onChange={setAmount}
                max={maxQuestions}
                min={1}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit">Start quiz</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
