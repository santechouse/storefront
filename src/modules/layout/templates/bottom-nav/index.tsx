"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { Home, ShoppingCart, TextSearch, User } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BottomNav() {
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
    },
    {
      href: "/profile",
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
              <link.icon className="size-5" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
