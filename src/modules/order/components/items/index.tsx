import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface Props {
  order: HttpTypes.StoreOrder;
}

const Items: React.FC<Props> = ({ order }) => {
  const t = useTranslations("Order");
  return (
    <div className="rounded-2xl border border-border bg-background overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t("orderItems")}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {order.items?.length} {t("items")}
        </span>
      </div>

      <div className="divide-y divide-border">
        {order.items?.map((item) => (
          <div key={item.id} className="px-5 py-4 flex items-center gap-4">
            <div className="relative size-14 rounded-xl overflow-hidden bg-muted shrink-0">
              {item.thumbnail && (
                <Image
                  alt={item.product_title || ""}
                  src={item.thumbnail}
                  fill
                  className="object-cover object-center"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-2">
                {item.product_title}
              </p>
              {item.variant_title && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.variant_title}
                </p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold tabular-nums text-foreground">
                {convertToLocale({
                  amount: item.total,
                  currency_code: order.currency_code,
                })}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                ×{item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
