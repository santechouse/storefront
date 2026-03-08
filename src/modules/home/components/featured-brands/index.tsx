import { Link } from "@/i18n/navigation";
import { getFeaturedBrands } from "@/lib/data/featured-brands";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export default async function FeaturedBrands() {
  const locale = await getLocale();
  const featuredBrands = await getFeaturedBrands({ locale });
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-bold">{featuredBrands.title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {featuredBrands.brands.map((brand, index) => {
          return (
            <Link
              key={index}
              href={brand.link}
              className="flex h-10 shrink-0 bg-white dark:bg-[#282e39] items-center gap-3 rounded-xl transition-colors px-6 group"
            >
              <Image
                src={`http://localhost:3000${brand.logo.url}` || ""}
                width={16}
                height={16}
                alt={brand.name}
              />
              <span className="font-medium text-sm">{brand.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
