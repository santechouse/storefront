import { retrieveBrand } from "@/lib/data/brands";
import { listCategories } from "@/lib/data/categories";
import BrandProductsTemplate from "@/modules/brand/templates";
import { SortOptions } from "@/types/globals";
import { Metadata } from "next";

interface Props extends PageProps<"/[locale]/products/[handle]"> {
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
    q?: string;
  }>;
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { brand } = await retrieveBrand(params.handle);
  return {
    title: `${brand.name}`,
  };
}

export default async function BrandProductsPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { brand } = await retrieveBrand(params.handle);
  const { product_categories: categories } = await listCategories({
    locale: params.locale,
    query: {
      parent_category_id: "null",
      include_descendants_tree: true,
    },
  });
  return (
    <BrandProductsTemplate
      locale={params.locale}
      q={searchParams.q}
      page={searchParams.page}
      sortBy={searchParams.sortBy}
      brand={brand}
      categories={categories}
    />
  );
}
