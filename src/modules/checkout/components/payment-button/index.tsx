"use client";
import { Button } from "@/components/ui/button";
import { isManual } from "@/lib/constants";
import { placeOrder } from "@/lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";
import { useState } from "react";

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ cart }) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    (cart.shipping_methods?.length ?? 0) < 1;

  const paymentSession = cart.payment_collection?.payment_sessions?.[0];

  switch (true) {
    case isManual(paymentSession?.provider_id):
      return <ManualTestPaymentButton notReady={notReady} />;
    default:
      return <Button disabled>Select a payment method</Button>;
  }
};

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const t = useTranslations("Checkout.review");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handlePayment = () => {
    setSubmitting(true);

    onPaymentCompleted();
  };

  return (
    <>
      <Button
        disabled={notReady}
        onClick={handlePayment}
        data-testid="submit-order-button"
      >
        {t("placeOrder")}
      </Button>
    </>
  );
};

export default PaymentButton;
