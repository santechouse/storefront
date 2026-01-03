import { redirect } from "@/i18n/navigation";
import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import CheckoutFormTemplate from "@/modules/checkout/templates/checkout-form";
import { notFound } from "next/navigation";

export default async function CheckoutPage(
  props: PageProps<"/[locale]/checkout">,
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const customer = await retrieveCustomer();
  if (!customer) {
    redirect({ locale: params.locale, href: "/account/login" });
  }
  if (!searchParams.step) {
    redirect({ locale: params.locale, href: "?step=address" });
  }
  const cart = await retrieveCart();
  if (!cart) {
    notFound();
  }
  return <CheckoutFormTemplate cart={cart} />;
}
