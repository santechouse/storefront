import { listCollections } from "@/lib/data/collections";
import { getRegion } from "@/lib/data/regions";
import FeaturedBrands from "@/modules/home/components/featured-brands";
import FeaturedProducts from "@/modules/home/components/featured-products";
import Hero from "@/modules/home/components/hero";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const region = await getRegion("uz");

  const { collections } = await listCollections(locale);

  if (!region || !collections) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-8 md:gap-12">
      <Hero />
      <FeaturedBrands />
      <FeaturedProducts
        locale={locale}
        region={region}
        collections={collections}
      />
    </div>
  );
}
