import { CategoryImage } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import { CategoryLink } from "../category-link";

export function CategoryCard(props: {
  category: HttpTypes.StoreProductCategory & { images?: CategoryImage[] };
}) {
  const { category } = props;
  const [image] = category.images || [];
  return (
    <CategoryLink
      category={category}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark transition-transform duration-300 group-hover:scale-105">
        {image && (
          <Image
            alt={category.name}
            src={image.url}
            className="object-cover"
            fill
          />
        )}
      </div>
      <h3 className="mt-4 text-base font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">
        {category.name}
      </h3>
    </CategoryLink>
  );
}
