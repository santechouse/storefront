import RefinementList from "@/modules/store/components/refinement-list";
import PaginatedProducts from "@/modules/store/templates/paginated-products";
import { SortOptions } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import { CategoryHeader } from "./header";

export default function CategoryProductsTemplate(props: {
  locale: string;
  sortBy?: SortOptions;
  page?: string;
  category: HttpTypes.StoreProductCategory;
}) {
  const { locale, category, sortBy, page } = props;
  const pageNumber = page ? parseInt(page) : 1;
  const sort = sortBy || "created_at";

  return (
    <>
      <RefinementList
        initialCategory={category}
        categories={[category, ...category.category_children]}
      />
      <div className="flex-1 min-w-0">
        <CategoryHeader sortBy={sort} category={category} />
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <PaginatedProducts
            locale={locale}
            page={pageNumber}
            sortBy={sort}
            category_id={category.id}
          />
        </div>
      </div>
    </>
  );
}
