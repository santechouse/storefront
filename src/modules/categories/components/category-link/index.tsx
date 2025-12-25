import { Link } from "@/i18n/navigation";
import { HttpTypes } from "@medusajs/types";
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
  const isChild = !!category.category_children.length;
  return (
    <Link
      href={
        isChild
          ? { pathname: "catalog", query: { handle } }
          : `/catalog/${handle}`
      }
      className={className}
    >
      {children}
    </Link>
  );
}
