"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { ExtendedStoreCustomer, signout } from "@/lib/data/customer";
import { convertToLocale } from "@/lib/util/money";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  Location01Icon,
  LogoutSquare01Icon,
  Moon02Icon,
  Package01Icon,
  Sun03Icon,
  SystemUpdate01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface AccountTemplateProps {
  customer: ExtendedStoreCustomer | null;
}

const AccountTemplate: React.FC<AccountTemplateProps> = ({ customer }) => {
  const t = useTranslations("Account");
  const tLogin = useTranslations("Login");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const { theme, setTheme } = useTheme();

  const links = [
    {
      link: "/account/orders",
      label: t("orders"),
      icon: <HugeiconsIcon icon={Package01Icon} className="size-5" />,
    },
    {
      link: "/account/addresses",
      label: t("addressesNav"),
      icon: <HugeiconsIcon icon={Location01Icon} className="size-5" />,
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

  const initials = customer
    ? [customer.first_name, customer.last_name]
        .filter(Boolean)
        .map((n) => n![0].toUpperCase())
        .join("")
    : "";

  return (
    <aside className="w-72 shrink-0 flex flex-col gap-0 select-none">
      <div className="rounded-2xl border border-border overflow-hidden">
        {customer ? (
          <>
            {/* Profile header */}
            <div className="px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary leading-none">
                    {initials || "?"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t("profile")}
                  </p>
                  <h3 className="text-sm font-semibold truncate">
                    {customer.first_name} {customer.last_name}
                  </h3>
                  {customer.phone && (
                    <p className="text-xs text-muted-foreground">
                      +{customer.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Cashback balance */}
            {formattedBalance && (
              <div className="px-5 py-4 border-b border-border bg-primary/[0.03]">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary/70">
                      {t("cashback")}
                    </span>
                    <span className="text-xl font-bold tabular-nums text-foreground leading-tight">
                      {formattedBalance}
                    </span>
                  </div>
                  <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M2 8h20M2 12h6m-6 4h4M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="p-2 border-b border-border">
              {links.map((link) => {
                const isActive = pathname === link.link;
                return (
                  <Link
                    key={link.link}
                    href={link.link}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <span className={isActive ? "text-primary" : "opacity-60"}>
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </>
        ) : (
          <div className="p-4 border-b border-border">
            <Link
              href="/account/login"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {tLogin("signIn")}
            </Link>
          </div>
        )}

        {/* Settings: theme + language */}
        <div className="p-2">
          <div className="px-3 pt-3 pb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("theme")}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 mb-2">
            {(
              [
                { value: "light", icon: Sun03Icon, label: t("themes.light") },
                { value: "dark", icon: Moon02Icon, label: t("themes.dark") },
                {
                  value: "system",
                  icon: SystemUpdate01Icon,
                  label: t("themes.system"),
                },
              ] as const
            ).map(({ value, icon, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-colors border ${
                  theme === value
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "text-muted-foreground hover:bg-muted/60 border-transparent"
                }`}
              >
                <HugeiconsIcon icon={icon} className="size-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="px-3 pt-2 pb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("language")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 mb-2">
            {(
              [
                { value: "ru" as const, label: "Русский" },
                { value: "uz" as const, label: "O'zbek" },
              ]
            ).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleLanguageChange(value)}
                className={`flex items-center justify-center px-3 py-2 rounded-xl text-sm font-medium transition-colors border ${
                  locale === value
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "text-muted-foreground hover:bg-muted/60 border-transparent"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {customer && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
            >
              <span className="opacity-70">
                <HugeiconsIcon icon={LogoutSquare01Icon} className="size-5" />
              </span>
              {t("logOut")}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AccountTemplate;
