import { Link } from "@/i18n/navigation";
import { getProductPrice } from "@/lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import PreviewPrice from "./price";
import { PayloadProduct } from "@/types/payload";
import { Brand } from "@/types/brand";
import Thumbnail from "../thumbnail";
import AddToCart from "./add-to-cart";

export type ProductPreviewProps = {
  product: HttpTypes.StoreProduct & {
    payload_product: PayloadProduct;
    brand: Brand;
  };
};

export default async function ProductPreview({ product }: ProductPreviewProps) {
  const { cheapestPrice } = getProductPrice({ product });
  const isOnSale = cheapestPrice?.price_type === "sale";

  return (
    <div className="group flex flex-col h-full rounded-2xl border border-border overflow-hidden bg-background transition-colors hover:border-border/80">
      <Link href={`/products/${product.handle}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative aspect-square w-full bg-muted/30 overflow-hidden">
          <Thumbnail thumbnail={product.thumbnail} />
          {isOnSale && (
            <div className="absolute top-2.5 left-2.5 inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
              −{cheapestPrice!.percentage_diff}%
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5 px-3 pt-3 pb-2">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
            {product.title}
          </h3>
          {product.brand?.name && (
            <span className="text-xs text-muted-foreground line-clamp-1">
              {product.brand.name}
            </span>
          )}
          {cheapestPrice && (
            <div className="mt-1.5">
              <PreviewPrice price={cheapestPrice} />
            </div>
          )}
        </div>
      </Link>

      {/* Add to cart */}
      <div className="px-3 pb-3">
        <AddToCart product={product} />
      </div>
    </div>
  );
}
