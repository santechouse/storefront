import { HttpTypes } from "@medusajs/types";
import OrderCard from "../../components/order-card";
import { Package2 } from "lucide-react";

interface Props {
  orders: HttpTypes.StoreOrder[];
}

export default function OrderListTemplate({ orders }: Props) {
  if (!orders) return null;
  return (
    <div className="flex-1 flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-end flex-wrap gap-4 mt-2">
          <div>
            <h1 className="text-[#0d121c] dark:text-white text-3xl font-bold tracking-tight">
              Your Orders
            </h1>
            <p className="text-[#49659c] dark:text-gray-400 mt-1">
              Track pending shipments, review history, or buy items again.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Package2 />
            </div>
            <h3 className="text-lg font-bold">No orders found</h3>
            <p className="text-[#49659c]">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
