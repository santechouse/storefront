import { HttpTypes } from "@medusajs/types";
import ProductRail from "./product-rail";

export type FeaturedProductsProps = {
  locale: string;
  region: HttpTypes.StoreRegion;
  collections: HttpTypes.StoreCollection[];
};

export default async function FeaturedProducts({
  locale,
  region,
  collections,
}: FeaturedProductsProps) {
  return collections.map((collection) => {
    return (
      <ProductRail
        key={collection.id}
        locale={locale}
        region={region}
        collection={collection}
      />
    );
  });
}
