"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { FC, ChangeEvent } from "react";
import {
  SearchContainer,
  SearchLabel,
  SearchInputRoot,
  SearchIconContainer,
} from "./Search.styles";
import { useDebouncedCallback } from 'use-debounce';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchProps {
  placeholder: string;
  label?: string;
  id?: string;
}

const Search: FC<SearchProps> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
   
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  console.log("placeholder", searchParams);

  return (
    <SearchContainer>
      <SearchLabel htmlFor={"search"}>Search</SearchLabel>
      <SearchInputRoot
        id={"search"}
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleSearch(e.target.value);
        }}
      >
        <SearchIconContainer>
          <MagnifyingGlassIcon width="16" height="16" />
        </SearchIconContainer>
      </SearchInputRoot>
    </SearchContainer>
  );
};

export default Search;
