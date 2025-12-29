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
  children,
}) => {
  return (
    <div
      className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 group`}
    >
      <RadioGroupItem
        id={paymentProviderId}
        checked={selectedPaymentOptionId === paymentProviderId}
        value={paymentProviderId}
      />
      <Label
        id={paymentProviderId}
        htmlFor={paymentProviderId}
        className="flex flex-1 justify-between items-center ml-4"
      >
        <div className="flex flex-col">
          <span className="text-[#0d121c] dark:text-white font-semibold text-sm">
            {paymentInfoMap[paymentProviderId].title || paymentProviderId}
          </span>
        </div>
        <span className="font-bold text-[#0d121c] dark:text-white">
          {paymentInfoMap[paymentProviderId].icon}
        </span>
      </Label>
    </div>
  );
};
