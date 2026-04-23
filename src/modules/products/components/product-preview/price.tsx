import { VariantPrice } from "@/types/globals";
import { cn } from "@/lib/utils";

export default function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) return null;

  const isOnSale = price.price_type === "sale";

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span
        className={cn("text-sm font-semibold tabular-nums", {
          "text-primary": isOnSale,
        })}
      >
        {price.calculated_price}
      </span>
      {isOnSale && (
        <span className="text-xs tabular-nums text-muted-foreground line-through">
          {price.original_price}
        </span>
      )}
    </div>
  );
}
