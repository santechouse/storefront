import { HttpTypes } from "@medusajs/types";
import { MapPinIcon, TruckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  order: HttpTypes.StoreOrder;
}

const ShippingInfo: React.FC<Props> = ({ order }) => {
  const t = useTranslations("Order");
  return (
    <div className="flex flex-col gap-4">
      {/* Delivery address */}
      <div className="rounded-2xl border border-border bg-background px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPinIcon className="size-3.5 text-primary" />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("address")}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 pl-9">
          <p className="text-sm font-medium text-foreground">
            {order.customer?.first_name} {order.customer?.last_name}
          </p>
          {order.shipping_address?.address_1 && (
            <p className="text-sm text-muted-foreground">
              {order.shipping_address.address_1}
            </p>
          )}
          {(order.shipping_address?.city ||
            order.shipping_address?.province) && (
            <p className="text-sm text-muted-foreground">
              {[order.shipping_address.city, order.shipping_address.province]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
          {order.shipping_address?.phone && (
            <>
              <div className="h-px bg-border my-2" />
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("contact")}
              </p>
              <p className="text-sm text-foreground mt-0.5">
                {order.shipping_address.phone}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Shipping method */}
      {order.shipping_methods && order.shipping_methods.length > 0 && (
        <div className="rounded-2xl border border-border bg-background px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <TruckIcon className="size-3.5 text-primary" />
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("shippingMethod")}
            </span>
          </div>
          {order.shipping_methods.map((option) => (
            <div key={option.id} className="pl-9">
              <p className="text-sm font-medium text-foreground">
                {option.name}
              </p>
              {option.description && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {option.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
