"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { FC, useId } from "react";
import {
  SearchContainer,
  SearchLabel,
  SearchInputRoot,
  SearchInputSlot,
} from "./TextSearch.styles";

interface TextSearchProps {
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
      >
        <SearchInputSlot>
          <MagnifyingGlassIcon width="16" height="16" />
        </SearchInputSlot>
      </SearchInputRoot>
    </SearchContainer>
  );
};

export default TextSearch;
