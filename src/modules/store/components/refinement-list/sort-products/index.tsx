"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOptions } from "@/types/globals";
import { useTranslations } from "next-intl";

type SortProductsProps = {
  sortBy: SortOptions;
  setQueryParams: (name: string, value: SortOptions) => void;
};

export function SortProducts({ sortBy, setQueryParams }: SortProductsProps) {
  const t = useTranslations("SortOption");
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value);
  };

  const sortOptions = [
    {
      value: "created_at",
      label: t("lastArrivals"),
    },
    {
      value: "price_asc",
      label: t("lowPrice"),
    },
    {
      value: "price_desc",
      label: t("highPrice"),
    },
  ];

  return (
    <Select defaultValue="created_at" onValueChange={handleChange}>
      <SelectTrigger className="bg-white dark:dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent
        className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 "
        align="end"
        position="popper"
      >
        <SelectGroup>
          {sortOptions.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
