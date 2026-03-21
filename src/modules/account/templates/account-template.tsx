"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { ExtendedStoreCustomer, signout } from "@/lib/data/customer";
import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { Languages, LogIn, LogOut, Monitor, Moon, Package2, Sun, User, Wallet } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

interface AccountTemplateProps {
  customer: ExtendedStoreCustomer | null;
}

const AccountTemplate: React.FC<AccountTemplateProps> = ({ customer }) => {
  const t = useTranslations("Account");
  const tLogin = useTranslations("Login");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const links = [
    {
      link: "/account/orders",
      label: t("orders"),
      icon: <Package2 className="size-4" />,
    },
    {
      link: "/account/profile",
      label: t("profile"),
      icon: <User className="size-4" />,
    },
  ];

  const handleLogout = async () => {
    await signout();
  };

  const handleLanguageChange = (newLocale: "ru" | "uz") => {
    router.replace(pathname, { locale: newLocale });
  };

  const cashbackAccount = customer?.cashback_accounts?.[0];
  const formattedBalance = cashbackAccount
    ? convertToLocale({
        amount: cashbackAccount.balance,
        currency_code: cashbackAccount.currency_code,
        locale: locale === "uz" ? "uz-UZ" : "ru-RU",
      })
    : null;

  return (
    <aside className="w-full max-w-3xl shrink-0">
      <div className="bg-white dark:bg-[#1a2230] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {customer ? (
          <>
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
                    {t("profile")}
                  </p>
                  <h3 className="text-slate-900 dark:text-white font-semibold text-lg">
                    {customer.first_name} {customer.last_name}
                  </h3>
                </div>
                <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <User className="size-6 text-slate-600 dark:text-slate-400" />
                </div>
              </div>
            </div>

            {formattedBalance && (
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-primary/[0.03] dark:bg-primary/[0.02]">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
                      {t("cashback")}
                    </span>
                    <span className="text-2xl font-bold text-primary dark:text-primary tracking-tight">
                      {formattedBalance}
                    </span>
                  </div>
                  <div className="size-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center shadow-inner">
                    <Wallet className="size-6 text-primary" />
                  </div>
                </div>
              </div>
            )}

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
          </>
        ) : (
          <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <Link
              href="/account/login"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary dark:bg-primary text-primary-foreground font-medium hover:bg-primary/90 dark:hover:bg-primary/90 transition-colors justify-center"
            >
              <LogIn className="size-4" />
              <span className="text-sm">{tLogin("signIn")}</span>
            </Link>
          </div>
        )}
        <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-700 flex flex-col gap-1">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {t("language")}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLanguageChange("ru")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${locale === "ru"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent"
                }`}
            >
              <span className="text-sm">Русский</span>
            </button>
            <button
              onClick={() => handleLanguageChange("uz")}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${locale === "uz"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent"
                }`}
            >
              <span className="text-sm">O&apos;zbekcha</span>
            </button>
          </div>

          <div className="mt-4 px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {t("theme")}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg transition-colors border ${theme === "light"
                ? "bg-primary/10 text-primary border-primary/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent"
                }`}
              title={t("themes.light")}
            >
              <Sun className="size-4" />
              <span className="text-[10px] uppercase font-bold tracking-tight">
                {t("themes.light")}
              </span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg transition-colors border ${theme === "dark"
                ? "bg-primary/10 text-primary border-primary/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent"
                }`}
              title={t("themes.dark")}
            >
              <Moon className="size-4" />
              <span className="text-[10px] uppercase font-bold tracking-tight">
                {t("themes.dark")}
              </span>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg transition-colors border ${theme === "system"
                ? "bg-primary/10 text-primary border-primary/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent"
                }`}
              title={t("themes.system")}
            >
              <Monitor className="size-4" />
              <span className="text-[10px] uppercase font-bold tracking-tight">
                {t("themes.system")}
              </span>
            </button>
          </div>

          {customer && (
            <>
              <div className="my-3 border-t border-slate-100 dark:border-slate-700" />
              <button
                onClick={handleLogout}
                className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
              >
                <LogOut className="size-4" />
                <span className="text-sm">{t("logOut")}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
export default AccountTemplate;
