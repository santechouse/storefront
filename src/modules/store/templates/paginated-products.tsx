import { listProductsWithSort } from "@/lib/data/products";
import ProductPreview from "@/modules/products/components/product-preview";
import { SortOptions } from "@/types/globals";
import { ProductPagination } from "../components/pagination";

interface PaginatedProductsProps {
  locale: string;
  page: number;
  q?: string;
  category_id?: string;
  sortBy?: SortOptions;
}

const PRODUCT_LIMIT = 100;

export default async function PaginatedProducts({
  locale,
  page,
  q,
  category_id,
  sortBy,
}: PaginatedProductsProps) {
  const {
    response: { products, count },
  } = await listProductsWithSort({
    locale,
    page,
    sortBy,
    queryParams: {
      q,
      limit: PRODUCT_LIMIT,
      category_id: category_id,
    },
  });

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        return <ProductPreview key={product.id} product={product as any} />;
      })}
      <div className="col-span-2 lg:col-span-3  xl:col-span-4">
        <ProductPagination totalPages={totalPages} currentPage={page} />
      </div>
    </div>
  );
}
