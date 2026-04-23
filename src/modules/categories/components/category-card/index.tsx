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
      className="group flex flex-col items-center gap-3"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted transition-colors group-hover:border-primary/40">
        {image && (
          <Image
            alt={category.name}
            src={image.url}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            fill
          />
        )}
      </div>
      <p className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors leading-tight">
        {category.name}
      </p>
    </CategoryLink>
  );
}
