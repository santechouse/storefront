import { HttpTypes } from "@medusajs/types";
import { cn } from "@lib/utils";
import { useTranslations } from "next-intl";

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption;
  current: string | undefined;
  updateOption: (title: string, value: string) => void;
  title: string;
  disabled: boolean;
  "data-testid"?: string;
};

export default function OptionSelect({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}: OptionSelectProps) {
  const t = useTranslations("Product");
  const filteredOptions = (option.values ?? []).map((v) => v.value);

  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {t("select")} {title}
      </span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => (
          <button
            key={v}
            onClick={() => updateOption(option.id, v)}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-[3rem] px-4 py-2 rounded-md text-sm font-medium border transition-colors",
              "disabled:opacity-50 disabled:pointer-events-none",
              v === current
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:border-primary/60 hover:bg-primary/5",
            )}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
