import BannerCarousel from "./banner-carousel";
import { getLocale } from "next-intl/server";
import { Banner } from "@/types/payload";
import { getBanners } from "@/lib/data/banners";

export default async function Hero() {
  const locale = await getLocale();
  const banners = await getBanners({ locale });
  return (
    <section className="@container">
      <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
        <BannerCarousel banners={banners as Banner[]} />
      </div>
    </section>
  );
}
