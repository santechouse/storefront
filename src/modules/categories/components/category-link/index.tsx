"use client";
import { Link } from "@/i18n/navigation";
import { HttpTypes } from "@medusajs/types";
import { useSearchParams } from "next/navigation";
import React from "react";

export type CategoryLinkProps = React.ComponentProps<"base"> & {
  category: HttpTypes.StoreProductCategory;
};

export function CategoryLink({
  children,
  category,
  className,
}: React.PropsWithChildren<CategoryLinkProps>) {
  const handle = category.handle;
  const hasChildren = category.category_children.length > 0;
  const searchParams = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries());
  const href = hasChildren
    ? {
        pathname: "/catalog",
        query: { ...currentParams, handle }, // Keep params and add/update handle
      }
    : {
        pathname: `/catalog/${handle}`,
        // We omit 'handle' from the query because it's now in the URL path
        query: (() => {
          const { handle: _, ...rest } = currentParams;
          return rest;
        })(),
      };
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
