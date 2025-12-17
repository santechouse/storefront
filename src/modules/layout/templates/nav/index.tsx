import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { ShoppingCart, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Nav() {
  const t = useTranslations("Nav");
  return (
    <div className=" sticky top-0 z-50 w-full px-4 py-4 md:px-10 lg:px-20 flex justify-center backdrop-blur-md bg-white/80 dark:bg-background/80 border-b border-slate-200 dark:border-[#282e39]/50">
      <div className="flex w-full max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="size-8 text-primary">
              <Image src="/logo.svg" width={40} height={40} alt="Logo" />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              Santechouse
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 md:gap-6 flex-1">
          <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64 flex-1">
            <Input
              className="w-full border-none bg-slate-100 dark:bg-[#282e39] text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-text-secondary text-sm"
              placeholder={t("searchPlaceholder")}
            />
          </label>
          <div className="flex gap-3">
            <Link
              href="/cart"
              className="hidden md:flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-[#282e39] hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors text-slate-900 dark:text-white"
            >
              <ShoppingCart className="size-4" />
            </Link>
            <Link
              href="/profile"
              className="hidden md:flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-[#282e39] hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors text-slate-900 dark:text-white"
            >
              <UserIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
