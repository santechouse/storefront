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
  if (!isOpen) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.033em]">
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>
      <PaymentButton cart={cart} />
    </div>
  );
};

export default Review;
