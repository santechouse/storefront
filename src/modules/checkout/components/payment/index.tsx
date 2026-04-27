"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { usePathname, useRouter } from "@/i18n/navigation";
import { initiatePaymentSession } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { PaymentContainer } from "../payment-container";
import { paymentInfoMap } from "@/lib/constants";
import { useTranslations } from "next-intl";

interface StepPaymentProps {
  cart: HttpTypes.StoreCart;
  availablePaymentMethods: HttpTypes.StorePaymentProvider[];
}

const Payment: React.FC<StepPaymentProps> = ({
  cart,
  availablePaymentMethods,
}) => {
  const t = useTranslations("Checkout.payment");
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "payment";
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending",
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? "",
  );
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod;
      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        });
      }
      router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.033em]">
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <RadioGroup
        value={selectedPaymentMethod}
        onValueChange={setSelectedPaymentMethod}
        className="flex flex-col gap-3"
      >
        {availablePaymentMethods.map((payment) => (
          <PaymentContainer
            key={payment.id}
            paymentProviderId={payment.id}
            selectedPaymentOptionId={selectedPaymentMethod}
            paymentInfoMap={paymentInfoMap}
          />
        ))}
      </RadioGroup>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
        <Button
          onClick={() => router.push("?step=delivery")}
          variant="ghost"
          className="text-primary"
        >
          <ArrowLeft className="size-4" />
          {t("return")}
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto"
          disabled={isLoading || !selectedPaymentMethod}
        >
          {t("continue")}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Payment;
