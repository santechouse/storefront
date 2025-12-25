import { HttpTypes } from "@medusajs/types";
import { LayoutGridIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { CategoryLink } from "../category-link";

type Props = {
  category: HttpTypes.StoreProductCategory;
};

export function CategoryViewAll({ category }: Props) {
  const t = useTranslations("Catalog");
  return (
    <CategoryLink
      category={{ ...category, category_children: [] }}
      className="group flex flex-col gap-4 p-5 bg-white dark:bg-[#1a202c] rounded-xl border border-[#e7ebf4] dark:border-[#2a3447] shadow-sm hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <LayoutGridIcon />
        </div>
        <span className="text-[#94a3b8] group-hover:text-primary transition-colors material-symbols-outlined text-[20px]"></span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#0d121c] dark:text-white mb-1">
          {t("viewAll")}
        </h3>
        <p className="text-sm text-[#49659c] dark:text-gray-400 line-clamp-1"></p>
      </div>
    </CategoryLink>
  );
}
