"use client";
import { FC, useId, useEffect, useState } from "react";
import React from "react";
import Select, {Props } from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "@/components/Form/SelectSingle/SelectSingle.styles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RADIX_THEME_APP_ID } from "@/config/client";

interface Option {
  value: string;
  label: string;
}

interface SearchSingleSelectProps extends Props {
  options: Option[];
  label?: string;
  paramName: string;
}

const SearchSingleSelect: FC<SearchSingleSelectProps> = ({
  label,
  paramName,
  options,

  ...rest
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const id = useId();
  const paramValue = searchParams.get(paramName);
  const optionValue = options.find((opt) => opt.value === paramValue);
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Get the main Radix theme container to use as portal target
    const themeContainer = document.getElementById(RADIX_THEME_APP_ID);
    setMenuPortalTarget(themeContainer);
  }, []);

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

  useEffect(() => {
    if(optionValue === undefined && paramValue !== null ) {
      const params = new URLSearchParams(searchParams);
      params.delete(paramName);
      replace(`${pathname}?${params.toString()}`);
    }
  }, [optionValue, paramName, paramValue, pathname, replace, searchParams]);

  return (
    <Box>
      {label && (
        <Text style={{ lineHeight: "2" }} htmlFor={rest.id} as="label" size="2">
          {label}
        </Text>
      )}

      <Select
        menuPortalTarget={menuPortalTarget}
        value={optionValue}
        name={`search-single-select-${paramName}`}
        instanceId={id}
        options={options}
        styles={styles}
        isClearable
        onChange={(option) => {
          handleSearch(option as Option);
        }}
      />
    </Box>
  );
};

export default SearchSingleSelect;
