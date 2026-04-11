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
            "flex justify-between items-center cursor-pointer transition-all outline-none",
            className,
          )}
        >
          <div className="flex gap-3 items-center">
            <HugeiconsIcon icon={LanguageSquareIcon} className="size-5" />
            <h3 className="font-medium">{t("language")}</h3>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm">
              {languages.find((l) => l.value == locale)?.label} (
              {locale.toUpperCase()})
            </p>
            <SelectIcon>
              <HugeiconsIcon icon={ArrowRight01Icon} />
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
                <div className="flex items-center gap-3">
                  <SelectItemText>{lang.label}</SelectItemText>
                </div>

                <SelectItemIndicator></SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};
