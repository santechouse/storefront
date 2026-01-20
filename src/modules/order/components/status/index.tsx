"use client";
import { FulfillmentStatus, HttpTypes } from "@medusajs/types";
import { CheckIcon, Package2, TruckIcon, ClockFading } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  order: HttpTypes.StoreOrder;
}

const STAGES: {
  id: FulfillmentStatus;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    id: "not_fulfilled",
    label: "Order Placed",
    icon: <CheckIcon className="size-4" />,
    description: "Your order has been received.",
  },
  {
    id: "fulfilled",
    label: "Processing",
    icon: <ClockFading className="size-4" />,
    description: "We are preparing your items.",
  },
  {
    id: "shipped",
    label: "Shipped",
    icon: <TruckIcon className="size-4" />,
    description: "Your package is on its way.",
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: <Package2 className="size-4" />,
    description: "Items have arrived at destination.",
  },
];

const Status: React.FC<Props> = ({ order }) => {
  const t = useTranslations("Order");
  const currentIndex = STAGES.findIndex(
    (s) => s.id === order.fulfillment_status,
  );

  return (
    <div className="rounded-xl border border-[#ced7e8] dark:border-[#2a3241] bg-white dark:bg-[#1e2433] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0d121c] dark:text-white">
          {t("status")}
        </h3>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
          {t(`statuses.${STAGES[currentIndex].id}`)}
        </span>
      </div>
    </div>
  );
};

export default Status;
