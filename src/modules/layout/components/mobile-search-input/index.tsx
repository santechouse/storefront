"use client";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchInput } from "../search-input";
import { Button } from "@/components/ui/button";

type Props = {
  onClose(): void;
};

export function MobileSearchInput({ onClose }: Props) {
  return (
    <div className="sticky top-0 z-50 w-full px-4 py-4 md:px-6 lg:px-8 flex items-center gap-2 backdrop-blur-md bg-background border-b border-border">
      <Button size="icon" variant="ghost" onClick={onClose}>
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5" />
      </Button>
      <div className="flex-1">
        <SearchInput />
      </div>
    </div>
  );
}
