import { useTranslations } from "next-intl";
import { CategoryCard } from "../components/category-card";
import { HttpTypes } from "@medusajs/types";
import CategoryListTemplate from "./category-list";

type Props = {
  categories: HttpTypes.StoreProductCategory[];
  category?: HttpTypes.StoreProductCategory;
};

export default function CatalogTemplate({ categories, category }: Props) {
  const t = useTranslations("Catalog");

  if (category) {
    return <CategoryListTemplate category={category} />;
  }

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-[-0.033em] text-foreground">
          {t("header")}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {categories.map((category, i) => (
          <CategoryCard category={category} key={i} />
        ))}
      </div>
    </div>
  );
}
