import { HttpTypes } from "@medusajs/types";
import { MapPin, TruckIcon } from "lucide-react";

interface Props {
  order: HttpTypes.StoreOrder;
}

const ShippingInfo: React.FC<Props> = ({ order }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="rounded-xl border border-[#ced7e8] dark:border-[#2a3241] bg-white dark:bg-[#1e2433] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-[#0d121c] dark:text-white">
          <MapPin />
          <h3 className="text-base font-bold">Shipping Address</h3>
        </div>
        <div className="pl-8">
          <p className="text-sm font-medium text-[#0d121c] dark:text-white">
            Alex Morgan
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {order.shipping_address?.address_1}
            <br />
            {order.shipping_address?.city}, {order.shipping_address?.province}
            <br />
          </p>
          <div className="mt-4 pt-4 border-t border-[#ced7e8] dark:border-[#2a3241]">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
              Contact
            </p>
            <p className="text-sm text-[#0d121c] dark:text-white">
              {order.shipping_address?.phone}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-[#ced7e8] dark:border-[#2a3241] bg-white dark:bg-[#1e2433] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-[#0d121c] dark:text-white">
          <TruckIcon className="size-4" />
          <h3 className="text-base font-bold">Shipping Method</h3>
        </div>
        {order.shipping_methods?.map((option) => {
          return (
            <div key={option.id} className="pl-8">
              <p className="text-sm font-medium text-[#0d121c] dark:text-white">
                {option.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
              <p className="text-sm text-gray-500 mt-1"></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShippingInfo;
