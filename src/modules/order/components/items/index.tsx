import { convertToLocale } from "@/lib/util/money";
import { HttpTypes, RepositoryService } from "@medusajs/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface Props {
  order: HttpTypes.StoreOrder;
}

const Items: React.FC<Props> = ({ order }) => {
  const t = useTranslations("Order");
  return (
    <div className="rounded-xl border border-[#ced7e8] dark:border-[#2a3241] bg-white dark:bg-[#1e2433] overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-[#ced7e8] dark:border-[#2a3241] bg-gray-50 dark:bg-[#252c3b]">
        <h3 className="text-lg font-bold text-[#0d121c] dark:text-white">
          {t("orderItems")}
          <span className="text-sm font-medium text-gray-500 ml-1">
            ({order.items?.length} {t("items")})
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-white dark:bg-[#1e2433] border-b border-[#ced7e8] dark:border-[#2a3241]">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[50%]">
                {t("product")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                {t("price")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                {t("quantity")}
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                {t("total")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ced7e8] dark:divide-[#2a3241]">
            {order.items?.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-[#252c3b] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          alt="Office Chair"
                          className="object-cover object-center"
                          data-alt="Ergonomic office chair with black mesh back"
                          src={item.thumbnail || ""}
                          fill
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0d121c] dark:text-white">
                          {item.product_title}
                        </h4>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                    {convertToLocale({
                      amount: item.unit_price,
                      currency_code: order.currency_code,
                    })}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-[#0d121c] dark:text-white">
                    {convertToLocale({
                      amount: item.total,
                      currency_code: order.currency_code,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;
