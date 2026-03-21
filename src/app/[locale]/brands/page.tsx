import { listBrands } from "@/lib/data/brands";
import BrandsListTemplate from "@/modules/brand/templates/brand-list-template";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
  props: PageProps<"/[locale]/brands">
): Promise<Metadata> {
  const params = await props.params;

  const t = await getTranslations({
    locale: params.locale,
    namespace: "Brands",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BrandsPage(
  props: PageProps<"/[locale]/brands">
) {
  const brands = await listBrands();

  return <BrandsListTemplate brands={brands} />;
}
