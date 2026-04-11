import { retrieveCustomer } from "@/lib/data/customer";
import AccountPage from "@/modules/account/templates/account-dashboard";

export default async function Page() {
  const customer = await retrieveCustomer();
  return <AccountPage customer={customer} />;
}
