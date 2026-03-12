import { Link } from "@/i18n/navigation";
import { getFeaturedBrands } from "@/lib/data/featured-brands";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export default async function FeaturedBrands() {
  const locale = await getLocale();
  const featuredBrands = await getFeaturedBrands({ locale });
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
              <div className="relative h-16 w-16 mb-2 flex items-center justify-center">
                <Image
                  src={`http://localhost:3000${brand.logo.url}` || ""}
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
      </div>
    </section>
  );
}
