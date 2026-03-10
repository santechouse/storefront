"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/data/customer";
import { EyeIcon, EyeOffIcon, Phone, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Link } from "@/i18n/navigation";

export default function LoginTemplate() {
  const t = useTranslations("Login");
  const [message, formAction, isPending] = React.useActionState(login, null);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex justify-center min-h-[calc(100vh-80px)] w-full">
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
              {t("description")}
            </p>
          </div>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("phone")}
              </label>
              <div className="relative">
                <Input
                  name="phone"
                  placeholder={t("phonePlaceholder")}
                  type="text"
                  className="bg-secondary pr-10"
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Phone className="size-4" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
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
            <div>
              {message && (
                <div className="mb-4 flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-lg animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="size-4 shrink-0" />
                  <p>{message}</p>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? t("signingIn") || "..." : t("signIn")}
              </Button>
            </div>
          </form>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background-light dark:bg-background-dark px-2 text-slate-500 dark:text-slate-400">
                  {t("continue")}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            <Link
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
              href="/account/register"
            >
              {t("createAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
