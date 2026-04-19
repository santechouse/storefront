import { ExtendedStoreCustomer } from "@/lib/data/customer";

export const CustomerInfo = ({
  customer,
}: {
  customer: ExtendedStoreCustomer;
}) => {
  const initials = [customer.first_name, customer.last_name]
    .filter(Boolean)
    .map((n) => n![0].toUpperCase())
    .join("");

  return (
    <div className="flex flex-col items-center gap-3 pt-2 pb-1">
      <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <span className="text-2xl font-bold text-primary leading-none">
          {initials || "?"}
        </span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <h2 className="text-lg font-semibold leading-tight">
          {customer.first_name} {customer.last_name}
        </h2>
        <p className="text-sm text-muted-foreground">+{customer.phone}</p>
      </div>
    </div>
  );
};
