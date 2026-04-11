import AddressListPage from "@/modules/account/components/address-list";
import { retrieveCustomer } from "@/lib/data/customer";

export default async function CustomerAddressesPage() {
  const customer = await retrieveCustomer();

  return <AddressListPage customer={customer} />;
}
