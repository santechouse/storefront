"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";
import { CircleXIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

export function SearchInput() {
  const t = useTranslations("Nav");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get("q") ?? "");

  const [isPending, startTransition] = useTransition();

  function onSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    value ? params.set("q", value) : params.delete("q");

    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  }

  const handleClearInput = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setValue("");
  };

  return (
    <form onSubmit={onSearch} className="relative">
      <Input
        type="search"
        placeholder={t("searchPlaceholder")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pr-9"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClearInput}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
        >
          <CircleXIcon />
        </Button>
      )}
    </form>
  );
}
