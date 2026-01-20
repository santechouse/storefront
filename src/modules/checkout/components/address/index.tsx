"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAddresses } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { ArrowLeft, ArrowRight, HomeIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import SelectCountry from "./select-country";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useTranslations } from "next-intl";
import { count } from "console";

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const countryOptions = React.useMemo(() => {
    if (!cart.region) {
      return [];
    }

    return cart.region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.iso_2 ? tCountries(country.iso_2) : country.display_name,
    }));
  }, [cart]);

  if (!isOpen) {
    return null;
  }

  return (
    <form action={formAction} className="flex-1 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0d121c] dark:text-white text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
          {t("title")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          {t("description")}
        </p>
      </div>
      {/*<section className="flex flex-col gap-5">
        <h3 className="text-lg font-bold text-[#0d121c] dark:text-white">
          Contact Information
        </h3>
        <label className="flex flex-col w-full">
          <span className="text-[#0d121c] dark:text-gray-300 text-sm font-medium pb-2">
            Email address
          </span>
          <Input
            name="email"
            onChange={handleChange}
            className="bg-secondary"
            placeholder="you@example.com"
            type="email"
          />
        </label>
        <div className="flex items-center gap-3">
          <input
            defaultChecked
            className="rounded border-gray-300 text-primary focus:ring-primary"
            id="newsletter"
            type="checkbox"
          />
          <label
            className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            htmlFor="newsletter"
          >
            Email me with news and offers
          </label>
        </div>
      </section>*/}
      <hr className="border-gray-200 dark:border-gray-800 my-2" />
      <section className="flex flex-col gap-6">
        <h3 className="text-lg font-bold text-[#0d121c] dark:text-white">
          {t("details")}
        </h3>
        {/*<div className="p-4 border border-primary/30 rounded-lg bg-blue-50/30 dark:bg-primary/5 flex items-center gap-3 cursor-pointer ring-1 ring-primary/20">
          <HomeIcon className="size-4" />
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-sm font-bold text-[#0d121c] dark:text-white">
                Home
              </p>
              <span className="text-xs text-primary font-bold">Default</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              John Doe, 123 Maple Street, Springfield, IL 62704
            </p>
          </div>
        </div>*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="flex flex-col w-full">
            <span className="text-[#0d121c] dark:text-gray-300 text-sm font-medium pb-2">
              {t("firstName")}
            </span>
            <Input
              value={formData["shipping_address.first_name"]}
              onChange={handleChange}
              name="shipping_address.first_name"
              className="bg-secondary"
              type="text"
            />
          </label>
          <label className="flex flex-col w-full">
            <span className="text-[#0d121c] dark:text-gray-300 text-sm font-medium pb-2">
              {t("lastName")}
            </span>
            <Input
              value={formData["shipping_address.last_name"]}
              onChange={handleChange}
              name="shipping_address.last_name"
              className="bg-secondary"
              type="text"
            />
          </label>
        </div>
        <label className="flex flex-col">
          <span className="text-[#0d121c] dark:text-gray-300 text-sm font-medium pb-2">
            {t("country")}
          </span>
          <NativeSelect
            name="shipping_address.country_code"
            value={formData["shipping_address.country_code"]}
            onChange={handleChange}
            className="w-full min-w-full flex flex-1 grow"
            required
          >
            {countryOptions?.map(({ value, label }, index) => (
              <NativeSelectOption key={index} value={value}>
                {label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </label>
        <label className="flex flex-col w-full">
          <span className="text-[#0d121c] dark:text-gray-300 text-sm font-medium pb-2">
            {t("address")}
          </span>
          <Input
            value={formData["shipping_address.address_1"]}
            onChange={handleChange}
            name="shipping_address.address_1"
            className="bg-secondary"
            type="text"
          />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-5">
          <label className="flex flex-col w-full">
            <span className="text-[#0d121c] dark:text-gray-300 text-sm font-medium pb-2">
              {t("city")}
            </span>
            <Input
              value={formData["shipping_address.city"]}
              onChange={handleChange}
              name="shipping_address.city"
              className="bg-secondary"
              type="text"
            />
          </label>
          <label className="flex flex-col w-full">
            <span className="text-[#0d121c] dark:text-gray-300 text-sm font-medium pb-2">
              {t("state")}
            </span>
            <Input
              value={formData["shipping_address.province"]}
              onChange={handleChange}
              name="shipping_address.province"
              className="bg-secondary"
              type="text"
            />
          </label>
        </div>
        <label className="flex flex-col w-full">
          <span className="text-[#0d121c] dark:text-gray-300 text-sm font-medium pb-2">
            {t("phone")}
          </span>
          <div className="relative">
            <Input
              value={formData["shipping_address.phone"]}
              onChange={handleChange}
              name="shipping_address.phone"
              placeholder="998991234567"
              type="tel"
              className="bg-secondary"
            />
          </div>
          <span className="text-[10px] text-gray-400 mt-1 self-end">
            {t("phoneHint")}
          </span>
        </label>
        {message && <p>{message}</p>}
      </section>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Button variant="ghost" className="text-primary">
          <ArrowLeft />
          {t("return")}
        </Button>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {t("continue")}
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
};

export default Address;
