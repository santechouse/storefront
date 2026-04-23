"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { MobileRefinementList } from "@/modules/store/components/mobile-refinement-list";
import { SortProducts } from "@/modules/store/components/refinement-list/sort-products";
import { SortOptions } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

export function CategoryHeader(props: {
  sortBy: SortOptions;
  category: HttpTypes.StoreProductCategory;
}) {
  const { category, sortBy } = props;
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value);
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-border">
      <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
        <Link href="/catalog" className="hover:text-foreground transition-colors shrink-0">
          {t("Breadcrumb.catalog")}
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-foreground font-medium truncate">{category.name}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="lg:hidden">
          <MobileRefinementList
            initialCategory={category}
            categories={[category, ...category.category_children]}
          />
        </div>
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
      </div>
    </div>
  );
}
