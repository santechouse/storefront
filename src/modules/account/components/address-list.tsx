"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link } from "@/i18n/navigation";
import { ExtendedStoreCustomer } from "@/lib/data/customer";
import { HttpTypes } from "@medusajs/types";
import {
  ArrowRight,
  BookUser,
  MapPin,
  MapPinned,
  PackageCheck,
  PencilLine,
  Plus,
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

function AddressCard({
  address,
  t,
}: {
  address: HttpTypes.StoreCustomerAddress;
  t: ReturnType<typeof useTranslations<"Account.addresses">>;
}) {
  const lines = getAddressLines(address);
  const [editing, setEditing] = React.useState(false);

  if (editing) {
    return (
      <article className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("editAddressEyebrow")}
          </span>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("cancelEdit")}
          </button>
        </div>
        <AddressForm
          address={address}
          onSuccess={() => setEditing(false)}
          onCancel={() => setEditing(false)}
        />
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-border bg-card">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="size-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">
              {lines[0] || t("fallbackLabel")}
            </p>
            {address.phone && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                +{address.phone}
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="shrink-0 flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          <PencilLine className="size-3.5" />
          {t("edit")}
        </button>
      </div>

      {/* Address lines */}
      <div className="px-4 pb-3 text-sm text-muted-foreground leading-relaxed">
        {lines.slice(1).join(", ")}
      </div>

      {/* Default badges */}
      {(address.is_default_shipping || address.is_default_billing) && (
        <div className="flex flex-wrap gap-2 px-4 pb-4 border-t border-border pt-3">
          {address.is_default_shipping && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <PackageCheck className="size-3.5" />
              {t("defaultShipping")}
            </span>
          )}
          {address.is_default_billing && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              <ShieldCheck className="size-3.5" />
              {t("defaultBilling")}
            </span>
          )}
        </div>
      )}
    </article>
  );
}

export default function AddressListPage({ customer }: AddressListPageProps) {
  const t = useTranslations("Account.addresses");
  const addresses = customer?.addresses || [];
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  if (!customer) {
    return (
      <div className="flex flex-col items-center gap-5 px-6 py-14 text-center">
        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <BookUser className="size-7" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-lg font-semibold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            {t("loginDescription")}
          </p>
        </div>
        <Button asChild>
          <Link href="/account/login">{t("loginCta")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("eyebrow")}
          </span>
          <h1 className="text-lg font-semibold">{t("title")}</h1>
        </div>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="size-4" />
              {t("newAddressEyebrow")}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="pb-2">
              <DrawerTitle>{t("newAddressTitle")}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
              <AddressForm
                onSuccess={() => setDrawerOpen(false)}
                onCancel={() => setDrawerOpen(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Address list */}
      {addresses.length > 0 ? (
        <div className="flex flex-col gap-3">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} t={t} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
          <div className="size-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
            <MapPinned className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{t("emptyTitle")}</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              {t("emptyDescription")}
            </p>
          </div>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
          >
            {t("emptyCta")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
