import { ExtendedStoreCustomer } from "@/lib/data/customer";

export const CustomerInfo = ({
  customer,
}: {
  customer: ExtendedStoreCustomer;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h2 className="font-semibold text-xl">
        {customer.first_name} {customer.last_name}
      </h2>
      <p className="">+{customer.phone}</p>
    </div>
  );
};
