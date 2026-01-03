import { listCategories } from "@/lib/data/categories";
import { listCollections } from "@/lib/data/collections";
import CollectionsTemplate from "@/modules/collections/templates";
import { SortOptions } from "@/types/globals";
import { Metadata } from "next";

interface Props extends PageProps<"/[locale]/collections/[handle]"> {
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
    q?: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const {
    collections: [collection],
  } = await listCollections(params.locale, { handle: params.handle });

  return {
    title: `${collection.title}`,
    description: `${collection.title}`,
    openGraph: {
      title: `${collection.title} | Santechouse`,
      description: `${collection.title}`,
    },
  };
}

export default async function CollectionPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { product_categories: categories } = await listCategories({
    locale: params.locale,
    query: {
      parent_category_id: "null",
    },
  });
  const {
    collections: [collection],
  } = await listCollections(params.locale, { handle: params.handle });

  return (
    <CollectionsTemplate
      locale={params.locale}
      page={searchParams.page}
      q={searchParams.q}
      sortBy={searchParams.sortBy}
      collection={collection}
      categories={categories}
    />
  );
}
