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

interface StepPaymentProps {
  cart: HttpTypes.StoreCart;
  availablePaymentMethods: HttpTypes.StorePaymentProvider[];
}

const Payment: React.FC<StepPaymentProps> = ({
  cart,
  availablePaymentMethods,
}) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "payment";
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending",
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? "",
  );
  const router = useRouter();
  const pathname = usePathname();

  const setPaymentMethod = async (method: string) => {
    setError(null);
    setSelectedPaymentMethod(method);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const shouldInputCard = false && !activeSession;

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod;

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        });
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          },
        );
      }
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
      {/* Information Review Block */}
      {/*<div className="rounded-lg border border-[#e7ebf4] dark:border-gray-700 bg-white dark:bg-[#1a2233] divide-y divide-[#e7ebf4] dark:divide-gray-700 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium w-20">
              Contact
            </span>
            <span className="text-[#0d121c] dark:text-gray-200 text-sm font-medium truncate flex-1">
              {formData.email}
            </span>
          </div>
          <button
            onClick={() => onBack()}
            className="text-primary hover:text-blue-700 text-xs font-semibold px-2 py-1 rounded transition-colors"
          >
            Change
          </button>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium w-20">
              Ship to
            </span>
            <span className="text-[#0d121c] dark:text-gray-200 text-sm font-medium truncate flex-1">
              {formData.address}, {formData.city}, {formData.state}{" "}
              {formData.zipCode}
            </span>
          </div>
          <button
            onClick={() => onBack()}
            className="text-primary hover:text-blue-700 text-xs font-semibold px-2 py-1 rounded transition-colors"
          >
            Change
          </button>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium w-20">
              Method
            </span>
            <span className="text-[#0d121c] dark:text-gray-200 text-sm font-medium truncate flex-1">
              {selectedShipping?.name} —{" "}
              {selectedShipping?.price === 0
                ? "Free"
                : `$${selectedShipping?.price.toFixed(2)}`}
            </span>
          </div>
          <button
            onClick={onBack}
            className="text-primary hover:text-blue-700 text-xs font-semibold px-2 py-1 rounded transition-colors"
          >
            Change
          </button>
        </div>
      </div>*/}

      <div className="flex flex-col gap-2">
        <h2 className="text-[#0d121c] dark:text-white text-2xl font-bold leading-tight">
          Payment Method
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <RadioGroup
          value={selectedPaymentMethod}
          onValueChange={setSelectedPaymentMethod}
        >
          {availablePaymentMethods.map((payment) => {
            return (
              <PaymentContainer
                key={payment.id}
                paymentProviderId={payment.id}
                selectedPaymentOptionId={selectedPaymentMethod}
                paymentInfoMap={paymentInfoMap}
              />
            );
          })}
        </RadioGroup>
      </div>
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Button variant="ghost">
          <ArrowLeft />
          Return to shipping
        </Button>
        <Button onClick={handleSubmit} className="w-full sm:w-auto ">
          Review Order
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Payment;
