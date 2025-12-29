import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";

interface Props {
  order: HttpTypes.StoreOrder;
}

const Summary: React.FC<Props> = ({ order }) => {
  return (
    <div className="rounded-xl border border-[#ced7e8] dark:border-[#2a3241] bg-white dark:bg-[#1e2433] p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-[#0d121c] dark:text-white">
        Order Summary
      </h3>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-medium text-[#0d121c] dark:text-white">
            {convertToLocale({
              amount: order.item_subtotal,
              currency_code: order.currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="font-medium text-[#0d121c] dark:text-white">
            {convertToLocale({
              amount: order.shipping_total,
              currency_code: order.currency_code,
            })}
          </span>
        </div>
        <div className="my-2 h-px bg-[#ced7e8] dark:bg-[#2a3241]"></div>
        <div className="flex justify-between text-base font-bold">
          <span className="text-[#0d121c] dark:text-white">Total</span>
          <span className="text-[#0d121c] dark:text-white">
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
