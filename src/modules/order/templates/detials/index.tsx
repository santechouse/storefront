import { HttpTypes } from "@medusajs/types";
import Items from "../../components/items";
import ShippingInfo from "../../components/shipping-info";
import Status from "../../components/status";
import Summary from "../../components/summary";
import Header from "../../components/header";

interface Props {
  order: HttpTypes.StoreOrder;
}

export default function OrderDetailsTemplate({ order }: Props) {
  return (
    <div className="flex-1 flex flex-col">
      <Header order={order} />
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Status order={order} />
          <Items order={order} />
        </div>
        <div className="flex flex-col gap-6">
          <Summary order={order} />
          <ShippingInfo order={order} />
        </div>
      </div>
    </div>
  );
}
