"use client";
import { TextField } from "@radix-ui/themes";
import { FC, useId, useState, useCallback } from "react";
import {
  SearchContainer,
  SearchLabel,
  SearchInputRoot,
  SearchInputSlot,
} from "./PriceTextSearch.styles";
import { formatNumberWithCommas } from "@/utils/common";

interface PriceTextSearchProps
  extends TextField.RootProps,
    Omit<
      React.ComponentPropsWithoutRef<"input">,
      | "name"
      | "type"
      | "placeholder"
      | "defaultValue"
      | "value"
      | "onChange"
      | "color"
      | "size"
      | keyof TextField.RootProps
    > {
  name: string;
  placeholder?: string;
  label?: string;
  type?: never; // Prevent type from being passed
}

const PriceTextSearch: FC<PriceTextSearchProps> = ({
  name,
  placeholder,
  label,
  defaultValue,
  ...inputProps
}) => {
  const id = useId();
  const initialValue = defaultValue
    ? formatNumberWithCommas(defaultValue.toString())
    : "";

  const [value, setValue] = useState<string | undefined>(initialValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatNumberWithCommas(inputValue);
    setValue(formatted);
  }, []);

  return (
    <SearchContainer>
      {label && <SearchLabel htmlFor={id}>{label}</SearchLabel>}
      <SearchInputRoot
        {...inputProps}
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        pattern="[\d,]*"
        inputMode="numeric"
      >
        <SearchInputSlot>₪</SearchInputSlot>
      </SearchInputRoot>
    </SearchContainer>
  );
};

export default PriceTextSearch;
