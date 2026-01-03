import { listOrders } from "@/lib/data/orders";
import OrderListTemplate from "@/modules/order/templates/list";

export default async function OrderListPage() {
  const orders = await listOrders();

  if (!orders) {
    return null;
  }

  return <OrderListTemplate orders={orders} />;
}
