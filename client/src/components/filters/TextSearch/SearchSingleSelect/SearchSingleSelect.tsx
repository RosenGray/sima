"use client";
import { FC, useId } from "react";
import React from "react";
import Select, { GroupBase, Props, SelectInstance } from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "@/components/Form/SelectSingle/SelectSingle.styles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRef } from "react";
import StateManagedSelect from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SearchSingleSelectProps extends Props {
  options: Option[];
  label?: string;
  paramName: string;
  dependencyParams?: string[];
}

const SearchSingleSelect: FC<SearchSingleSelectProps> = ({
  label,
  paramName,
  options,
  dependencyParams,
  ...rest
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const id = useId();
  const paramValue = searchParams.get(paramName);
  const previousParamValue = useRef(paramValue);
  const selectInputRef = useRef<SelectInstance<
    unknown,
    boolean,
    GroupBase<unknown>
  > | null>(null);

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
  const handleClear = () => {
    if (selectInputRef.current) {
      selectInputRef.current.clearValue();
    }
  };

  console.log(
    paramName,
    options.find((opt) => opt.value === paramValue)
  );



  useEffect(() => {
    if (
      dependencyParams &&
      dependencyParams.length > 0 &&
      previousParamValue.current !== paramValue
    ) {
      previousParamValue.current = paramValue;
      const params = new URLSearchParams(searchParams);
      dependencyParams.forEach((param) => {
        params.delete(param);
      });
      replace(`${pathname}?${params.toString()}`);
    }
  }, [
    dependencyParams,
    paramName,
    paramValue,
    pathname,
    replace,
    searchParams,
  ]);
  return (
    <Box>
      {label && (
        <Text style={{ lineHeight: "2" }} htmlFor={rest.id} as="label" size="2">
          {label}
        </Text>
      )}

      <Select
        ref={selectInputRef}
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : null
        }
        value={options.find((opt) => opt.value === paramValue)}
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
