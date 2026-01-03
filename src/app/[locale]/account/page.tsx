import { redirect } from "@/i18n/navigation";
import { retrieveCustomer } from "@/lib/data/customer";
import AccountTemplate from "@/modules/account/templates/account-template";

export default async function AccountPage(
  props: PageProps<"/[locale]/account">,
) {
  const params = await props.params;
  const customer = await retrieveCustomer();
  if (!customer) {
    return redirect({ locale: params.locale, href: "/account/login" });
  }
  return <AccountTemplate customer={customer} />;
}
