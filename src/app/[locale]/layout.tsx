import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider, useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import Nav from "@/modules/layout/templates/nav";
import BottomNav from "@/modules/layout/templates/bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">,
) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "LocaleLayout",
  });

  return {
    title: {
      default: t("title.default"),
      template: t("title.template"),
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased  font-display text-slate-900 dark:text-white transition-colors duration-300`}
      >
        <NextIntlClientProvider>
          <Nav />
          <ThemeProvider>{children}</ThemeProvider>
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
