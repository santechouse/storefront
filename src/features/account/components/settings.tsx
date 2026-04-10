"use client";
import { LanguageSelect } from "./language-select";
import { DarkMode } from "./dark-mode";
import { LogOut } from "./log-out";
import { ExtendedStoreCustomer } from "@/lib/data/customer";
import { LogIn } from "./log-in";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import {
  ArrowRight01Icon,
  Location01Icon,
  Package01Icon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "@/i18n/navigation";

export const Settings = ({
  customer,
}: {
  customer: ExtendedStoreCustomer | null;
}) => {
  const t = useTranslations("Account");
  const router = useRouter();
  const components = [
    {
      component: (
        <div
          onClick={() => router.push("/account/orders")}
          className="flex justify-between items-center"
        >
          <div className="flex gap-3 items-center">
            <HugeiconsIcon className="size-5" icon={Package01Icon} />
            <h3 className="font-medium">{t("orders")}</h3>
          </div>
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </div>
      ),
      requiresAuth: true,
    },
    {
      component: (
        <div
          onClick={() => router.push("/account/addresses")}
          className="flex justify-between items-center"
        >
          <div className="flex gap-3 items-center">
            <HugeiconsIcon className="size-5" icon={Location01Icon} />
            <h3 className="font-medium">{t("addressesNav")}</h3>
          </div>
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </div>
      ),
      requiresAuth: true,
    },
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
