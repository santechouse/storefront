import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function Summary(props: { cart: HttpTypes.StoreCart }) {
  const { cart } = props;
  const t = useTranslations("Cart");
  return (
    <aside className="w-full lg:w-[380px] shrink-0">
      <div className="lg:sticky lg:top-24 flex flex-col gap-6">
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-[#e7ebf4] dark:border-gray-800 shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#0d121c]  mb-6">
            {t("summary")}
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#49659c]">{t("subtotal")}</span>
              <span className="font-semibold text-[#0d121c] ">
                {convertToLocale({
                  amount: cart.item_subtotal,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#49659c]">{t("shipping")}</span>
              <span className="font-medium">
                {convertToLocale({
                  amount: cart.shipping_total,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>
          </div>
          <div className="h-px w-full bg-[#e7ebf4] dark:bg-gray-800 mb-6"></div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-[#0d121c] ">
              {t("total")}
            </span>
            <span className="text-lg font-bold text-[#0d121c] ">
              {convertToLocale({
                amount: cart.total,
                currency_code: cart.currency_code,
              })}
            </span>
          </div>
          <Link href="/checkout">
            <Button size="lg" className="w-full">
              <span>{t("checkout")}</span>
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
