"use client";
import { FC, useId, useEffect, useState } from "react";
import React from "react";
import { Option, CustomSelectProps, SearchMultiSelectProps } from "./types";
import Select, { StylesConfig, GroupBase, MultiValue } from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "./SearchMultiSelect.styles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RADIX_THEME_APP_ID } from "@/config/client";
import OptionWithCheckbox from "./OptionWithCheckbox";
import ValueContainer from "./ValueContainer";
import CustomMenu from "./CustomMenu";

const SearchMultiSelect: FC<SearchMultiSelectProps> = ({
  label,
  paramName,
  options,
  displayName,
  maxSelectedOptions,
  ...rest
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const id = useId();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const paramValues = searchParams.getAll(paramName); // Get ALL values, not just first
  const paramSelectionOptions = options.filter((opt) =>
    paramValues.includes(opt.value)
  );
  const [selectedOptions, setSelectedOptions] = useState<
  MultiValue<Option>
>(paramSelectionOptions);
  const selectedCount = selectedOptions.length;

  const [menuPortalTarget, setMenuPortalTarget] = useState<
    HTMLElement | null | undefined
  >(undefined);


  useEffect(() => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;

    // On desktop, use the main Radix theme container to use as portal target for proper z-index
    // On mobile, don't use portal (render inline) to avoid touch event issues
    if (!isMobile) {
      const themeContainer = document.getElementById(RADIX_THEME_APP_ID);
      setMenuPortalTarget(themeContainer);
    } else {
      setMenuPortalTarget(undefined);
    }
  }, []);

  const handleSearch = (options: MultiValue<Option>) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    // Limit selection to maxSelectedOptions if specified
    let optionsToSet = options;
    if (
      maxSelectedOptions !== undefined &&
      options &&
      options.length > maxSelectedOptions
    ) {
      optionsToSet = options.slice(0, maxSelectedOptions);
    }

    if (optionsToSet && optionsToSet.length > 0) {
      params.delete(paramName);
      optionsToSet.forEach((opt) => {
        params.append(paramName, opt.value);
      });
    } else {
      params.delete(paramName);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleChange = (options: MultiValue<Option>) => {
    let optionsToSet = options;
    if (
      maxSelectedOptions !== undefined &&
      options &&
      options.length > maxSelectedOptions
    ) {
      optionsToSet = options.slice(0, maxSelectedOptions);
    }
    setSelectedOptions(optionsToSet);
  };


  // Disable options when maxSelectedOptions is reached (except already selected ones)
  const isOptionDisabled = (option: Option): boolean => {
    if (maxSelectedOptions === undefined) {
      return false;
    }
    // Don't disable already selected options (so they can be deselected)
    if (selectedOptions.some((opt) => opt.value === option.value)) {
      return false;
    }
    // Disable all other options when max is reached
    return selectedCount >= maxSelectedOptions;
  };

  return (
    <Box>
      {label && (
        <Text style={{ lineHeight: "2" }} htmlFor={rest.id} as="label" size="2">
          {label}
        </Text>
      )}

      <Select<Option, true>
        {...rest}
        {...(menuPortalTarget !== undefined && { menuPortalTarget })}
        value={selectedOptions}
        name={`search-single-select-${paramName}`}
        instanceId={id}
        options={options}
        styles={styles as StylesConfig<Option, true, GroupBase<Option>>}
        isMulti

        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        // onMenuClose={setMenuIsOpen}
        // react-select calls this function for each option and passes the result
        // as `isDisabled` prop to the custom Option component (OptionWithCheckbox)
        isOptionDisabled={isOptionDisabled}
        {...({
          displayName,
          maxSelectedOptions,
          paramSelectionOptions,
          customMenuCloseHandler: () => setMenuIsOpen(false),
          customMenuCheckHandler: handleSearch,
        } as Partial<CustomSelectProps>)}

        components={{
          Option: OptionWithCheckbox,
          ValueContainer: ValueContainer,
          Menu: CustomMenu,
        }}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SearchMultiSelect;
