"use client";
import { HttpTypes } from "@medusajs/types";
import { useSearchParams } from "next/navigation";
import React from "react";
import PaymentButton from "../payment-button";
import { useTranslations } from "next-intl";

interface StepReviewProps {
  cart: HttpTypes.StoreCart;
}

const Review: React.FC<StepReviewProps> = ({ cart }) => {
  const t = useTranslations("Checkout.review");
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "review";
  if (!isOpen) return;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#0d121c] dark:text-white mb-2">
          {t("title")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{t("description")}</p>
      </div>
      <PaymentButton cart={cart} />
    </div>
  );
};

export default Review;
