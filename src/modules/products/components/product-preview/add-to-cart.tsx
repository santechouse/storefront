"use client"

import { HttpTypes } from "@medusajs/types"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { ShoppingCart } from "lucide-react"
import AddToCartDrawer from "./add-to-cart-drawer"

type AddToCartProps = {
    product: HttpTypes.StoreProduct
}

export default function AddToCart({ product }: AddToCartProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const t = useTranslations("Product")

    const variant = product.variants?.[0]
    const inStock = variant ? (!variant.manage_inventory || variant.allow_backorder || (variant.inventory_quantity ?? 0) > 0) : false

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!variant?.id || !inStock) return

        setIsDrawerOpen(true)
    }

    return (
        <>
            <Button
                onClick={handleAddToCart}
                disabled={!variant || !inStock}
                variant="default"
                className="w-full h-9 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
                {inStock ? (
                    <>
                        <ShoppingCart className="h-4 w-4" />
                        {t("addToCart")}
                    </>
                ) : (
                    t("outOfStock")
                )}
            </Button>
            <AddToCartDrawer
                product={product}
                open={isDrawerOpen}
                setOpen={setIsDrawerOpen}
            />
        </>
    )
}
