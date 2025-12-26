import { listProductsWithSort } from "@/lib/data/products";
import ProductPreview from "@/modules/products/components/product-preview";
import { SortOptions } from "@/types/globals";

interface PaginatedProductsProps {
  locale: string;
  page: number;
  category_id?: string;
  sortBy?: SortOptions;
}

export default async function PaginatedProducts({
  locale,
  page,
  category_id,
  sortBy,
}: PaginatedProductsProps) {
  const {
    response: { products },
  } = await listProductsWithSort({
    locale,
    page,
    sortBy,
    queryParams: {
      category_id: category_id,
    },
  });

  return products.map((product) => {
    return <ProductPreview key={product.id} product={product as any} />;
  });
}
