import { cn } from "@/lib/utils";
import { getProductPrice } from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct;
  variant?: HttpTypes.StoreProductVariant;
}) {
  const t = useTranslations("Product");
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="h-9 w-32 rounded-md bg-muted animate-pulse" />;
  }

  const isOnSale = selectedPrice.price_type === "sale";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2">
        <span
          className={cn("text-xl font-bold tabular-nums tracking-[-0.033em]", {
            "text-primary": isOnSale,
          })}
        >
          {!variant && (
            <span className="text-sm font-normal text-muted-foreground mr-1">
              {t("from")}
            </span>
          )}
          <span data-value={selectedPrice.calculated_price_number}>
            {selectedPrice.calculated_price}
          </span>
        </span>

        {isOnSale && (
          <span
            className="text-sm line-through text-muted-foreground tabular-nums"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        )}
      </div>

      {isOnSale && (
        <span className="inline-flex w-fit items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
          −{selectedPrice.percentage_diff}%
        </span>
      )}
    </div>
  );
}
