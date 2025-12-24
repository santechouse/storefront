import { HttpTypes } from "@medusajs/types";
import React from "react";
import { cn } from "@lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption;
  current: string | undefined;
  updateOption: (title: string, value: string) => void;
  title: string;
  disabled: boolean;
  "data-testid"?: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const t = useTranslations("Product");
  const filteredOptions = (option.values ?? []).map((v) => v.value);

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">
        {t("select")} {title}
      </span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <Button
              onClick={() => updateOption(option.id, v)}
              key={v}
              variant={v === current ? "default" : "outline"}
              className="flex-1"
              disabled={disabled}
            >
              {v}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
