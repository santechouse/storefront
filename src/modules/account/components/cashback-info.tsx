"use client";
import { ExtendedStoreCustomer } from "@/lib/data/customer";
import { convertToLocale } from "@/lib/util/money";
import { useTranslations } from "next-intl";

export const CashbackInfo = ({
  customer,
}: {
  customer: ExtendedStoreCustomer;
}) => {
  const t = useTranslations("Account");
  return (
    <>
      {customer.cashback_accounts?.map((c) => {
        return (
          <div
            className="flex flex-col gap-1 items-center justify-center bg-secondary rounded-xl py-5"
            key={c.id}
          >
            <div className="text-muted-foreground font-medium uppercase text-xs">
              {t("cashback")}
            </div>
            <h3 className="font-semibold text-lg">
              {convertToLocale({
                currency_code: c.currency_code,
                amount: c.balance,
              })}
            </h3>
          </div>
        );
      })}
    </>
  );
};
