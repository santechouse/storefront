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
      className="flex justify-between items-center"
    >
      <div className="flex gap-3 items-center">
        <HugeiconsIcon className="size-5" icon={LogoutSquare01Icon} />
        <h3 className="font-medium">{t("logIn")}</h3>
      </div>
      <HugeiconsIcon icon={ArrowRight01Icon} />
    </div>
  );
};
