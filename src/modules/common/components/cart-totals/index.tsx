import { convertToLocale } from "@/lib/util/money";

type CartTotalsProps = {
  totals: {
    total?: number | null;
    subtotal?: number | null;
    tax_total?: number | null;
    currency_code: string;
    item_subtotal?: number | null;
    shipping_subtotal?: number | null;
    discount_subtotal?: number | null;
  };
};

export function CartTotals({ totals }: CartTotalsProps) {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals;
  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center text-sm">
        <span className="text-[#49659c]">Subtotal</span>
        <span className="font-semibold text-[#0d121c] ">
          {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-[#49659c]">Shipping Estimate</span>
        <span className="text-green-600 font-medium">Free</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-[#49659c]">Tax Estimate</span>
        <span className="font-semibold text-[#0d121c] ">$83.92</span>
      </div>
    </div>
  );
}
