"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "@/i18n/navigation";
import { setShippingMethod } from "@/lib/data/cart";
import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

type ShippingProps = {
  cart: HttpTypes.StoreCart;
  availableShippingMethods:
    | HttpTypes.StoreCartShippingOptionWithServiceZone[]
    | null;
};

const PICKUP_OPTION_ON = "__PICKUP_ON";
const PICKUP_OPTION_OFF = "__PICKUP_OFF";

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const t = useTranslations("Checkout.shipping");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingPrices, setIsLoadingPrices] = React.useState(true);
  const router = useRouter();

  const [showPickupOptions, setShowPickupOptions] =
    React.useState<string>(PICKUP_OPTION_OFF);
  const [calculatedPricesMap, setCalculatedPricesMap] = React.useState<
    Record<string, number>
  >({});
  const [error, setError] = React.useState<string | null>(null);
  const [shippingMethodId, setShippingMethodId] = React.useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null,
  );
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "delivery";
  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup",
  );

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup",
  );
  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup",
  ) => {
    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON);
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF);
    }

    let currentId: string | null = null;
    setIsLoading(true);
    setShippingMethodId((prev) => {
      currentId = prev;
      return id;
    });

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId);

        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Information Review Block */}
      <div className=" rounded-lg border border-[#e7ebf4] dark:border-gray-700 bg-white dark:bg-[#1a2233] divide-y divide-[#e7ebf4] dark:divide-gray-700 overflow-hidden shadow-sm">
        <div className=" flex items-center justify-between p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium w-16">
              {t("contact")}
            </span>
            <span className="text-[#0d121c] dark:text-gray-200 text-sm font-medium truncate flex-1">
              {cart.shipping_address?.phone}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-primary text-xs font-semibold px-2 py-1 rounded transition-colors"
          >
            {t("change")}
          </Button>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {t("shipTo")}
            </span>
            <span className="text-[#0d121c] dark:text-gray-200 text-sm font-medium truncate flex-1">
              {cart.shipping_address?.address_1}
            </span>
          </div>
          <Button
            variant="ghost"
            className="text-primary text-xs font-semibold px-2 py-1 rounded transition-colors"
          >
            {t("change")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-[#0d121c] dark:text-white text-2xl font-bold leading-tight">
          {t("title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <RadioGroup
          value={shippingMethodId || ""}
          onValueChange={(v) => {
            if (v) return handleSetShippingMethod(v, "shipping");
          }}
        >
          {_shippingMethods?.map((option) => {
            const isDisabled = false;
            return (
              <div
                key={option.id}
                className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 group`}
              >
                <RadioGroupItem
                  id={option.id}
                  checked={shippingMethodId === option.id}
                  value={option.id}
                />
                <Label
                  id={option.id}
                  htmlFor={option.id}
                  className="flex flex-1 justify-between items-center ml-4"
                >
                  <div className="flex flex-col">
                    <span className="text-[#0d121c] dark:text-white font-semibold text-sm">
                      {option.name}
                    </span>
                  </div>
                  <span className="font-bold text-[#0d121c] dark:text-white">
                    {convertToLocale({
                      amount: option.amount,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        {/*{_shippingMethods?.map((method) => (
          <label
            key={method.id}
            className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 group`}
          >
            <input
              type="radio"
              name="shipping_method"
              className="peer h-5 w-5 text-primary border-gray-300 focus:ring-primary dark:bg-gray-700"
            />
            <div className="flex flex-1 justify-between items-center ml-4">
              <div className="flex flex-col">
                <span className="text-[#0d121c] dark:text-white font-semibold text-sm">
                  {method.name}
                </span>
              </div>
              <span className="font-bold text-[#0d121c] dark:text-white">
                {convertToLocale({
                  amount: method.amount,
                  currency_code: cart.currency_code,
                })}
              </span>
            </div>
          </label>
        ))}*/}
      </div>
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Button
          onClick={() => router.push("?step=address")}
          variant="ghost"
          className="text-primary"
        >
          <ArrowLeft />
          {t("return")}
        </Button>
        <Button
          onClick={() => router.push(`?step=payment`)}
          className="w-full sm:w-auto"
        >
          {t("continue")}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Shipping;
