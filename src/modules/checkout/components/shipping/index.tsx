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

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const t = useTranslations("Checkout.shipping");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [shippingMethodId, setShippingMethodId] = React.useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "delivery";

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup",
  );

  const handleSetShippingMethod = async (id: string) => {
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
      .finally(() => setIsLoading(false));
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Summary of previous steps */}
      <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
        <InfoRow label={t("contact")} value={cart.shipping_address?.phone} />
        <InfoRow label={t("shipTo")} value={cart.shipping_address?.address_1} />
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.033em]">
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <RadioGroup
        value={shippingMethodId || ""}
        onValueChange={(v) => v && handleSetShippingMethod(v)}
        className="flex flex-col gap-3"
      >
        {_shippingMethods?.map((option) => (
          <OptionCard
            key={option.id}
            id={option.id}
            selected={shippingMethodId === option.id}
            label={option.name}
            trailing={convertToLocale({
              amount: option.amount,
              currency_code: cart.currency_code,
            })}
          />
        ))}
      </RadioGroup>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        <Button
          onClick={() => router.push("?step=address")}
          variant="ghost"
          className="text-primary"
        >
          <ArrowLeft className="size-4" />
          {t("return")}
        </Button>
        <Button
          onClick={() => router.push("?step=payment")}
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          {t("continue")}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value?: string | null }) => (
  <div className="flex items-center justify-between px-4 py-3.5">
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground shrink-0 w-20">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground truncate">{value}</span>
    </div>
  </div>
);

const OptionCard = ({
  id,
  selected,
  label,
  trailing,
}: {
  id: string;
  selected: boolean;
  label: string;
  trailing: string;
}) => (
  <div
    className={`relative flex items-center px-4 py-3.5 border rounded-xl cursor-pointer transition-colors ${
      selected
        ? "border-primary/40 bg-primary/5"
        : "border-border hover:bg-muted/60"
    }`}
  >
    <RadioGroupItem id={id} value={id} checked={selected} />
    <Label
      htmlFor={id}
      className="flex flex-1 justify-between items-center ml-4 cursor-pointer"
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground tabular-nums">
        {trailing}
      </span>
    </Label>
  </div>
);

export default Shipping;
