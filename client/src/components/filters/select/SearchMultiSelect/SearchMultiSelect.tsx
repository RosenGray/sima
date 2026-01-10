"use client";
import { FC, useId, useEffect, useState, useCallback, useRef } from "react";
import React from "react";
import { Option, CustomSelectProps, SearchMultiSelectProps } from "../types";
import Select, { StylesConfig, GroupBase, MultiValue } from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "../select.styles";
import { useSearchParams } from "next/navigation";
import OptionWithCheckbox from "./OptionWithCheckbox";
import ValueContainer from "./ValueContainer";
import CustomMenu from "./CustomMenu";
import { usePortalTarget } from "@/providers/PortalProvider/PortalProvider";
import { useDropdownCoordination } from "@/components/filters/FiltersContext";

const SearchMultiSelect: FC<SearchMultiSelectProps> = ({
  label,
  paramName,
  options,
  displayName,
  maxSelectedOptions,
  selectedOptions,
  setAllSelectedFilterOptions,
  isPortalTarget = false,
  menuPosition,
  isDisabled,
  ...rest
}) => {
  const { portalTarget } = usePortalTarget();
  const { openDropdownId, setOpenDropdownId } = useDropdownCoordination();
  const searchParams = useSearchParams();
  const id = useId();
  const dropdownId = `multi-select-${paramName}-${id}`;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const paramValues = searchParams.getAll(paramName);
  const paramSelectionOptions = options.filter((opt) =>
    paramValues.includes(opt.value)
  );
  const hasInitialized = useRef(false);
  const selectedCount = selectedOptions.length;

  const [menuPortalTarget, setMenuPortalTarget] = useState<
    HTMLElement | null | undefined
  >(undefined);

  useEffect(() => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;

    // On desktop, use the portal target for proper z-index
    // On mobile, don't use portal (render inline) because:
    // 1. The portal target is at the bottom of the page (outside mobile viewport)
    // 2. Mobile browsers have touch event issues with portaled menus
    // 3. Fixed positioning can fail when portal parent is outside viewport
    if (!isMobile && portalTarget) {
      setMenuPortalTarget(portalTarget);
    } else {
      setMenuPortalTarget(undefined);
    }

    // Handle window resize
    const handleResize = () => {
      const isMobileNow = window.innerWidth < 768;
      if (!isMobileNow && portalTarget) {
        setMenuPortalTarget(portalTarget);
      } else {
        setMenuPortalTarget(undefined);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [portalTarget]);

  useEffect(() => {
    if (!hasInitialized.current && paramSelectionOptions.length > 0) {
      setAllSelectedFilterOptions(paramName, paramSelectionOptions);
      hasInitialized.current = true;
    }
  }, [paramName, paramSelectionOptions, setAllSelectedFilterOptions]);

  // Close this dropdown when another dropdown opens
  useEffect(() => {
    if (openDropdownId && openDropdownId !== dropdownId && menuIsOpen) {
      setMenuIsOpen(false);
    }
  }, [openDropdownId, dropdownId, menuIsOpen]);

  const handleChange = useCallback(
    (options: MultiValue<Option>) => {
      let optionsToSet = options;
      if (
        maxSelectedOptions !== undefined &&
        options &&
        options.length > maxSelectedOptions
      ) {
        optionsToSet = options.slice(0, maxSelectedOptions);
      }
      // setSelectedOptions(optionsToSet);
      setAllSelectedFilterOptions(paramName, optionsToSet);
    },
    [maxSelectedOptions, setAllSelectedFilterOptions, paramName]
  );

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

  // Handle mousedown to toggle menu - workaround for Radix Dialog blocking react-select's mousedown
  const handleContainerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Don't toggle if the select is disabled
      if (isDisabled) {
        return;
      }
      // Don't interfere if clicking on a button (like confirm/cancel in CustomMenu)
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }
      // Don't interfere if clicking inside the menu (on options)
      if ((e.target as HTMLElement).closest('[class*="menu"]')) {
        return;
      }

      // Toggle menu state
      e.preventDefault();
      e.stopPropagation();
      setMenuIsOpen((prev) => {
        const newState = !prev;
        // If opening, set this as the current open dropdown (closes others)
        if (newState) {
          setOpenDropdownId(dropdownId);
        } else {
          // If closing, clear the open dropdown
          setOpenDropdownId(null);
        }
        return newState;
      });
    },
    [isDisabled, dropdownId, setOpenDropdownId]
  );

  return (
    <Box onMouseDownCapture={handleContainerMouseDown}>
      {label && (
        <Text style={{ lineHeight: "2" }} htmlFor={rest.id} as="label" size="2">
          {label}
        </Text>
      )}

      <Select<Option, true>
        {...rest}
        isDisabled={isDisabled}
        menuPortalTarget={
          isPortalTarget ? menuPortalTarget : undefined
        }
        menuPosition={menuPosition}
        value={selectedOptions}
        name={`search-multi-select-${paramName}`}
        instanceId={id}
        options={options}
        isClearable={false}
        styles={styles as StylesConfig<Option, true, GroupBase<Option>>}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        openMenuOnFocus={false}
        menuShouldScrollIntoView={false}
        menuIsOpen={menuIsOpen}
        onMenuClose={() => {
          setMenuIsOpen(false);
          setOpenDropdownId(null);
        }}
        isOptionDisabled={isOptionDisabled}
        {...({
          displayName,
          maxSelectedOptions,
          customMenuCloseHandler: () => {
            setMenuIsOpen(false);
            setOpenDropdownId(null);
          },
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

export default React.memo(SearchMultiSelect);
