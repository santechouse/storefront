import { Link } from "@/i18n/navigation";
import { getProductPrice } from "@/lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import PreviewPrice from "./price";
import { PayloadProduct } from "@/types/payload";
import { Brand } from "@/types/brand";
import Thumbnail from "../thumbnail";

export type ProductPreviewProps = {
  product: HttpTypes.StoreProduct & {
    payload_product: PayloadProduct;
    brand: Brand;
  };
};

export default async function ProductPreview({ product }: ProductPreviewProps) {
  const { cheapestPrice } = getProductPrice({ product });
  return (
    <Link href={`/products/${product.handle}`}>
      <div className="group flex flex-col gap-4 bg-transparent">
        <div className="relative aspect-6/7 w-full overflow-hidden rounded-xl">
          <Thumbnail thumbnail={product.thumbnail} />
        </div>
        <div className="flex flex-col">
          <h3 className="h-8 text-sm line-clamp-2 font-bold leading-tight ">
            {product.title}
          </h3>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-secondary-foreground text-sm line-clamp-1">
              {product.brand?.name}
            </p>
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </Link>
  );
}
