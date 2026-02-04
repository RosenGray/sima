"use client";
import { FC, useId, useEffect, useLayoutEffect, useState, useCallback, useRef } from "react";
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

const VIEWPORT_PADDING = 24;
const MIN_MENU_HEIGHT = 200;

const SearchSingleSelect: FC<SearchSingleSelectProps> = ({
  label,
  paramName,
  options,
  selectedOptions,
  setAllSelectedFilterOptions,
  isPortalTarget = false,
  modalPortalTarget,
  menuPosition,
  menuPlacement = "auto",
  maxMenuHeight = 200,
  useDynamicMaxMenuHeight = true,
  ...rest
}) => {
  const { portalTarget } = usePortalTarget();
  const searchParams = useSearchParams();
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [dynamicMaxMenuHeight, setDynamicMaxMenuHeight] = useState<
    number | null
  >(null);
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

  // Compute viewport-aware maxMenuHeight when menu opens
  useLayoutEffect(() => {
    if (!useDynamicMaxMenuHeight || !menuIsOpen) {
      setDynamicMaxMenuHeight(null);
      return;
    }
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_PADDING;
    const spaceAbove = rect.top - VIEWPORT_PADDING;
    const available = Math.max(spaceBelow, spaceAbove);
    const clamped = Math.max(
      MIN_MENU_HEIGHT,
      Math.min(maxMenuHeight, available)
    );
    setDynamicMaxMenuHeight(clamped);
  }, [menuIsOpen, useDynamicMaxMenuHeight, maxMenuHeight]);

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
    <Box ref={containerRef}>
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
        menuPlacement={menuPlacement}
        maxMenuHeight={dynamicMaxMenuHeight ?? maxMenuHeight}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
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
