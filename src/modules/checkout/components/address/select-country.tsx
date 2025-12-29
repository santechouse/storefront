import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { HttpTypes } from "@medusajs/types";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const SelectCountry = forwardRef<
  HTMLSelectElement,
  { region?: HttpTypes.StoreRegion; defaultValue?: string }
>(({ region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current,
  );

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }));
  }, [region]);

  return (
    <NativeSelect ref={innerRef} defaultValue={defaultValue} {...props}>
      {countryOptions?.map(({ value, label }, index) => (
        <NativeSelectOption key={index} value={value}>
          {label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
});

SelectCountry.displayName = "CountrySelect";

export default SelectCountry;
