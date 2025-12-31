"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Group, Input, NumberField, Button } from "react-aria-components";

interface CartItemSelectProps {
  defaultValue: number;
  onChange(value: number): void;
}

const CartItemSelect: React.FC<CartItemSelectProps> = ({
  defaultValue,
  onChange,
}) => {
  const [count, setCount] = React.useState(defaultValue);
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onChange(newCount);
  };
  return (
    <NumberField
      value={count}
      minValue={1}
      className="w-full max-w-40 space-y-2"
    >
      <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full min-w-0 items-center overflow-hidden rounded-md border bg-transparent text-base whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring-[3px] md:text-sm">
        <Button onClick={handleDecrement} slot="decrement">
          <MinusIcon className="size-4 ml-2" />
          <span className="sr-only">Decrement</span>
        </Button>
        <Input className="selection:bg-primary selection:text-primary-foreground w-full grow px-3 py-2 text-center tabular-nums outline-none" />
        <Button onClick={handleIncrement} slot="increment">
          <PlusIcon className="size-4 mr-2" />
          <span className="sr-only">Increment</span>
        </Button>
      </Group>
    </NumberField>
  );
};

export default CartItemSelect;
