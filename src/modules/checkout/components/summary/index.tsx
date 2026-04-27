"use client";
import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";
import React from "react";

interface OrderSummaryProps {
  cart: HttpTypes.StoreCart;
}

const Summary: React.FC<OrderSummaryProps> = ({ cart }) => {
  const t = useTranslations("Checkout.summary");
  return (
    <div className="sticky top-28 flex flex-col gap-4">
      <div className="rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">{t("title")}</h2>
          <span className="text-xs text-muted-foreground">
            {cart.items?.length} {t("items")}
          </span>
        </div>

        {/* Items */}
        <div className="flex flex-col divide-y divide-border">
          {cart.items?.map((item) => (
            <div key={item.id} className="flex gap-4 px-5 py-4">
              <div className="relative size-16 rounded-xl overflow-hidden border border-border bg-muted shrink-0">
                <img
                  src={item.thumbnail || ""}
                  alt={item.product_title || ""}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-0 right-0 bg-foreground/70 text-background text-[10px] font-bold px-1.5 py-0.5 rounded-bl-md">
                  ×{item.quantity}
                </span>
              </div>
              <div className="flex flex-col flex-1 gap-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                  {item.product_title}
                </p>
                <p className="text-xs text-muted-foreground">{item.variant_title}</p>
                <p className="text-sm font-semibold text-foreground mt-auto tabular-nums">
                  {convertToLocale({
                    amount: item.total || 0,
                    currency_code: cart.currency_code,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-2 px-5 py-4 border-t border-border">
          <LineItem
            label={t("subtotal")}
            value={convertToLocale({
              amount: cart.item_subtotal,
              currency_code: cart.currency_code,
            })}
          />
          <LineItem
            label={t("shipping")}
            value={convertToLocale({
              amount: cart.shipping_total,
              currency_code: cart.currency_code,
            })}
          />
          <hr className="border-border my-1" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-foreground">
              {t("total")}
            </span>
            <span className="text-xl font-bold text-foreground tabular-nums tracking-tight">
              {convertToLocale({
                amount: cart.total,
                currency_code: cart.currency_code,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LineItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground tabular-nums">{value}</span>
  </div>
);

export default Summary;
