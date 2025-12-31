import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";
import React from "react";

interface OrderHeaderProps {
  order: HttpTypes.StoreOrder;
}

const Header: React.FC<OrderHeaderProps> = ({ order }) => {
  const t = useTranslations("Order");
  const date = new Date(order.created_at).toLocaleString();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0d121c] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          {t("order", { id: `${order.display_id}` })}
        </h1>
        <div className="flex items-center gap-2 text-[#49659c] dark:text-gray-400">
          <span className="text-sm font-normal leading-normal">
            {t("placedOn", { date })}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        {/*<button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-[#2a3241] border border-[#ced7e8] dark:border-[#3e4859] text-[#0d121c] dark:text-white hover:bg-gray-50 dark:hover:bg-[#323b4d] text-sm font-bold transition-colors">
          <span className="material-symbols-outlined text-[18px] mr-2">
            download
          </span>
          Invoice
        </button>
        <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-md shadow-blue-500/20">
          <span className="material-symbols-outlined text-[18px] mr-2">
            refresh
          </span>
          Reorder
        </button>*/}
      </div>
    </div>
  );
};

export default Header;
