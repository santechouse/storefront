"use client";
import { LanguageSelect } from "./language-select";
import { DarkMode } from "./dark-mode";
import { LogOut } from "./log-out";
import { ExtendedStoreCustomer } from "@/lib/data/customer";
import { LogIn } from "./log-in";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import {
  ArrowRight01Icon,
  Location01Icon,
  Package01Icon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "@/i18n/navigation";

function SettingsRow({
  icon,
  label,
  onClick,
  right,
  danger,
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  right?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3.5 ${onClick ? "cursor-pointer active:bg-muted/60 transition-colors" : ""} ${danger ? "text-rose-500" : ""}`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className={`opacity-70 ${danger ? "text-rose-500" : ""}`}>
            {icon}
          </span>
        )}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {right !== undefined ? (
        right
      ) : onClick ? (
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4 opacity-40"
        />
      ) : null}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="px-4 pt-5 pb-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function SectionGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
      {children}
    </div>
  );
}

export const Settings = ({
  customer,
}: {
  customer: ExtendedStoreCustomer | null;
}) => {
  const t = useTranslations("Account");
  const router = useRouter();
  const isAuthenticated = !!customer;

  return (
    <div className="flex flex-col select-none">
      {isAuthenticated && (
        <>
          <SectionLabel label={t("profile")} />
          <SectionGroup>
            <SettingsRow
              icon={<HugeiconsIcon className="size-5" icon={Package01Icon} />}
              label={t("orders")}
              onClick={() => router.push("/account/orders")}
            />
            <SettingsRow
              icon={<HugeiconsIcon className="size-5" icon={Location01Icon} />}
              label={t("addressesNav")}
              onClick={() => router.push("/account/addresses")}
            />
          </SectionGroup>
        </>
      )}

      <SectionLabel label={t("theme")} />
      <SectionGroup>
        <DarkMode />
        <LanguageSelect className="px-4 py-3.5" />
      </SectionGroup>

      <div className="pt-1">
        <SectionGroup>
          {isAuthenticated ? <LogOut /> : <LogIn />}
        </SectionGroup>
      </div>
    </div>
  );
};
