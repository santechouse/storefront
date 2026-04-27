import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");

  const navLinks = [
    { href: "/catalog", label: t("catalog") },
    { href: "/catalog?category=pipes", label: t("pipes") },
    { href: "/catalog?category=fittings", label: t("fittings") },
    { href: "/catalog?category=faucets", label: t("faucets") },
    { href: "/catalog?category=tools", label: t("tools") },
  ];

  const infoLinks = [
    { href: "/account", label: t("account") },
    { href: "/cart", label: t("cart") },
  ];

  return (
    <footer className="hidden md:block border-t border-border bg-secondary">
      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-7 text-primary">
                <Image src="/logo.svg" width={28} height={28} alt="Logo" />
              </div>
              <span className="text-base font-bold tracking-[-0.015em]">Santechouse</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-56">
              {t("description")}
            </p>
            <address className="not-italic flex flex-col gap-1">
              <a
                href="tel:+998712345678"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                +998 71 234-56-78
              </a>
              <a
                href="mailto:info@santechouse.uz"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                info@santechouse.uz
              </a>
            </address>
          </div>

          {/* Catalog */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("catalogTitle")}
            </span>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & info */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("accountTitle")}
            </span>
            <ul className="flex flex-col gap-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Santechouse. {t("rights")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("country")}
          </p>
        </div>
      </div>
    </footer>
  );
}
