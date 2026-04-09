import { retrieveCustomer } from "@/lib/data/customer";
import AccountPage from "@/features/account";

export default async function Page() {
  const customer = await retrieveCustomer();
  return <AccountPage customer={customer} />;
}
