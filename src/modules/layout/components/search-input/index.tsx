"use client";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

export function SearchInput() {
  const t = useTranslations("Nav");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get("q") ?? "");
  const [, startTransition] = useTransition();

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set("q", value) : params.delete("q");
    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={onSearch} className="relative flex w-full items-center">
      <Input
        placeholder={t("searchPlaceholder")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={value ? "pr-8" : ""}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
        </button>
      )}
    </form>
  );
}
