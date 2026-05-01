import { useTranslations } from "next-intl";
import { Brand } from "@/types/brand";
import { BrandCard } from "../components/brand-card";

type Props = {
  brands: Brand[];
};

export default function BrandsListTemplate({ brands }: Props) {
  const t = useTranslations("Brands");

  return (
    <div className="flex-1">
      <div className="mb-6 w-full">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t("title")}
        </h1>
        {t("description") && (
          <p className="mt-2 text-sm text-muted-foreground">
            {t("description")}
          </p>
        )}
      </div>

      {brands.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8 min-h-50">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-75 border border-dashed rounded-xl border-border">
          <p className="text-muted-foreground">No brands found.</p>
        </div>
      )}
    </div>
  );
}
