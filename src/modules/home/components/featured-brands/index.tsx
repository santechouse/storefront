import { Link } from "@/i18n/navigation";
import { getFeaturedBrands } from "@/lib/data/featured-brands";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function FeaturedBrands() {
  const locale = await getLocale();
  const featuredBrands = await getFeaturedBrands({ locale });
  const t = await getTranslations("Catalog");
  return (
    <section className="flex flex-col gap-8 md:gap-10">
      <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {featuredBrands.brands.map((brand, index) => {
          return (
            <Link
              key={index}
              href={brand.link}
              className="group relative flex flex-col items-center justify-center rounded-xl"
            >
              <div className="relative h-16 w-16 mb-2 flex items-center justify-center rounded-lg overflow-hidden bg-secondary/50 border border-border/50">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/${brand.logo.filename}` || ""}
                  fill
                  className="object-contain transition-all duration-500"
                  alt={brand.name}
                  sizes="(max-width: 640px) 40px, 48px"
                />
              </div>
              <span className="font-medium text-xs sm:text-sm text-muted-foreground text-center line-clamp-1">
                {brand.name}
              </span>
            </Link>
          );
        })}
        <Link
          href="/brands"
          className="group relative flex flex-col items-center justify-center rounded-xl"
        >
          <div className="relative h-16 w-16 mb-2 flex items-center justify-center rounded-lg overflow-hidden bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors">
            <ArrowRight className="size-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          <span className="font-medium text-xs sm:text-sm text-muted-foreground text-center whitespace-nowrap">
            {t("viewAll")}
          </span>
        </Link>
      </div>
    </section>
  );
}
