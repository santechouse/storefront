import { listProducts } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import ProductActions from "@modules/products/components/product-actions";
import { getLocale } from "next-intl/server";

export default async function ProductActionsWrapper({
  id,
  region,
}: {
  id: string;
  region: HttpTypes.StoreRegion;
}) {
  const locale = await getLocale();
  const product = await listProducts({
    locale: locale,
    queryParams: { id: [id] },
    regionId: region.id,
  }).then(({ response }) => response.products[0]);

  if (!product) {
    return null;
  }

  return <ProductActions locale={locale} product={product} />;
}
