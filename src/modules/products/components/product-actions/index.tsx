"use client";

import { addToCart } from "@lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { Button } from "@/components/ui/button";
import OptionSelect from "@modules/products/components/product-actions/option-select";
import { isEqual } from "lodash";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductPrice from "../product-price";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

type ProductActionsProps = {
  locale: string;
  product: HttpTypes.StoreProduct;
  disabled?: boolean;
};

const optionsAsKeymap = (
  variantOptions?: HttpTypes.StoreProductVariant["options"],
): Record<string, string> => {
  if (!variantOptions) return {};

  return variantOptions.reduce<Record<string, string>>((acc, opt) => {
    if (!opt.option_id) return acc;
    acc[opt.option_id] = opt.value;
    return acc;
  }, {});
};

export default function ProductActions({
  locale,
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Product");

  const [options, setOptions] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);

  const actionsRef = useRef<HTMLDivElement>(null);

  // Preselect options if only one variant
  useEffect(() => {
    if (product.variants?.length === 1) {
      setOptions(optionsAsKeymap(product.variants[0].options));
    }
  }, [product.variants]);

  const selectedVariant = useMemo(() => {
    return product.variants?.find((variant) =>
      isEqual(optionsAsKeymap(variant.options), options),
    );
  }, [product.variants, options]);

  const isValidVariant = useMemo(() => {
    return product.variants?.some((variant) =>
      isEqual(optionsAsKeymap(variant.options), options),
    );
  }, [product.variants, options]);

  // Sync variant ID to URL
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const variantId = isValidVariant ? selectedVariant?.id : null;

    if (urlParams.get("v_id") === variantId) return;

    if (variantId) {
      urlParams.set("v_id", variantId);
    } else {
      urlParams.delete("v_id");
    }

    router.replace(`${pathname}?${urlParams.toString()}`);
  }, [selectedVariant?.id, isValidVariant, pathname, router, searchParams]);

  const inStock = useMemo(() => {
    if (!selectedVariant) return false;
    if (!selectedVariant.manage_inventory) return true;
    if (selectedVariant.allow_backorder) return true;
    return (selectedVariant.inventory_quantity ?? 0) > 0;
  }, [selectedVariant]);

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return;

    setIsAdding(true);

    try {
      await addToCart({
        locale,
        variantId: selectedVariant.id,
        quantity: 1,
      });
      router.refresh();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2" ref={actionsRef}>
      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-y-4">
          {product.options?.map((option) => (
            <OptionSelect
              key={option.id}
              option={option}
              current={options[option.id]}
              updateOption={setOptionValue}
              title={option.title ?? ""}
              disabled={!!disabled || isAdding}
              data-testid="product-options"
            />
          ))}
          <Separator />
        </div>
      )}

      <ProductPrice product={product} variant={selectedVariant} />

      <Button
        onClick={handleAddToCart}
        disabled={
          !selectedVariant ||
          !isValidVariant ||
          !inStock ||
          isAdding ||
          disabled
        }
        className="w-full h-10"
        data-testid="add-product-button"
      >
        {!selectedVariant
          ? t("selectVariant")
          : !inStock || !isValidVariant
            ? t("outOfStock")
            : t("addToCart")}
      </Button>
    </div>
  );
}
