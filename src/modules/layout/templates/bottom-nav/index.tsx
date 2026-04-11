"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { Home, ShoppingCart, TextSearch, User } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BottomNav({ cartCount = 0 }: { cartCount?: number }) {
  const t = useTranslations("BottomNav");
  const pathname = usePathname();
  const links = [
    {
      href: "/",
      icon: Home,
      label: t("home"),
    },
    {
      href: "/catalog",
      icon: TextSearch,
      label: t("catalog"),
    },
    {
      href: "/cart",
      icon: ShoppingCart,
      label: t("cart"),
      count: cartCount,
    },
    {
      href: "/account",
      icon: User,
      label: t("profile"),
    },
  ];
  return (
    <nav className="md:hidden sticky bottom-0 left-0 right-0 backdrop-blur-md bg-background/80 border-t border-gray-200 dark:border-white/5 px-6 py-3 z-50">
      <div className="flex items-center justify-between">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center ${pathname === link.href ? "text-primary" : "text-muted-foreground"} gap-1 `}
            >
              <div className="relative">
                <link.icon className="size-5" />
                {link.count !== undefined && link.count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {link.count > 99 ? "99+" : link.count}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
