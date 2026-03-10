import { retrieveCustomer } from "@/lib/data/customer";
import AccountTemplate from "@/modules/account/templates/account-template";

export default async function AccountPage() {
  const customer = await retrieveCustomer();
  return <AccountTemplate customer={customer} />;
}
