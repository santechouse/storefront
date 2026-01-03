import { retrieveCart } from "@/lib/data/cart";
import CartTemplate from "@/modules/cart/templates";
import { notFound } from "next/navigation";

export default async function CartPage() {
  const cart = await retrieveCart().catch(() => {
    notFound();
  });

  return <CartTemplate cart={cart} />;
}
