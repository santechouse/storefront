import { Link } from "@/i18n/navigation";
import { listProducts } from "@/lib/data/products";
import ProductPreview from "@/modules/products/components/product-preview";
import { HttpTypes } from "@medusajs/types";
import { ArrowRight } from "lucide-react";

export type ProductRailProps = {
  locale: string;
  collection: HttpTypes.StoreCollection;
  region: HttpTypes.StoreRegion;
};

export default async function ProductRail({
  locale,
  collection,
  region,
}: ProductRailProps) {
  const {
    response: { products },
  } = await listProducts({
    locale,
    regionId: region.id,
    queryParams: { collection_id: collection.id, fields: "*brand" },
  });

  if (!products?.length) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight">{collection.title}</h2>
        <Link
          href={`/collections/${collection.handle}`}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 active:text-primary/60 transition-colors"
        >
          <span>Все</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductPreview key={product.id} product={product as any} />
        ))}
      </div>
    </section>
  );
}
