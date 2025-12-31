import { HttpTypes } from "@medusajs/types";
import CartItem from "../components/cart-item";
import { Summary } from "./summary";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
  cart?: HttpTypes.StoreCart | null;
};

export default function CartTemplate({ cart }: Props) {
  const t = useTranslations("Cart");
  return (
    <div className="flex flex-col min-h-screen flex-1">
      {!!cart?.items?.length ? (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* Left Column: Cart Items */}
          <section className="flex-1 flex flex-col gap-6">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </section>
          {/* Right Column: Order Summary */}
          <aside className="w-full lg:w-[380px] shrink-0">
            <Summary cart={cart} />
          </aside>
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
          <div className="size-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted mb-6">
            <ShoppingCart className="size-8" />
          </div>
          <h2 className="text-2xl font-bold text-text-main dark:text-white mb-2">
            {t("empty.title")}
          </h2>
          <p className="text-text-muted mb-8 max-w-sm">
            {t("empty.description")}
          </p>
          <Link href="/">
            <Button>{t("empty.startShopping")}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
