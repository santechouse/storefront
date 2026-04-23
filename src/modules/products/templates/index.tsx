import { HttpTypes } from "@medusajs/types";
import ProductActionsWrapper from "./product-action-wrapper";
import { Suspense } from "react";
import ProductActions from "../components/product-actions";
import ImageGallary from "../components/image-gallary";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/modules/common/components/breadcrumb";
import { Brand } from "@/types/brand";

export type ProductTemplateProps = {
  product: HttpTypes.StoreProduct & {
    brand?: Brand;
  };
  region: HttpTypes.StoreRegion;
  images: HttpTypes.StoreProductImage[];
};

export default function ProductTemplate({
  product,
  region,
  images,
}: ProductTemplateProps) {
  const t = useTranslations("Product");
  const breadcrumb = [];
  const category = product.categories?.[0];

  if (category) {
    breadcrumb.push({
      name: category.name,
      link: `/catalog/${category.handle}`,
    });
  }

  breadcrumb.push({ name: product.title, link: `/products/${product.handle}` });

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
        {/* Left: image gallery */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <Breadcrumb items={breadcrumb} />
          <ImageGallary images={images} />

          {/* Description — desktop */}
          {product.description && (
            <div className="hidden lg:block mt-4">
              <div className="px-0 pt-5 pb-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("description")}
                </span>
              </div>
              <div className="rounded-2xl border border-border px-5 py-4 text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </div>
            </div>
          )}
        </div>

        {/* Right: product info */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 flex flex-col gap-5">
            {/* Identity */}
            <div className="flex flex-col gap-1">
              {category && (
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {category.name}
                </span>
              )}
              <h1 className="text-xl font-semibold tracking-[-0.033em] text-foreground">
                {product.title}
              </h1>
              {product.brand?.name && (
                <span className="text-sm text-muted-foreground">
                  {product.brand.name}
                </span>
              )}
            </div>

            <div className="border-t border-border" />

            <Suspense
              fallback={
                <ProductActions locale="ru" disabled product={product} />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Description — mobile */}
      {product.description && (
        <div className="lg:hidden mt-8 mb-6 flex flex-col gap-2">
          <div className="pt-5 pb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("description")}
            </span>
          </div>
          <div className="rounded-2xl border border-border px-5 py-4 text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </div>
        </div>
      )}
    </>
  );
}
