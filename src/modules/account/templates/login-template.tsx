"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/data/customer";
import { EyeIcon, Mail } from "lucide-react";
import React from "react";

export default function LoginTemplate() {
  const [message, formAction] = React.useActionState(login, null);
  return (
    <div className="flex justify-center min-h-[calc(100vh-80px)] w-full">
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Welcome Back
            </h1>
            <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
              Please enter your details to sign in to your account.
            </p>
          </div>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email or Username
              </label>
              <div className="relative">
                <Input
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  className="bg-secondary"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Mail className="size-4" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  className="bg-secondary"
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  type="button"
                >
                  <EyeIcon className="size-4" />
                </button>
              </div>
            </div>
            <div>
              {message && <p>{message}</p>}
              <Button type="submit" className="w-full">
                Sign in
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
                  Or continue with
                </span>
              </div>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            <a
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
              href="#"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
