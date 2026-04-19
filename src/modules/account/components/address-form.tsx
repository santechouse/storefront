"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { addCustomerAddress, updateCustomerAddress } from "@/lib/data/customer";
import { HttpTypes } from "@medusajs/types";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

const initialState = {
  success: false,
  error: null as string | null,
};

interface AddressFormProps {
  address?: HttpTypes.StoreCustomerAddress;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddressForm({
  address,
  onSuccess,
  onCancel,
}: AddressFormProps) {
  const t = useTranslations("Account.addresses");
  const tCountries = useTranslations("Countries");
  const isEditing = Boolean(address);
  const [state, formAction, isPending] = React.useActionState(
    isEditing ? updateCustomerAddress : addCustomerAddress,
    initialState,
  );
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state?.success) {
      if (isEditing) {
        onSuccess?.();
      } else {
        formRef.current?.reset();
        onSuccess?.();
      }
    }
  }, [isEditing, onSuccess, state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      {isEditing && (
        <input type="hidden" name="addressId" value={address?.id} />
      )}

      {/* Name + contact */}
      <div className="grid grid-cols-1 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {t("fields.firstName")}
          </span>
          <Input
            name="first_name"
            placeholder={t("placeholders.firstName")}
            defaultValue={address?.first_name ?? ""}
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {t("fields.lastName")}
          </span>
          <Input
            name="last_name"
            placeholder={t("placeholders.lastName")}
            defaultValue={address?.last_name ?? ""}
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {t("fields.phone")}
          </span>
          <Input
            name="phone"
            type="tel"
            placeholder={t("placeholders.phone")}
            defaultValue={address?.phone ?? ""}
            required
          />
        </label>
      </div>

      {/* Address lines */}
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {t("fields.address1")}
          </span>
          <Input
            name="address_1"
            placeholder={t("placeholders.address1")}
            defaultValue={address?.address_1 ?? ""}
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {t("fields.address2")}
          </span>
          <Input
            name="address_2"
            placeholder={t("placeholders.address2")}
            defaultValue={address?.address_2 ?? ""}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {t("fields.city")}
          </span>
          <Input
            name="city"
            placeholder={t("placeholders.city")}
            defaultValue={address?.city ?? ""}
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            {t("fields.province")}
          </span>
          <Input
            name="province"
            placeholder={t("placeholders.province")}
            defaultValue={address?.province ?? ""}
          />
        </label>
      </div>

      {/* Default flags */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            name="is_default_shipping"
            type="checkbox"
            className="mt-0.5 size-4 rounded border-border accent-primary"
            defaultChecked={address?.is_default_shipping ?? false}
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium leading-none">
              {t("fields.defaultShipping")}
            </span>
            <span className="text-xs text-muted-foreground">
              {t("defaultShippingHint")}
            </span>
          </div>
        </label>
      </div>

      {/* Feedback */}
      {state?.error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <p>{state.error}</p>
        </div>
      )}
      {state?.success && !state?.error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <p>{t("successMessage")}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            {t("cancelEdit")}
          </Button>
        )}
        <Button type="submit" disabled={isPending} className="flex-1">
          {isPending
            ? t("submitting")
            : isEditing
              ? t("saveChanges")
              : t("submit")}
        </Button>
      </div>
    </form>
  );
}
