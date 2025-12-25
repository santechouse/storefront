import { CategoryImage } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import { CategoryItem } from "../../components/category-item";
import { CategoryViewAll } from "../../components/category-item/view-all";

type Props = {
  category: HttpTypes.StoreProductCategory & { images?: CategoryImage[] };
};

export default function CategoryListTemplate({ category }: Props) {
  return (
    <div className="flex flex-col flex-1 gap-6 w-full">
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between pb-2">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-[#0d121c] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.033em]">
            {category.name}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
        <CategoryViewAll category={category} />
        {category.category_children.map((child) => {
          return <CategoryItem key={child.id} category={child} />;
        })}
      </div>
    </div>
  );
}
