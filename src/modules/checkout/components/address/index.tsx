"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAddresses } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useTranslations } from "next-intl";

type AddressProps = {
  cart: HttpTypes.StoreCart;
};

const Address: React.FC<AddressProps> = ({ cart }) => {
  const t = useTranslations("Checkout.address");
  const tCountries = useTranslations("Countries");
  const searchParams = useSearchParams();
  const [formData, setFormData] = React.useState<Record<string, any>>({
    "shipping_address.first_name": cart.shipping_address?.first_name || "",
    "shipping_address.last_name": cart.shipping_address?.last_name || "",
    "shipping_address.address_1": cart.shipping_address?.address_1 || "",
    "shipping_address.city": cart.shipping_address?.city || "",
    "shipping_address.province": cart.shipping_address?.province || "",
    "shipping_address.phone": cart.shipping_address?.phone || "",
  });
  const [message, formAction] = React.useActionState(setAddresses, null);
  const isOpen = searchParams.get("step") === "address";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const countryOptions = React.useMemo(() => {
    if (!cart.region) return [];
    return cart.region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.iso_2 ? tCountries(country.iso_2) : country.display_name,
    }));
  }, [cart, tCountries]);

  if (!isOpen) return null;

  return (
    <form action={formAction} className="flex-1 flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-foreground text-3xl font-bold leading-tight tracking-[-0.033em]">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <hr className="border-border" />

      <section className="flex flex-col gap-5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t("details")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label={t("firstName")}>
            <Input
              value={formData["shipping_address.first_name"]}
              onChange={handleChange}
              name="shipping_address.first_name"
              className="bg-secondary"
              type="text"
            />
          </FormField>
          <FormField label={t("lastName")}>
            <Input
              value={formData["shipping_address.last_name"]}
              onChange={handleChange}
              name="shipping_address.last_name"
              className="bg-secondary"
              type="text"
            />
          </FormField>
        </div>

        <FormField label={t("country")}>
          <NativeSelect
            name="shipping_address.country_code"
            value={formData["shipping_address.country_code"]}
            onChange={handleChange}
            className="w-full"
            required
          >
            {countryOptions?.map(({ value, label }, index) => (
              <NativeSelectOption key={index} value={value}>
                {label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </FormField>

        <FormField label={t("address")}>
          <Input
            value={formData["shipping_address.address_1"]}
            onChange={handleChange}
            name="shipping_address.address_1"
            className="bg-secondary"
            type="text"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label={t("city")}>
            <Input
              value={formData["shipping_address.city"]}
              onChange={handleChange}
              name="shipping_address.city"
              className="bg-secondary"
              type="text"
            />
          </FormField>
          <FormField label={t("state")}>
            <Input
              value={formData["shipping_address.province"]}
              onChange={handleChange}
              name="shipping_address.province"
              className="bg-secondary"
              type="text"
            />
          </FormField>
        </div>

        <FormField label={t("phone")}>
          <Input
            value={formData["shipping_address.phone"]}
            onChange={handleChange}
            name="shipping_address.phone"
            placeholder="998991234567"
            type="tel"
            className="bg-secondary"
          />
          <span className="text-[10px] text-muted-foreground mt-1 self-end">
            {t("phoneHint")}
          </span>
        </FormField>

        {message && (
          <p className="text-sm text-destructive">{message}</p>
        )}
      </section>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        <Button variant="ghost" className="text-primary">
          <ArrowLeft className="size-4" />
          {t("return")}
        </Button>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {t("continue")}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </form>
  );
};

const FormField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col w-full gap-1.5">
    <span className="text-sm font-medium text-foreground">{label}</span>
    {children}
  </label>
);

export default Address;
