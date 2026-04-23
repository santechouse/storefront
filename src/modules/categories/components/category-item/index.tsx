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
  const hasChildren = category.category_children.length > 0;

  return (
    <CategoryLink
      category={category}
      className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-border bg-background active:bg-muted/40 transition-colors"
    >
      {image && (
        <div className="relative size-12 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
          <Image
            src={image.url}
            alt={category.name}
            className="object-cover"
            fill
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </p>
        {category.category_children.length > 0 && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {category.category_children.map((c) => c.name).join(", ")}
          </p>
        )}
      </div>
      {hasChildren && (
        <ArrowRightIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 opacity-60" />
      )}
    </CategoryLink>
  );
}
