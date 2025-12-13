"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { FC, useId } from "react";
import {
  SearchContainer,
  SearchLabel,
  SearchInputRoot,
  SearchInputSlot,
} from "./TextSearch.styles";

interface TextSearchProps
  extends Omit<TextField.RootProps, "onChange">,
    Omit<
      React.ComponentPropsWithoutRef<"input">,
      | "name"
      | "type"
      | "placeholder"
      | "defaultValue"
      | "color"
      | "size"
      | keyof TextField.RootProps
    > {
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "number" | "text";
  label?: string;
  defaultValue?: string | number;
}

const TextSearch: FC<TextSearchProps> = ({
  name,
  onChange,
  placeholder,
  label,
  type = "text",
  defaultValue,
  ...inputProps
}) => {
  const id = useId();

  return (
    <SearchContainer>
      {label && <SearchLabel htmlFor={id}>{label}</SearchLabel>}
      <SearchInputRoot
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        {...inputProps}
      >
        <SearchInputSlot>
          <MagnifyingGlassIcon width="16" height="16" />
        </SearchInputSlot>
      </SearchInputRoot>
    </SearchContainer>
  );
};

export default TextSearch;
