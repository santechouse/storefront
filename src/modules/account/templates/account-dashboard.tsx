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
    <div className="flex flex-col gap-6 pb-6">
      {customer && (
        <>
          <CustomerInfo customer={customer} />
          <CashbackInfo customer={customer} />
        </>
      )}
      <Settings customer={customer} />
    </div>
  );
}
