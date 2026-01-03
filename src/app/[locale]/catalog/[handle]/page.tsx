import { listCategories } from "@/lib/data/categories";
import CategoryProductsTemplate from "@/modules/categories/templates/category-products";
import { SortOptions } from "@/types/globals";
import { notFound } from "next/navigation";

interface Props extends PageProps<"/[locale]/catalog/[handle]"> {
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
    q?: string;
  }>;
}

export default async function CatalogProductsPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const {
    product_categories: [category],
  } = await listCategories({
    locale: params.locale,
    query: {
      handle: decodeURIComponent(params.handle),
      include_descendants_tree: true,
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <CategoryProductsTemplate
      locale={params.locale}
      sortBy={searchParams.sortBy}
      page={searchParams.page}
      q={searchParams.q}
      category={category}
    />
  );
}
