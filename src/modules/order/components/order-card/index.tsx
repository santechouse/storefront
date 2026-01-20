"use client";
import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { Check, ClockFading, TruckIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface OrderCardProps {
  order: HttpTypes.StoreOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const t = useTranslations("OrderList");
  const isMultiple = (order.items?.length || 0) > 1;
  const isShipped = order.fulfillment_status === "shipped";
  const isDelivered = order.fulfillment_status === "delivered";
  const date = new Date(order.created_at).toLocaleString();

  if (!order.items?.length) return;

  return (
    <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e7ebf4] dark:border-gray-800 overflow-hidden group">
      {/* Order Header */}
      <div className="bg-[#f8f9fc] dark:bg-gray-800/50 px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 text-sm border-b border-[#e7ebf4] dark:border-gray-800">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <div className="flex flex-col">
            <span className="text-[#49659c] dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
              {t("orderPlaced")}
            </span>
            <span className="text-[#0d121c] dark:text-white font-medium">
              {date}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#49659c] dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
              {t("total")}
            </span>
            <span className="text-[#0d121c] dark:text-white font-medium">
              {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:items-end">
          <span className="text-[#49659c] dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
            {t("order", { id: `${order.display_id}` })}
          </span>
        </div>
      </div>

      {/* Order Body */}
      <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined icon-filled mt-0.5 ${
                isDelivered
                  ? "text-green-600 dark:text-green-400"
                  : isShipped
                    ? "text-primary"
                    : "text-gray-400"
              }`}
            >
              {isDelivered ? (
                <Check className="size-4" />
              ) : isShipped ? (
                <TruckIcon className="size-4" />
              ) : (
                <ClockFading className="size-4" />
              )}
            </span>
            <div>
              <h3
                className={`font-bold ${isShipped ? "text-primary" : "text-[#0d121c] dark:text-white"}`}
              >
                {t(`statuses.${order.fulfillment_status}`)}
              </h3>
              <p
                className={`text-sm ${isShipped ? "font-medium text-[#0d121c] dark:text-gray-200" : "text-[#49659c] dark:text-gray-400"}`}
              >
                {/*{order.statusDetail}*/}
              </p>
            </div>
          </div>

          {/*{isShipped && order.progress !== undefined && (
            <div className="w-full max-w-md h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${order.progress}%` }}
              ></div>
            </div>
          )}*/}

          <div className="flex gap-4 mt-2 overflow-x-auto pb-2 no-scrollbar">
            {isMultiple ? (
              <div className="flex flex-wrap gap-4">
                {order.items?.slice(0, 3).map((item) => (
                  <div key={item.id} className="group relative shrink-0">
                    <div
                      className="bg-gray-100 dark:bg-gray-700 w-24 h-24 rounded-lg bg-cover bg-center border border-gray-200 dark:border-gray-600 transition-transform hover:scale-105"
                      style={{ backgroundImage: `url("${item.thumbnail}")` }}
                    />
                    <button className="absolute bottom-0 left-0 w-full bg-primary/90 text-white text-[10px] font-bold py-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                      Buy Again
                    </button>
                  </div>
                ))}
                {(order.items?.length || 0) > 3 && (
                  <div className="flex items-center justify-center w-24 h-24 rounded-lg border border-dashed border-[#49659c] text-[#49659c] text-xs font-medium bg-[#f8f9fc] dark:bg-gray-800">
                    +{(order.items?.length || 0) - 3} more
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <div className="relative shrink-0">
                  <div
                    className="bg-gray-100 dark:bg-gray-700 w-24 h-24 rounded-lg bg-cover bg-center border border-gray-200 dark:border-gray-600"
                    style={{
                      backgroundImage: `url("${order.items?.[0].thumbnail}")`,
                    }}
                  />
                  {(order.items?.[0].quantity || 0) > 1 && (
                    <span className="absolute -bottom-2 -right-2 bg-gray-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      x{order.items?.[0].quantity}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <Link
                    className="font-medium hover:underline line-clamp-2"
                    href={`/product/${order.items?.[0].product_handle}`}
                  >
                    {order.items?.[0].product_title}
                  </Link>
                  <p className="text-xs text-secondary-foreground">
                    {order.items?.[0].variant_title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="w-full md:w-56 shrink-0 flex flex-col gap-2">
          <Link href={`/account/orders/details/${order.id}`}>
            <Button variant="outline" className="w-full">
              {t("details")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
