"use client";
import { FC, useId, useState, useEffect } from "react";
import React from "react";
import Select, {Props } from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "@/components/Form/SelectSingle/SelectSingle.styles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { breakpoints } from "@/globals";
import { useRef } from "react";

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
  const [isMobile, setIsMobile] = useState(false);
  const optionValue = options.find((opt) => opt.value === paramValue);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoints.sm);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
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
        menuPortalTarget={
          !isMobile && typeof document !== "undefined" ? document.body : null
        }
    
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
