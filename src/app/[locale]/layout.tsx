import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import Nav from "@/modules/layout/templates/nav";
import BottomNav from "@/modules/layout/templates/bottom-nav";
import Footer from "@/modules/layout/templates/footer";
import { retrieveCart } from "@/lib/data/cart";

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
): Promise<Metadata> {
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

  const cart = await retrieveCart();
  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <html className="h-full" lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-display transition-colors duration-300`}
      >
        <NextIntlClientProvider>
          <Nav cartCount={cartCount} />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main className="flex-1 flex flex-col justify-center lg:flex-row max-w-360 mx-auto w-full px-4 md:px-6 lg:px-8 py-6 gap-8">
              {children}
            </main>
          </ThemeProvider>
          <Footer />
          <BottomNav cartCount={cartCount} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
