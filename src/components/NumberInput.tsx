// plik: src/components/ui/number-input.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({
  value,
  onChange,
  min = 1,
  max = 100,
  step = 1,
}: NumberInputProps) {
  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= min && val <= max) {
      onChange(val);
    } else if (e.target.value === "") {
      onChange(min);
    }
  };

  return (
    <div className="flex items-center gap-1 border rounded-lg p-1 max-w-[140px] bg-background">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        onClick={handleDecrement}
        disabled={value <= min}
        type="button"
      >
        <IconMinus className="h-4 w-4" />
      </Button>

      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="h-8 text-center border-0 focus-visible:ring-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min={min}
        max={max}
      />

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        onClick={handleIncrement}
        disabled={value >= max}
        type="button"
      >
        <IconPlus className="h-4 w-4" />
      </Button>
    </div>
  );
}
