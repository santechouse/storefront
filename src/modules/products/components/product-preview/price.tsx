import { VariantPrice } from "@/types/globals";
import { cn } from "@/lib/utils";

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className={cn("font-bold text-sm", {
          "text-primary": price.price_type === "sale",
        })}
      >
        {price.calculated_price}
      </span>
      {price.price_type === "sale" && (
        <span className="text-muted-foreground text-xs line-through decoration-muted-foreground/50">
          {price.original_price}
        </span>
      )}
    </div>
  );
}
