"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { HttpTypes } from "@medusajs/types";
import { LogOut, Package2, User } from "lucide-react";

interface AccountTemplateProps {
  customer: HttpTypes.StoreCustomer;
}

const AccountTemplate: React.FC<AccountTemplateProps> = ({ customer }) => {
  const pathname = usePathname();
  const links = [
    {
      link: "/account/dashboard/orders",
      label: "My Orders",
      icon: <Package2 className="size-4" />,
    },
    {
      link: "/account/dashboard/profile",
      label: "Profile",
      icon: <User className="size-4" />,
    },
  ];
  return (
    <aside className="w-full max-w-3xl shrink-0">
      <div className="bg-white dark:bg-[#1a2230] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-slate-900 dark:text-white font-semibold text-base">
                {customer.first_name} {customer.last_name}
              </h3>
            </div>
          </div>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {links.map((link) => {
            const isActive = link.link === pathname;
            const linkClass = isActive
              ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/5 text-primary font-medium transition-colors"
              : "flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium transition-colors group";
            return (
              <Link key={link.link} className={linkClass} href={link.link}>
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-700">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
            href="#"
          >
            <LogOut className="size-4" />
            <span className="text-sm">Logout</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
export default AccountTemplate;
