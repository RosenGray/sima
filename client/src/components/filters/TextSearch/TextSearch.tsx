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
  extends TextField.RootProps,
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
  placeholder?: string;
  type?: "number" | "text";
  label?: string;
  defaultValue?: string | number;
}

const TextSearch: FC<TextSearchProps> = ({
  name,
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
