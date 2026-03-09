import { cn } from "@/lib/utils";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem;
  style?: "default" | "tight";
  currencyCode: string;
};

const LineItemUnitPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemUnitPriceProps) => {
  const total = item.total ?? 0;
  const original_total = item.original_total ?? 0;
  const hasReducedPrice = total < original_total;

  const percentage_diff = Math.round(
    ((original_total - total) / (original_total || 1)) * 100,
  );

  return (
    <div className="flex flex-col">
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-ui-fg-muted">Original: </span>
            )}
            <span className="line-through">
              {convertToLocale({
                amount: original_total / item.quantity,
                currency_code: currencyCode,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-ui-fg-interactive">-{percentage_diff}%</span>
          )}
        </>
      )}
      <span
        className={cn("text-base-regular", {
          "text-ui-fg-interactive": hasReducedPrice,
        })}
      >
        {convertToLocale({
          amount: total / item.quantity,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  );
};

export default LineItemUnitPrice;
