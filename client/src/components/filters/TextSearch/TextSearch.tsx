"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { FC, ChangeEvent, useId } from "react";
import {
  SearchContainer,
  SearchLabel,
  SearchInputRoot,
  SearchInputSlot,
} from "./TextSearch.styles";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface TextSearchProps {
  paramName: string;
  placeholder: string;
  label?: string;

}

const TextSearch: FC<TextSearchProps> = ({ placeholder, label, paramName }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const id = useId();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set(paramName, term);
    } else {
      params.delete(paramName);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <SearchContainer>
     {label && <SearchLabel htmlFor={id}>{label}</SearchLabel>}
      <SearchInputRoot
        id={id}
        placeholder={placeholder}
        defaultValue={searchParams.get(paramName)?.toString()}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleSearch(e.target.value);
        }}
      >
        <SearchInputSlot>
          <MagnifyingGlassIcon width="16" height="16" />
        </SearchInputSlot>
      </SearchInputRoot>
    </SearchContainer>
  );
};

export default TextSearch;
