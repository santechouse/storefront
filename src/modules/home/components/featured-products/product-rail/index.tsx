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

  if (!products) {
    return null;
  }

  return (
    <section className="flex flex-col gap-8">
      <Link
        href={`/collections/${collection.handle}`}
        className="flex justify-between sm:justify-start items-end gap-2"
      >
        <h2 className="text-xl text-primary sm:text-2xl font-bold">
          {collection.title}
        </h2>
        <ArrowRight className="size-6 sm:size-7 stroke-2" />
      </Link>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => {
          return <ProductPreview key={product.id} product={product as any} />;
        })}
      </div>
    </section>
  );
}
