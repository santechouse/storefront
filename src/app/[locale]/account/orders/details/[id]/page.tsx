import { retrieveOrder } from "@/lib/data/orders";
import OrderDetailsTemplate from "@/modules/order/templates/detials";

export default async function OrderDetailsPage(
  props: PageProps<"/[locale]/account/orders/details/[id]">,
) {
  const params = await props.params;
  const order = await retrieveOrder(params.id);
  return <OrderDetailsTemplate order={order} />;
}
