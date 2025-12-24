import { HttpTypes } from "@medusajs/types";
import ProductActionsWrapper from "./product-action-wrapper";
import { Suspense } from "react";
import ProductActions from "../components/product-actions";
import ImageGallary from "../components/image-gallary";
import { useTranslations } from "next-intl";

export type ProductTemplateProps = {
  product: HttpTypes.StoreProduct;
  region: HttpTypes.StoreRegion;
  images: HttpTypes.StoreProductImage[];
};

export default function ProductTemplate({
  product,
  region,
  images,
}: ProductTemplateProps) {
  const t = useTranslations("Product");
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <ImageGallary images={images} />
          <div className="mt-8 hidden lg:block">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav aria-label="Tabs" className="-mb-px flex gap-8">
                <span className="border-primary text-primary whitespace-nowrap border-b-2 py-4 px-1 text-sm font-bold">
                  {t("description")}
                </span>
              </nav>
            </div>
            <div className="py-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-6">
            <div>
              <span className="flex mb-2">{product.categories?.[0].name}</span>
              <h1 className="text-2xl font-bold tracking-tight mb-2">
                {product.title}
              </h1>
              <span>{product.brand?.name}</span>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 w-full"></div>
            <Suspense
              fallback={
                <ProductActions
                  locale={"ru"}
                  disabled={true}
                  product={product}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="lg:hidden mt-12 mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <nav aria-label="Tabs" className="-mb-px flex gap-6">
            <span className="border-primary text-primary whitespace-nowrap border-b-2 py-3 px-1 text-sm font-bold">
              {t("description")}
            </span>
          </nav>
        </div>
        <div className="py-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
}
