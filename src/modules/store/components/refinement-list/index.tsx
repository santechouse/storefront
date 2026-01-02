"use client";
import { CategoryLink } from "@/modules/categories/components/category-link";
import { HttpTypes } from "@medusajs/types";
import { ChevronLeft, SlidersHorizontalIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface SidebarProps {
  initialCategory?: HttpTypes.StoreProductCategory;
  categories: HttpTypes.StoreProductCategory[];
}

const RefinementList: React.FC<SidebarProps> = ({
  initialCategory,
  categories,
}) => {
  const t = useTranslations("Filters");
  return (
    <aside className="w-full lg:w-64 shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-8">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2 ">
            <SlidersHorizontalIcon className="size-5" />
            {t("title")}
          </h3>
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-5">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">
              {t("categories")}
            </h4>
            <ul className="space-y-3">
              {initialCategory?.parent_category && (
                <li>
                  <CategoryLink
                    category={{
                      ...initialCategory.parent_category,
                      category_children: [],
                    }}
                    className="text-sm font-medium flex items-center gap-1"
                  >
                    <ChevronLeft className="size-5" />
                    {initialCategory.parent_category?.name}
                  </CategoryLink>
                </li>
              )}
              {categories.map((c) => {
                const isSelected = initialCategory?.id === c.id;
                return (
                  <li
                    key={c.id}
                    className={`ml-6 text-sm font-medium ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <CategoryLink category={{ ...c, category_children: [] }}>
                      {c.name}
                    </CategoryLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RefinementList;
