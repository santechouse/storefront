"use client";
import { Separator } from "@/components/ui/separator";
import { ExtendedStoreCustomer } from "@/lib/data/customer";
import { Settings } from "./components/settings";
import { CustomerInfo } from "./components/customer-info";
import { CashbackInfo } from "./components/cashback-info";

export default function AccountTemplate({
  customer,
}: {
  customer: ExtendedStoreCustomer | null;
}) {
  return (
    <div className="grid gap-5">
      {customer && (
        <>
          <CustomerInfo customer={customer} />
          <CashbackInfo customer={customer} />
          <Separator />
        </>
      )}
      <Settings customer={customer} />
    </div>
  );
}
