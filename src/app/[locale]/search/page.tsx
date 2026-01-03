import { listCategories } from "@/lib/data/categories";
import SearchPageTemplate from "@/modules/search/templates";
import { SortOptions } from "@/types/globals";

interface Props extends PageProps<"/[locale]"> {
  searchParams: Promise<{
    q: string;
    page: string;
    sortBy: SortOptions;
  }>;
}

export default async function SearchPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { product_categories: categories } = await listCategories({
    locale: params.locale,
    query: {
      parent_category_id: "null",
    },
  });
  return (
    <SearchPageTemplate
      locale={params.locale}
      q={searchParams.q}
      sortBy={searchParams.sortBy}
      page={searchParams.page}
      categories={categories}
    />
  );
}
