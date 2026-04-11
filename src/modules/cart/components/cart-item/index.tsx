"use client";
import { deleteLineItem, updateLineItem } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { useRouter } from "next/navigation";
import React from "react";
import CartItemSelect from "../cart-item-select";
import { Trash2Icon } from "lucide-react";
import LineItemUnitPrice from "@/modules/common/components/line-item-unit-price";
import LineItemPrice from "@/modules/common/components/line-item-price";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: HttpTypes.StoreCartLineItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const router = useRouter();

  const changeQuantity = async (quantity: number) => {
    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .then(() => {
        router.refresh();
      })
      .catch(() => {});
  };

  const deleteItem = async () => {
    await deleteLineItem(item.id);
    router.refresh();
  };
  return (
    <div className="group bg-secondary rounded-xl p-4 sm:p-6 shadow-sm border border-[#e7ebf4] dark:border-gray-800 flex flex-col sm:flex-row gap-6">
      <div className="shrink-0">
        <div
          className="size-24 sm:size-32 rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center border border-gray-100 dark:border-gray-700"
          style={{ backgroundImage: `url("${item.thumbnail}")` }}
          aria-label={item.product_title}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
              {item.product_title}
            </h3>
            <p className="text-sm text-text-muted mb-1">{item.variant_title}</p>
            {/*{item.color && (
            )}
            {item.condition && (
              <p className="text-sm text-text-muted mb-1">
                Condition: {item.condition}
              </p>
            )}
            <p className="text-sm text-text-muted">Category: {item.category}</p>*/}
          </div>
          <Button
            onClick={deleteItem}
            size="icon"
            variant="outline"
            title="Remove item"
          >
            <Trash2Icon />
          </Button>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
          <div className="flex items-center gap-3">
            <CartItemSelect
              defaultValue={item.quantity}
              onChange={changeQuantity}
            />
          </div>
          <div>
            <LineItemUnitPrice item={item} currencyCode={"uzs"} />
            <LineItemPrice item={item} currencyCode={"uzs"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
