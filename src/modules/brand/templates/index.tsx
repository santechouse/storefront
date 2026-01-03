import RefinementList from "@/modules/store/components/refinement-list";
import PaginatedProducts from "@/modules/store/templates/paginated-products";
import { Brand } from "@/types/brand";
import { SortOptions } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import { BrandProductsHeader } from "./header";

export default function BrandProductsTemplate(props: {
  locale: string;
  q?: string;
  sortBy?: SortOptions;
  page?: string;
  brand: Brand;
  categories: HttpTypes.StoreProductCategory[];
}) {
  const { locale, q, sortBy, page, brand, categories } = props;
  return (
    <>
      <RefinementList categories={categories} />
      <div className="flex-1 min-w-0">
        <BrandProductsHeader
          brand={brand}
          categories={categories}
          sortBy={sortBy || "created_at"}
        />
        <PaginatedProducts
          locale={locale}
          q={q}
          sortBy={sortBy}
          brand_id={brand.id}
          page={Number(page || 1)}
        />
      </div>
    </>
  );
}
