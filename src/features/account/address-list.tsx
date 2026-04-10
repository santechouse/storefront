import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ExtendedStoreCustomer } from "@/lib/data/customer";
import { HttpTypes } from "@medusajs/types";
import {
  ArrowRight,
  BookUser,
  MapPinned,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import AddressForm from "./address-form";

interface AddressListPageProps {
  customer: ExtendedStoreCustomer | null;
}

const getAddressLines = (address: HttpTypes.StoreCustomerAddress) => {
  const cityLine = [address.city, address.province, address.postal_code]
    .filter(Boolean)
    .join(", ");

  return [
    [address.first_name, address.last_name].filter(Boolean).join(" ").trim(),
    address.company,
    address.address_1,
    address.address_2,
    cityLine,
    address.country_code?.toUpperCase(),
  ].filter(Boolean);
};

export default function AddressListPage({ customer }: AddressListPageProps) {
  const t = useTranslations("Account.addresses");
  const addresses = customer?.addresses || [];

  if (!customer) {
    return (
      <div className="flex-1">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BookUser className="size-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t("loginDescription")}
            </p>
            <Button asChild className="mt-6">
              <Link href="/account/login">{t("loginCta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t("description")}
            </p>
          </div>
          <div className="inline-flex items-center gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/70">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPinned className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {t("savedCount")}
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {t("count", { count: addresses.length })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <AddressForm />

      {addresses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => {
            const lines = getAddressLines(address);

            return (
              <article
                key={address.id}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-[#111827]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {lines[0] || t("fallbackLabel")}
                    </h2>
                    {address.phone && (
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        +{address.phone}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {address.is_default_shipping && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <PackageCheck className="size-3.5" />
                        {t("defaultShipping")}
                      </span>
                    )}
                    {address.is_default_billing && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        <ShieldCheck className="size-3.5" />
                        {t("defaultBilling")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {lines.slice(1).map((line) => (
                    <p key={`${address.id}-${line}`}>{line}</p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/40">
          <div className="mx-auto flex max-w-md flex-col items-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm dark:bg-slate-950">
              <MapPinned className="size-8" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {t("emptyTitle")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t("emptyDescription")}
            </p>
            <Link
              href="/checkout"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              {t("emptyCta")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
