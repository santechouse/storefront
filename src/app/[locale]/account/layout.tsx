import { retrieveCustomer } from "@/lib/data/customer";
import AccountSidebar from "@/modules/account/templates/account-template";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = await retrieveCustomer();

  return (
    <>
      {/* Desktop: sidebar + content */}
      <div className="hidden lg:flex w-full gap-6 items-start">
        <AccountSidebar customer={customer} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>

      {/* Mobile: children only (sidebar rendered inside account page itself) */}
      <div className="lg:hidden w-full">{children}</div>
    </>
  );
}
