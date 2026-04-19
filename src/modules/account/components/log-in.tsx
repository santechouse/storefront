"use client";
import { useRouter } from "@/i18n/navigation";
import {
  ArrowRight01Icon,
  LogoutSquare01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";

export const LogIn = () => {
  const t = useTranslations("Account");
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/account/login")}
      className="flex items-center justify-between px-4 py-3.5 cursor-pointer active:bg-muted/60 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="opacity-70">
          <HugeiconsIcon className="size-5" icon={LogoutSquare01Icon} />
        </span>
        <span className="text-sm font-medium">{t("logIn")}</span>
      </div>
      <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 opacity-40" />
    </div>
  );
};
