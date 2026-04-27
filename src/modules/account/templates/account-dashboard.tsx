"use client";
import { ExtendedStoreCustomer } from "@/lib/data/customer";
import { Settings } from "../components/settings";
import { CustomerInfo } from "../components/customer-info";
import { CashbackInfo } from "../components/cashback-info";

export default function AccountTemplate({
  customer,
}: {
  customer: ExtendedStoreCustomer | null;
}) {
  return (
    <>
      {/* Mobile: full account dashboard */}
      <div className="lg:hidden flex flex-col gap-6 pb-6">
        {customer && (
          <>
            <CustomerInfo customer={customer} />
            <CashbackInfo customer={customer} />
          </>
        )}
        <Settings customer={customer} />
      </div>

      {/* Desktop: sidebar handles profile/nav; show welcome or redirect prompt */}
      <div className="hidden lg:flex flex-col gap-6 pb-6 items-center justify-center py-24 text-center">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold">
            {customer ? `${customer.first_name} ${customer.last_name}` : ""}
          </h2>
          <p className="text-sm text-muted-foreground">
            {customer ? customer.phone ? `+${customer.phone}` : "" : ""}
          </p>
        </div>
      </div>
    </>
  );
}
