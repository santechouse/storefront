import RefinementList from "@/modules/store/components/refinement-list";
import PaginatedProducts from "@/modules/store/templates/paginated-products";
import { SortOptions } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import { CategoryHeader } from "./header";

export default function CategoryProductsTemplate(props: {
  locale: string;
  q?: string;
  sortBy?: SortOptions;
  page?: string;
  category: HttpTypes.StoreProductCategory;
}) {
  const { locale, category, sortBy, page, q } = props;
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
        <PaginatedProducts
          locale={locale}
          q={q}
          page={pageNumber}
          sortBy={sort}
          category_id={category.id}
        />
      </div>
    </>
  );
}
