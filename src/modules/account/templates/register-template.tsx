"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { signup } from "@/lib/data/customer";
import { EyeIcon, EyeOffIcon, AlertCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useMaskInput } from "use-mask-input";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterTemplate() {
  const t = useTranslations("Register");
  const [message, formAction, isPending] = React.useActionState(signup, null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [phoneMasked, setPhoneMasked] = React.useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = React.useState(false);
  const phoneRef = useMaskInput({ mask: "99 999 99 99" });

  return (
    <div className="flex justify-center min-h-[calc(100vh-80px)] w-full">
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-[-0.033em] text-foreground sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t("phone")}
              </label>
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-secondary text-muted-foreground text-sm">
                  +998
                </span>
                <Input
                  ref={phoneRef}
                  placeholder="99 999 99 99"
                  type="text"
                  className="bg-secondary rounded-l-none pr-10"
                  value={phoneMasked}
                  onChange={(e) => setPhoneMasked(e.target.value)}
                />
                <input type="hidden" name="phone" value={`998${phoneMasked.replace(/\s/g, "")}`} />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground">
                  <Phone className="size-4" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t("firstName")}
              </label>
              <Input name="first_name" type="text" className="bg-secondary" required />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t("lastName")}
              </label>
              <Input name="last_name" type="text" className="bg-secondary" required />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t("password")}
              </label>
              <div className="relative">
                <Input
                  name="password"
                  placeholder={t("passwordPlaceholder")}
                  type={showPassword ? "text" : "password"}
                  className="bg-secondary pr-10"
                  required
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="privacy"
                checked={agreedToPrivacy}
                onCheckedChange={(v) => setAgreedToPrivacy(!!v)}
                className="mt-0.5 shrink-0"
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground leading-snug cursor-pointer select-none">
                {t("privacyAgreementPrefix")}{" "}
                <Link href="/privacy" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                  {t("privacyPolicyLink")}
                </Link>
                {" "}{t("privacyAgreementSuffix")}
              </label>
            </div>

            <div>
              {message && (
                <div className="mb-4 flex items-center gap-2 p-3 text-sm text-rose-500 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/40 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="size-4 shrink-0" />
                  <p>{message}</p>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isPending || !agreedToPrivacy}>
                {isPending ? t("signingIn") || "..." : t("createAccount")}
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-3 text-muted-foreground">
                  {t("continue")}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
              href="/account/login"
            >
              {t("signIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
