import RefinementList from "@/modules/store/components/refinement-list";
import PaginatedProducts from "@/modules/store/templates/paginated-products";
import { SortOptions } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";

export default function SearchPageTemplate(props: {
  locale: string;
  q: string;
  sortBy?: SortOptions;
  page?: string;
  categories: HttpTypes.StoreProductCategory[];
}) {
  const { locale, sortBy, page, categories, q } = props;
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || "created_at";

  return (
    <>
      <RefinementList categories={categories} />
      <div className="flex-1 min-w-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <PaginatedProducts
            locale={locale}
            page={pageNumber}
            sortBy={sort}
            q={q}
          />
        </div>
      </div>
    </>
  );
}
