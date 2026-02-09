"use client";
import { TextField } from "@radix-ui/themes";
import { FC, useId, useState, useCallback, useEffect } from "react";
import {
  SearchContainer,
  SearchLabel,
  SearchInputSlot,
} from "./PriceTextSearch.styles";
import { formatNumberWithCommas } from "@/utils/common";

interface PriceTextSearchProps
  extends Omit<TextField.RootProps, "onChange">,
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
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: never; // Prevent type from being passed
}

const PriceTextSearch: FC<PriceTextSearchProps> = ({
  name,
  onChange,
  placeholder,
  label,
  value,
  ...inputProps
}) => {
  const id = useId();
  const initialValue = value ? formatNumberWithCommas(value.toString()) : "";

  const [_value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (value === "") {
      setValue("");
    }
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const formatted = formatNumberWithCommas(inputValue);
      setValue(formatted);
      onChange(formatted);
    },
    [onChange]
  );

  return (
    <SearchContainer>
      {label && <SearchLabel htmlFor={id}>{label}</SearchLabel>}
      <TextField.Root
        {...inputProps}
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={_value}
        onChange={handleChange}
        pattern="[\d,]*"
        inputMode="numeric"
        size="3"
      >
        <SearchInputSlot>₪</SearchInputSlot>
      </TextField.Root>
    </SearchContainer>
  );
};

export default PriceTextSearch;
