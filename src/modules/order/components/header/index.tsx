import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";

interface OrderHeaderProps {
  order: HttpTypes.StoreOrder;
}

const Header: React.FC<OrderHeaderProps> = ({ order }) => {
  const t = useTranslations("Order");
  const date = new Date(order.created_at).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex flex-col gap-4 mb-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeftIcon className="size-3.5" />
        {t("backToOrders")}
      </Link>
      <div>
        <h1 className="text-xl font-bold tracking-[-0.033em] text-foreground">
          {t("order", { id: `${order.display_id}` })}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t("placedOn", { date })}
        </p>
      </div>
    </div>
  );
};

export default Header;
