"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { Loader2, ShoppingCart } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { addToCart } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { getProductPrice } from "@lib/util/get-product-price"
import Thumbnail from "../thumbnail"
import CartItemSelect from "@modules/cart/components/cart-item-select"

type AddToCartDrawerProps = {
    product: HttpTypes.StoreProduct
    open: boolean
    setOpen: (open: boolean) => void
}

export default function AddToCartDrawer({
    product,
    open,
    setOpen,
}: AddToCartDrawerProps) {
    const [isAdding, setIsAdding] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const t = useTranslations("Product")
    const { locale } = useParams()

    const variant = product.variants?.[0]
    const { cheapestPrice } = getProductPrice({ product })

    const handleAddToCart = async () => {
        if (!variant?.id || isAdding) return

        setIsAdding(true)

        try {
            await addToCart({
                locale: locale as string,
                variantId: variant.id,
                quantity,
            })
            setOpen(false)
        } finally {
            setIsAdding(false)
        }
    }

    const subtotal = cheapestPrice
        ? convertToLocale({
            amount: cheapestPrice.calculated_price_number * quantity,
            currency_code: cheapestPrice.currency_code,
            locale: locale as string,
        })
        : null

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <DrawerTitle>{t("addToCart")}</DrawerTitle>
                        <DrawerDescription>
                            {t("selectQuantity")}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 flex flex-col gap-6">
                        <div className="flex gap-4 items-center">
                            <div className="w-20 h-24 shrink-0">
                                <Thumbnail thumbnail={product.thumbnail} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-sm line-clamp-2">
                                    {product.title}
                                </h3>
                                {cheapestPrice && (
                                    <p className="text-sm font-semibold text-primary">
                                        {cheapestPrice.calculated_price}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                                {t("quantity")}
                            </label>
                            <CartItemSelect
                                defaultValue={quantity}
                                onChange={(val) => setQuantity(val)}
                            />
                        </div>

                        {subtotal && (
                            <div className="flex justify-between items-center pt-4 border-t">
                                <span className="text-sm font-medium">{t("subtotal")}</span>
                                <span className="text-lg font-bold text-primary">{subtotal}</span>
                            </div>
                        )}
                    </div>

                    <DrawerFooter className="flex flex-row gap-2">
                        <DrawerClose asChild>
                            <Button variant="outline" className="flex-1">
                                {t("cancel")}
                            </Button>
                        </DrawerClose>
                        <Button
                            className="flex-1"
                            onClick={handleAddToCart}
                            disabled={isAdding}
                        >
                            {isAdding ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {t("confirm")}
                                </>
                            )}
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
