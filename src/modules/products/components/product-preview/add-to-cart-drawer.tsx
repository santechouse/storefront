"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { HttpTypes } from "@medusajs/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { addToCart } from "@lib/data/cart";
import { convertToLocale } from "@lib/util/money";
import { getProductPrice } from "@lib/util/get-product-price";
import Thumbnail from "../thumbnail";
import CartItemSelect from "@modules/cart/components/cart-item-select";

type AddToCartDrawerProps = {
  product: HttpTypes.StoreProduct;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AddToCartDrawer({
  product,
  open,
  setOpen,
}: AddToCartDrawerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const t = useTranslations("Product");
  const { locale } = useParams();
  const router = useRouter();

  const variant = product.variants?.[0];
  const { cheapestPrice } = getProductPrice({ product });

  const handleAddToCart = async () => {
    if (!variant?.id || isAdding) return;
    setIsAdding(true);
    try {
      await addToCart({ locale: locale as string, variantId: variant.id, quantity });
      router.refresh();
      setOpen(false);
    } finally {
      setIsAdding(false);
    }
  };

  const subtotal = cheapestPrice
    ? convertToLocale({
        amount: cheapestPrice.calculated_price_number * quantity,
        currency_code: cheapestPrice.currency_code,
        locale: locale as string,
      })
    : null;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="pb-0">
            <DrawerTitle className="text-base font-semibold">
              {t("addToCart")}
            </DrawerTitle>
          </DrawerHeader>

          <div className="px-4 py-4 flex flex-col gap-5">
            {/* Product row */}
            <div className="flex gap-3 items-center">
              <div className="size-16 shrink-0 rounded-xl overflow-hidden border border-border bg-muted/30">
                <Thumbnail thumbnail={product.thumbnail} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                  {product.title}
                </h3>
                {cheapestPrice && (
                  <span className="text-sm font-semibold tabular-nums text-primary">
                    {cheapestPrice.calculated_price}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("quantity")}
              </span>
              <CartItemSelect
                defaultValue={quantity}
                onChange={(val) => setQuantity(val)}
              />
            </div>

            {/* Subtotal */}
            {subtotal && (
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">{t("subtotal")}</span>
                <span className="text-base font-bold tabular-nums text-foreground">
                  {subtotal}
                </span>
              </div>
            )}
          </div>

          <DrawerFooter className="flex flex-row gap-2 pt-0">
            <DrawerClose asChild>
              <Button variant="outline" className="flex-1">
                {t("cancel")}
              </Button>
            </DrawerClose>
            <Button className="flex-1" onClick={handleAddToCart} disabled={isAdding}>
              {isAdding ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                t("confirm")
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
