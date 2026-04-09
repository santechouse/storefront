"use client";
import { LanguageSelect } from "./language-select";
import { DarkMode } from "./dark-mode";
import { LogOut } from "./log-out";
import { ExtendedStoreCustomer } from "@/lib/data/customer";
import { LogIn } from "./log-in";

export const Settings = ({
  customer,
}: {
  customer: ExtendedStoreCustomer | null;
}) => {
  const components = [
    { component: <DarkMode /> },
    { component: <LanguageSelect /> },
    { component: <LogIn />, guestOnly: true },
    { component: <LogOut />, requiresAuth: true },
  ];

  const canRender = (item: any, isAuthenticated: boolean) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.guestOnly && isAuthenticated) return false;
    return true;
  };
  return (
    <div className="grid gap-5 select-none">
      {components
        .filter((item) => canRender(item, !!customer))
        .map((item, index) => (
          <div key={index}>{item.component}</div>
        ))}
    </div>
  );
};
