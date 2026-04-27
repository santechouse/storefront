"use client";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import {
  CatalogueIcon,
  Home01Icon,
  ShoppingCart01Icon,
  UserCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";

export default function BottomNav({ cartCount = 0 }: { cartCount?: number }) {
  const t = useTranslations("BottomNav");
  const pathname = usePathname();

  const links = [
    { href: "/", icon: Home01Icon, label: t("home") },
    { href: "/catalog", icon: CatalogueIcon, label: t("catalog") },
    { href: "/cart", icon: ShoppingCart01Icon, label: t("cart"), count: cartCount },
    { href: "/account", icon: UserCircle02Icon, label: t("profile") },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border px-2 py-2 z-50">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-0.5 min-w-14"
            >
              <div
                className={cn(
                  "relative flex size-9 items-center justify-center rounded-xl transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                <HugeiconsIcon icon={link.icon} className="size-5" />
                {link.count !== undefined && link.count > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold tabular-nums text-primary-foreground leading-none">
                    {link.count > 99 ? "99+" : link.count}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
