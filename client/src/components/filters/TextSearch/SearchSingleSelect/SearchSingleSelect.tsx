"use client";
import { FC, useId } from "react";
import React from "react";
import Select, { Props } from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "@/components/Form/SelectSingle/SelectSingle.styles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Option {
  value: string;
  label: string;
}

interface SearchSingleSelectProps extends Props {
  options: Option[];
  defaultValue?: Option;
  label?: string;
  paramName: string;
}

const SearchSingleSelect: FC<SearchSingleSelectProps> = ({
  label,
  paramName,
  options,
  defaultValue,
  ...rest
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const id = useId();

  const handleSearch = (option: Option) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (option) {
      params.set(paramName, option.value);
    } else {
      params.delete(paramName);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Box>
      {label && (
        <Text style={{ lineHeight: "2" }} htmlFor={rest.id} as="label" size="2">
          {label}
        </Text>
      )}

      <Select
        defaultValue={defaultValue}
        name={`search-single-select-${paramName}`}
        instanceId={id}
        options={options}
        styles={styles}
        onChange={(option) => {
          handleSearch(option as Option);
        }}
      />
    </Box>
  );
};

export default SearchSingleSelect;
