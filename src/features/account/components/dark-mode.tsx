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
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      className="flex justify-between items-center"
    >
      <div className="flex gap-3 items-center">
        <HugeiconsIcon className="size-5" icon={Moon02Icon} />
        <h3 className="font-medium">{t("theme")}</h3>
      </div>
      <Switch checked={theme == "dark"} />
    </div>
  );
};
