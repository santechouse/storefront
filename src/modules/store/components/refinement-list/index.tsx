"use client";
import { CategoryLink } from "@/modules/categories/components/category-link";
import { HttpTypes } from "@medusajs/types";
import { ChevronLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface SidebarProps {
  initialCategory?: HttpTypes.StoreProductCategory;
  categories: HttpTypes.StoreProductCategory[];
}

function RefinementList({
  initialCategory,
  categories,
}: SidebarProps) {
  const t = useTranslations("Filters");
  return (
    <aside className="w-full lg:w-56 shrink-0 hidden lg:block">
      <div className="sticky top-24">
        <div className="mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("categories")}
          </span>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {initialCategory?.parent_category && (
            <CategoryLink
              category={{
                ...initialCategory.parent_category,
                category_children: [],
              }}
              className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <ChevronLeftIcon className="size-3.5 opacity-60" />
              <span>{initialCategory.parent_category.name}</span>
            </CategoryLink>
          )}
          {categories.map((c) => {
            const isSelected = initialCategory?.id === c.id;
            return (
              <CategoryLink
                key={c.id}
                category={{ ...c, category_children: [] }}
                className={`flex items-center px-4 py-3 text-sm transition-colors ${
                  isSelected
                    ? "text-primary font-medium bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {c.name}
              </CategoryLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default RefinementList;
