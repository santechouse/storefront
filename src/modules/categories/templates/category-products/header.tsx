"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import Breadcrumb from "@/modules/common/components/breadcrumb";
import { MobileRefinementList } from "@/modules/store/components/mobile-refinement-list";
import { SortProducts } from "@/modules/store/components/refinement-list/sort-products";
import { SortOptions } from "@/types/globals";
import { HttpTypes } from "@medusajs/types";
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
    <div className="flex flex-col w-full md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-6">
      <Breadcrumb
        items={[
          { name: t("Breadcrumb.catalog"), link: `/catalog` },
          { name: category.name, link: category.handle },
        ]}
      />
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {category.name}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <MobileRefinementList
            initialCategory={category}
            categories={[category, ...category.category_children]}
          />
        </div>
        <div className="relative group">
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
        </div>
      </div>
    </div>
  );
}
