import { CategoryImage } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { CategoryLink } from "../category-link";

export function CategoryItem(props: {
  category: HttpTypes.StoreProductCategory & { images?: CategoryImage[] };
}) {
  const { category } = props;
  const [image] = category.images || [];
  return (
    <CategoryLink
      category={category}
      className="group flex flex-col gap-4 p-5 bg-white dark:bg-[#1a202c] rounded-xl border border-[#e7ebf4] dark:border-[#2a3447] shadow-sm hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300"
    >
      {image && (
        <div className="flex justify-between items-start">
          <div className="relative overflow-hidden size-14 rounded-lg flex items-center justify-center text-primary  transition-colors">
            <Image
              src={image.url}
              alt={category.name}
              className="object-cover"
              fill
            />
          </div>
          <span className="text-[#94a3b8] group-hover:text-primary transition-colors material-symbols-outlined text-[20px]">
            {!!category.category_children.length && <ArrowRightIcon />}
          </span>
        </div>
      )}
      <div>
        <h3 className="text-lg font-bold text-[#0d121c] dark:text-white">
          {category.name}
        </h3>
        <p className="text-sm text-[#49659c] dark:text-gray-400 line-clamp-1">
          {category.category_children.map((c) => c.name).join(", ")}
        </p>
      </div>
    </CategoryLink>
  );
}
