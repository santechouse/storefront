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
    <>
      <div className="mb-6  w-full">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t("header")}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
        {categories.map((category, i) => {
          return <CategoryCard category={category} key={i} />;
        })}
      </div>
    </>
  );
}
