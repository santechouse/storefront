"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { addCustomerAddress } from "@/lib/data/customer";
import { CheckCircle2, MapPinned, Plus, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

const initialState = {
  success: false,
  error: null as string | null,
};

export default function AddressForm() {
  const t = useTranslations("Account.addresses");
  const tCountries = useTranslations("Countries");
  const [state, formAction, isPending] = React.useActionState(
    addCustomerAddress,
    initialState,
  );
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t("newAddressEyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t("newAddressTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            {t("newAddressDescription")}
          </p>
        </div>
        <div className="inline-flex items-center gap-3 self-start rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/70">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Plus className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t("formBadge")}
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {t("formBadgeValue")}
            </p>
          </div>
        </div>
      </div>

      <form ref={formRef} action={formAction} className="mt-6 space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.firstName")}
            </span>
            <Input
              name="first_name"
              placeholder={t("placeholders.firstName")}
              className="bg-secondary"
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.lastName")}
            </span>
            <Input
              name="last_name"
              placeholder={t("placeholders.lastName")}
              className="bg-secondary"
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.phone")}
            </span>
            <Input
              name="phone"
              type="tel"
              placeholder={t("placeholders.phone")}
              className="bg-secondary"
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.company")}
            </span>
            <Input
              name="company"
              placeholder={t("placeholders.company")}
              className="bg-secondary"
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.address1")}
            </span>
            <Input
              name="address_1"
              placeholder={t("placeholders.address1")}
              className="bg-secondary"
              required
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.address2")}
            </span>
            <Input
              name="address_2"
              placeholder={t("placeholders.address2")}
              className="bg-secondary"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.city")}
            </span>
            <Input
              name="city"
              placeholder={t("placeholders.city")}
              className="bg-secondary"
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.province")}
            </span>
            <Input
              name="province"
              placeholder={t("placeholders.province")}
              className="bg-secondary"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.postalCode")}
            </span>
            <Input
              name="postal_code"
              placeholder={t("placeholders.postalCode")}
              className="bg-secondary"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("fields.country")}
            </span>
            <NativeSelect
              name="country_code"
              className="w-full min-w-full bg-secondary"
              defaultValue="uz"
              required
            >
              <NativeSelectOption value="uz">
                {tCountries("uz")}
              </NativeSelectOption>
            </NativeSelect>
          </label>
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
          <label className="flex items-start gap-3">
            <input
              name="is_default_shipping"
              type="checkbox"
              className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {t("fields.defaultShipping")}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("defaultShippingHint")}
              </p>
            </div>
          </label>
          <label className="flex items-start gap-3">
            <input
              name="is_default_billing"
              type="checkbox"
              className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {t("fields.defaultBilling")}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("defaultBillingHint")}
              </p>
            </div>
          </label>
        </div>

        {state?.error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            <p>{state.error}</p>
          </div>
        )}

        {state?.success && !state?.error && (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <p>{t("successMessage")}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <MapPinned className="size-4 text-primary" />
            <span>{t("helperText")}</span>
          </div>
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? t("submitting") : t("submit")}
          </Button>
        </div>
      </form>
    </section>
  );
}
