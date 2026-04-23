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
    { value: "created_at", label: t("lastArrivals") },
    { value: "price_asc", label: t("lowPrice") },
    { value: "price_desc", label: t("highPrice") },
  ];

  return (
    <Select defaultValue={sortBy || "created_at"} onValueChange={handleChange}>
      <SelectTrigger className="h-8 text-xs border-border bg-background text-foreground">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" position="popper">
        <SelectGroup>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-xs">
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
