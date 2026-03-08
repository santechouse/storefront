"use client"

import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { Loader2, ShoppingCart } from "lucide-react"

type AddToCartProps = {
    product: HttpTypes.StoreProduct
}

export default function AddToCart({ product }: AddToCartProps) {
    const [isAdding, setIsAdding] = useState(false)
    const t = useTranslations("Product")
    const { locale } = useParams()

    const variant = product.variants?.[0]
    const inStock = variant ? (!variant.manage_inventory || variant.allow_backorder || (variant.inventory_quantity ?? 0) > 0) : false

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!variant?.id || isAdding || !inStock) return

        setIsAdding(true)

        try {
            await addToCart({
                locale: locale as string,
                variantId: variant.id,
                quantity: 1,
            })
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <Button
            onClick={handleAddToCart}
            disabled={!variant || !inStock || isAdding}
            variant="default"
            className="w-full h-9 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        >
            {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : inStock ? (
                <>
                    <ShoppingCart className="h-4 w-4" />
                    {t("addToCart")}
                </>
            ) : (
                t("outOfStock")
            )}
        </Button>
    )
}
