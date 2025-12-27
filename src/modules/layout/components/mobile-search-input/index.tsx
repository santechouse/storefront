"use client";

import { ArrowLeftIcon } from "lucide-react";
import { SearchInput } from "../search-input";
import { Button } from "@/components/ui/button";

type Props = {
  onClose(): void;
};

export function MobileSearchInput({ onClose }: Props) {
  return (
    <div className="sticky top-0 z-100 w-full px-4 py-4 md:px-6 lg:px-8 flex justify-center backdrop-blur-md bg-white dark:bg-background border-b border-slate-200 dark:border-[#282e39]/50">
      <div className="flex items-center flex-1">
        <Button size="icon" variant="ghost" className="mr-2" onClick={onClose}>
          <ArrowLeftIcon />
        </Button>
        <div className="flex flex-col w-full">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
