import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";

interface Props {
  order: HttpTypes.StoreOrder;
}

const Summary: React.FC<Props> = ({ order }) => {
  const t = useTranslations("Order");
  return (
    <div className="rounded-2xl border border-border bg-background px-5 py-4">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {t("summary")}
      </span>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{t("subtotal")}</span>
          <span className="font-medium tabular-nums text-foreground">
            {convertToLocale({
              amount: order.item_subtotal,
              currency_code: order.currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{t("shipping")}</span>
          <span className="font-medium tabular-nums text-foreground">
            {convertToLocale({
              amount: order.shipping_total,
              currency_code: order.currency_code,
            })}
          </span>
        </div>
        <div className="h-px bg-border my-1" />
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-foreground">
            {t("total")}
          </span>
          <span className="text-base font-bold tabular-nums text-foreground">
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
