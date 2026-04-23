import BannerCarousel from "./banner-carousel";
import { getLocale } from "next-intl/server";
import { Banner } from "@/types/payload";
import { getBanners } from "@/lib/data/banners";
import { listCollections } from "@/lib/data/collections";
import CollectionBadges from "./collection-badges";

export default async function Hero() {
  const locale = await getLocale();
  const banners = await getBanners({ locale });
  const { collections } = await listCollections(locale);

  return (
    <section className="flex flex-col gap-3">
      <BannerCarousel banners={banners as Banner[]} />
      <CollectionBadges collections={collections} />
    </section>
  );
}
