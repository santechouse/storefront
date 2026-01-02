import RefinementList from "@/modules/store/components/refinement-list";
import PaginatedProducts from "@/modules/store/templates/paginated-products";
import { SortOptions } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import { CollectionHeader } from "./header";

export default function CollectionsTemplate(props: {
  locale: string;
  q?: string;
  sortBy?: SortOptions;
  page?: string;
  collection: HttpTypes.StoreCollection;
  categories: HttpTypes.StoreProductCategory[];
}) {
  const { locale, q, sortBy, page, collection, categories } = props;
  return (
    <>
      <RefinementList categories={categories} />
      <CollectionHeader
        collection={collection}
        categories={categories}
        sortBy={sortBy || "created_at"}
      />
      <div className="flex-1 min-w-0">
        <PaginatedProducts
          locale={locale}
          q={q}
          sortBy={sortBy}
          page={Number(page || 1)}
          collection_id={collection.id}
        />
      </div>
    </>
  );
}
