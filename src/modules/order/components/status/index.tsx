"use client";
import { FulfillmentStatus, HttpTypes } from "@medusajs/types";
import { CheckIcon, ClockIcon, TruckIcon, PackageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  order: HttpTypes.StoreOrder;
}

const STAGES: {
  id: FulfillmentStatus;
  labelKey: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "not_fulfilled",
    labelKey: "not_fulfilled",
    icon: <PackageIcon className="size-3.5" />,
  },
  {
    id: "fulfilled",
    labelKey: "fulfilled",
    icon: <ClockIcon className="size-3.5" />,
  },
  {
    id: "shipped",
    labelKey: "shipped",
    icon: <TruckIcon className="size-3.5" />,
  },
  {
    id: "delivered",
    labelKey: "delivered",
    icon: <CheckIcon className="size-3.5" />,
  },
];

const Status: React.FC<Props> = ({ order }) => {
  const t = useTranslations("Order");
  const currentIndex = Math.max(
    0,
    STAGES.findIndex((s) => s.id === order.fulfillment_status),
  );

  return (
    <div className="rounded-2xl border border-border bg-background px-5 py-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t("status")}
        </span>
        <span className="text-xs font-medium text-primary">
          {t(`statuses.${STAGES[currentIndex].id}`)}
        </span>
      </div>

      {/* Progress track */}
      <div className="relative">
        {/* Track line */}
        <div className="absolute top-3.5 left-3.5 right-3.5 h-px bg-border" />
        <div
          className="absolute top-3.5 left-3.5 h-px bg-primary transition-all duration-500"
          style={{
            width:
              currentIndex === 0
                ? "0%"
                : `${(currentIndex / (STAGES.length - 1)) * 100}%`,
          }}
        />

        {/* Stage dots */}
        <div className="relative flex justify-between">
          {STAGES.map((stage, i) => {
            const isDone = i <= currentIndex;
            const isCurrent = i === currentIndex;
            return (
              <div key={stage.id} className="flex flex-col items-center gap-2">
                <div
                  className={`size-7 rounded-full border flex items-center justify-center transition-colors ${
                    isDone
                      ? "bg-primary border-primary text-white"
                      : "bg-background border-border text-muted-foreground"
                  } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                >
                  {stage.icon}
                </div>
                <span
                  className={`text-[10px] font-medium text-center max-w-14 leading-tight ${
                    isDone ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t(`statuses.${stage.id}`)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Status;
