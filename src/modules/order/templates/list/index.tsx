import { HttpTypes } from "@medusajs/types";
import OrderCard from "../../components/order-card";
import { PackageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  orders: HttpTypes.StoreOrder[];
}

export default function OrderListTemplate({ orders }: Props) {
  const t = useTranslations("OrderList");
  if (!orders) return null;
  return (
    <div className="flex-1 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.033em] text-foreground">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t("description")}</p>
      </div>

      <div className="flex flex-col gap-4">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="py-20 flex flex-col items-center text-center gap-4">
            <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <PackageIcon className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("emptyTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {t("emptyDescription")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
