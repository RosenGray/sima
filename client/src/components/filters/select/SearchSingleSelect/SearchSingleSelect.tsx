"use client";
import { FC, useId, useEffect, useState, useCallback, useRef } from "react";
import React from "react";
import { Option, SearchSingleSelectProps } from "../types";
import Select, {
  StylesConfig,
  GroupBase,
  SingleValue,
  OptionsOrGroups,
} from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "../select.styles";
import { useSearchParams } from "next/navigation";
import { usePortalTarget } from "@/providers/PortalProvider/PortalProvider";

const SearchSingleSelect: FC<SearchSingleSelectProps> = ({
  label,
  paramName,
  options,
  selectedOptions,
  setAllSelectedFilterOptions,
  isPortalTarget = false,
  modalPortalTarget,
  menuPosition,
  ...rest
}) => {
  const { portalTarget } = usePortalTarget();
  const searchParams = useSearchParams();
  const id = useId();
  const paramValue = searchParams.get(paramName);
  const paramSelectionOption = options.find((opt) => opt?.value === paramValue);
  const hasInitialized = useRef(false);

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
    if (!hasInitialized.current && paramSelectionOption) {
      setAllSelectedFilterOptions(paramName, [paramSelectionOption]);
      hasInitialized.current = true;
    }
  }, [paramName, paramSelectionOption, setAllSelectedFilterOptions]);

  const handleChange = useCallback(
    (option: SingleValue<Option>) => {
      if (option) {
        setAllSelectedFilterOptions(paramName, [option]);
      } else {
        setAllSelectedFilterOptions(paramName, []);
      }
    },
    [paramName, setAllSelectedFilterOptions]
  );

  return (
    <Box>
      {label && (
        <Text style={{ lineHeight: "2" }} htmlFor={rest.id} as="label" size="2">
          {label}
        </Text>
      )}

      <Select
        {...rest}
        menuPortalTarget={
          modalPortalTarget !== undefined
            ? modalPortalTarget
            : isPortalTarget
              ? menuPortalTarget
              : undefined
        }
        menuPosition={menuPosition}
        value={selectedOptions.length > 0 ? selectedOptions[0] : null}
        name={`search-single-select-${paramName}`}
        instanceId={id}
        options={options as OptionsOrGroups<Option, GroupBase<Option>>}
        styles={styles as StylesConfig<Option, false, GroupBase<Option>>}
        onChange={handleChange}
        isClearable={true}
      />
    </Box>
  );
};

export default React.memo(SearchSingleSelect);
