"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowRight01Icon,
  LanguageSquareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Select,
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectIcon,
  SelectViewport,
  SelectItemIndicator,
} from "@radix-ui/react-select";
import { useLocale, useTranslations } from "next-intl";

const languages = [
  { label: "Русский", value: "ru" },
  { label: "O'zbekcha", value: "uz" },
];

export const LanguageSelect = ({ className }: { className?: string }) => {
  const t = useTranslations("Account");
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select
      onValueChange={(value) => handleLanguageChange(value)}
      defaultValue={locale}
    >
      <SelectTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-between cursor-pointer active:bg-muted/60 transition-colors outline-none",
            className,
          )}
        >
          <div className="flex items-center gap-3">
            <span className="opacity-70">
              <HugeiconsIcon icon={LanguageSquareIcon} className="size-5" />
            </span>
            <span className="text-sm font-medium">{t("language")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {languages.find((l) => l.value === locale)?.label}
            </span>
            <SelectIcon>
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 opacity-40" />
            </SelectIcon>
          </div>
        </div>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          sideOffset={8}
          className="z-50 min-w-(--radix-select-trigger-width) overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl animate-in fade-in zoom-in-95"
        >
          <SelectViewport className="p-2">
            {languages.map((lang) => (
              <SelectItem
                key={lang.value}
                value={lang.value}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg py-3 px-3 text-sm outline-none transition-colors",
                  "focus:bg-accent focus:text-accent-foreground data-[state=checked]:font-semibold data-[state=checked]:bg-primary/5",
                )}
              >
                <SelectItemText>{lang.label}</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};
