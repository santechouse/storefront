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

  if (!customer.cashback_accounts?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      {customer.cashback_accounts.map((c) => (
        <div
          key={c.id}
          className="rounded-2xl bg-primary/5 border border-primary/20 px-5 py-4 flex items-center justify-between"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium uppercase tracking-wider text-primary/70">
              {t("cashback")}
            </span>
            <span className="text-2xl font-bold tabular-nums text-foreground leading-tight">
              {convertToLocale({
                currency_code: c.currency_code,
                amount: c.balance,
              })}
            </span>
          </div>
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M2 8h20M2 12h6m-6 4h4M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
