"use client";
import { CategoryImage } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import { CategoryItem } from "../../components/category-item";
import { CategoryViewAll } from "../../components/category-item/view-all";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

type Props = {
  category: HttpTypes.StoreProductCategory & { images?: CategoryImage[] };
};

export default function CategoryListTemplate({ category }: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1 gap-6 w-full">
      <div className="flex flex-col gap-2">
        <button
          onClick={router.back}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeftIcon />
          <h1 className="text-xl font-bold tracking-[-0.033em] text-foreground">
            {category.name}
          </h1>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-8">
        <CategoryViewAll category={category} />
        {category.category_children.map((child) => (
          <CategoryItem key={child.id} category={child} />
        ))}
      </div>
    </div>
  );
}
