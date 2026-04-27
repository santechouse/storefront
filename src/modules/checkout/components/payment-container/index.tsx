"use client";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import React, { JSX } from "react";

type PaymentContainerProps = {
  paymentProviderId: string;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>;
  children?: React.ReactNode;
};

export const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const selected = selectedPaymentOptionId === paymentProviderId;
  const info = paymentInfoMap[paymentProviderId];

  return (
    <div
      className={`relative flex items-center px-4 py-3.5 border rounded-xl cursor-pointer transition-colors ${
        selected
          ? "border-primary/40 bg-primary/5"
          : "border-border hover:bg-muted/60"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <RadioGroupItem
        id={paymentProviderId}
        checked={selected}
        value={paymentProviderId}
      />
      <Label
        htmlFor={paymentProviderId}
        className="flex flex-1 justify-between items-center ml-4 cursor-pointer"
      >
        <span className="text-sm font-medium text-foreground">
          {info?.title || paymentProviderId}
        </span>
        <span className="text-muted-foreground">{info?.icon}</span>
      </Label>
    </div>
  );
};
