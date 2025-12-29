"use client";
import { convertToLocale } from "@/lib/util/money";
import LineItemPrice from "@/modules/common/components/line-item-price";
import { HttpTypes } from "@medusajs/types";
import React from "react";

interface OrderSummaryProps {
  cart: HttpTypes.StoreCart;
}

const Summary: React.FC<OrderSummaryProps> = ({ cart }) => {
  return (
    <div className="sticky top-28 flex flex-col gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#e7ebf4] dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-[#e7ebf4] dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#0d121c] dark:text-white">
            Order Summary
          </h2>
          <span className="text-sm text-gray-500">
            {cart.items?.length} Items
          </span>
        </div>
        <div className="p-6 flex flex-col gap-6">
          {cart.items?.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.product_title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-0 right-0 bg-gray-500/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-md">
                  x{item.quantity}
                </span>
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <h4 className="text-sm font-bold text-[#0d121c] dark:text-white">
                  {item.product_title}
                </h4>
                <p className="text-xs text-gray-500"></p>
                <p className="text-sm font-medium text-[#0d121c] dark:text-white mt-auto">
                  {convertToLocale({
                    amount: item.total || 0,
                    currency_code: cart.currency_code,
                  })}
                </p>
              </div>
            </div>
          ))}

          <hr className="border-dashed border-gray-200 dark:border-gray-700" />

          <div className="flex gap-2">
            <input
              className="form-input flex-1 rounded-lg border border-[#ced7e8] dark:border-gray-700 bg-white dark:bg-gray-800 text-sm h-10 px-3 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Discount code"
              type="text"
            />
            <button className="px-4 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Apply
            </button>
          </div>

          <hr className="border-dashed border-gray-200 dark:border-gray-700" />

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span className="font-medium text-[#0d121c] dark:text-white">
                {convertToLocale({
                  amount: cart.item_subtotal,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                Shipping
                <span
                  className="material-symbols-outlined text-[14px] text-gray-400 cursor-help"
                  title="Calculated based on selection"
                >
                  help
                </span>
              </span>
              <span className="font-medium text-[#0d121c] dark:text-white">
                {convertToLocale({
                  amount: cart.shipping_total,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-[#0d121c] dark:text-white">
              Total
            </span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-semibold text-[#0d121c] dark:text-white tracking-tight">
                {convertToLocale({
                  amount: cart.total,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
