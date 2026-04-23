"use client";
import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { CheckIcon, ClockIcon, TruckIcon, PackageIcon } from "lucide-react";
import React from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface OrderCardProps {
  order: HttpTypes.StoreOrder;
}

function StatusBadge({ status }: { status: string }) {
  const isDelivered = status === "delivered";
  const isShipped = status === "shipped";
  const isFulfilled = status === "fulfilled";

  if (isDelivered) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
        <CheckIcon className="size-3" />
        Delivered
      </span>
    );
  }
  if (isShipped) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary border border-primary/20">
        <TruckIcon className="size-3" />
        Shipped
      </span>
    );
  }
  if (isFulfilled) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
        <ClockIcon className="size-3" />
        Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border">
      <PackageIcon className="size-3" />
      Placed
    </span>
  );
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const t = useTranslations("OrderList");
  const date = new Date(order.created_at).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (!order.items?.length) return null;

  const displayItems = order.items.slice(0, 3);
  const extraCount = order.items.length - 3;

  return (
    <Link href={`/account/orders/details/${order.id}`}>
      <div className="rounded-2xl border border-border bg-background overflow-hidden active:bg-muted/40 transition-colors">
        {/* Header row */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("order", { id: `${order.display_id}` })}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.fulfillment_status || "not_fulfilled"} />
          </div>
        </div>

        {/* Items + total */}
        <div className="px-4 py-3.5 flex items-center gap-4">
          {/* Thumbnails */}
          <div className="flex -space-x-2 shrink-0">
            {displayItems.map((item, i) => (
              <div
                key={item.id}
                className="size-11 rounded-xl border-2 border-background bg-muted bg-cover bg-center shrink-0"
                style={{
                  backgroundImage: item.thumbnail
                    ? `url("${item.thumbnail}")`
                    : undefined,
                  zIndex: displayItems.length - i,
                }}
              />
            ))}
            {extraCount > 0 && (
              <div
                className="size-11 rounded-xl border-2 border-background bg-muted flex items-center justify-center shrink-0"
                style={{ zIndex: 0 }}
              >
                <span className="text-xs font-semibold text-muted-foreground">
                  +{extraCount}
                </span>
              </div>
            )}
          </div>

          {/* Name + count */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground line-clamp-1">
              {order.items[0].product_title}
            </p>
            {order.items.length > 1 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                +{order.items.length - 1} {t("moreItems")}
              </p>
            )}
          </div>

          {/* Total */}
          <div className="shrink-0 text-right">
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
