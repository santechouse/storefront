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
      className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-primary/20 bg-primary/5 active:bg-primary/10 transition-colors"
    >
      <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <LayoutGridIcon className="size-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary">{t("viewAll")}</p>
        <p className="text-xs text-primary/60 mt-0.5">{t("viewAllSub")}</p>
      </div>
    </CategoryLink>
  );
}
