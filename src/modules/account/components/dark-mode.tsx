"use client";
import { Switch } from "@/components/ui/switch";
import { Moon02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export const DarkMode = () => {
  const t = useTranslations("Account");
  const { theme, setTheme } = useTheme();
  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-between px-4 py-3.5 cursor-pointer active:bg-muted/60 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="opacity-70">
          <HugeiconsIcon className="size-5" icon={Moon02Icon} />
        </span>
        <span className="text-sm font-medium">{t("theme")}</span>
      </div>
      <Switch checked={theme === "dark"} />
    </div>
  );
};
