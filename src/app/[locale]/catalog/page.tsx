import { listCategories } from "@/lib/data/categories";
import CatalogTemplate from "@/modules/categories/templates";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(
  props: PageProps<"/[locale]/catalog">,
): Promise<Metadata> {
  const params = await props.params;

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Catalog",
  });

  return {
    title: t("header"),
  };
}

export default async function CatalogPage(
  props: PageProps<"/[locale]/catalog">,
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const handle = searchParams.handle;

  const query = {
    handle: handle ? decodeURIComponent(handle as string) : undefined,
    parent_category_id: handle ? undefined : "null",
    include_descendants_tree: !!handle,
    fields: "+images.*,+category_children.images.*",
  };

  const { product_categories: categories } = await listCategories({
    locale: params.locale,
    query,
  });

  const category = handle ? categories[0] : undefined;

  if (handle && !category) {
    notFound();
  }

  return <CatalogTemplate categories={categories} category={category} />;
}
