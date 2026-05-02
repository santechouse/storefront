import { Link } from "@/i18n/navigation";
import { listBrands } from "@/lib/data/brands";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function FeaturedBrands() {
  const [brands, t] = await Promise.all([
    listBrands(),
    getTranslations("Catalog"),
  ]);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Бренды
        </span>
        <Link
          href="/brands"
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          {t("viewAll")}
          <ArrowRight className="size-3" />
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {brands.map((brand) => {
          const image = brand.images?.[0];
          return (
            <Link
              key={brand.id}
              href={`/brands/${brand.handle}`}
              className="group flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div className="relative h-14 w-14 flex items-center justify-center rounded-xl overflow-hidden bg-secondary border border-border/50 group-hover:border-border transition-colors">
                {image ? (
                  <Image
                    src={image.url}
                    fill
                    className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                    alt={brand.name}
                    sizes="56px"
                  />
                ) : (
                  <span className="text-lg font-bold text-primary">
                    {brand.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground text-center line-clamp-1 w-14">
                {brand.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
