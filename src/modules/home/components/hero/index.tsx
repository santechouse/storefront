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
    <section className="@container">
      <div className="flex flex-col gap-6 lg:gap-8">
        <CollectionBadges collections={collections} />
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
          <BannerCarousel banners={banners as Banner[]} />
        </div>
      </div>
    </section>
  );
}
