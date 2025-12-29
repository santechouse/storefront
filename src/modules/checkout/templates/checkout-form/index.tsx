import { HttpTypes } from "@medusajs/types";
import Address from "../../components/address";
import Shipping from "../../components/shipping";
import { listCartShippingMethods } from "@/lib/data/fulfillment";
import Summary from "../../components/summary";
import Payment from "../../components/payment";
import { listCartPaymentMethods } from "@/lib/data/payment";
import Review from "../../components/review";

type Props = {
  cart: HttpTypes.StoreCart;
};

export default async function CheckoutFormTemplate({ cart }: Props) {
  const shippingMethods = await listCartShippingMethods(cart.id);
  const paymentMethods = await listCartPaymentMethods(cart.region_id || "");

  return (
    <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 flex flex-col gap-8">
        <Address cart={cart} />
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
        <Payment cart={cart} availablePaymentMethods={paymentMethods || []} />
        <Review cart={cart} />
      </div>
      <div className="lg:col-span-5 relative">
        <Summary cart={cart} />
      </div>
    </div>
  );
}
