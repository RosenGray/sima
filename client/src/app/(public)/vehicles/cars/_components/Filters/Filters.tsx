"use client";
import { FC, useMemo, useRef, useState } from "react";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import FiltersClient from "./FiltersClient";
import VehicleFilters from "../../../_components/Filters/VehicleFilters/VehicleFilters";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { CarFilterSchema } from "./filters.types";
import { enableMapSet } from "immer";

enableMapSet();

const Filters: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [submitHandler, setSubmitHandler] = useState<(() => void) | null>(null);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(false);

  // Count active filters including all types
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchParams.get("manufacturer")) count++;
    if (searchParams.get("model")) count++;
    if (searchParams.get("yearFrom")) count++;
    if (searchParams.get("yearTo")) count++;
    if (searchParams.get("priceFrom")) count++;
    if (searchParams.get("priceTo")) count++;
    if (searchParams.get("color")) count++;
    return count;
  }, [searchParams]);

  // Use the submit handler from FiltersClient if available, otherwise fallback
  const handleSubmitAllFilters = () => {
    if (submitHandler) {
      submitHandler();
    } else {
      // Fallback: only handle text inputs (for backward compatibility)
      const formData = new FormData(formRef.current!);
      const schemaKeys = Object.keys(CarFilterSchema.shape);
      const parseResult = parseWithZod(formData, { schema: CarFilterSchema });

      const _searchParams = new URLSearchParams(searchParams);
      _searchParams.set("page", "1");

      if (parseResult.status === "success") {
        const values = parseResult.value;
        schemaKeys.forEach((key) => {
          _searchParams.delete(key);
          const value = values[key as keyof typeof parseResult.value];
          const valueString = value?.toString();
          if (valueString && valueString !== "") {
            _searchParams.append(key, valueString);
          }
        });
      } else if (parseResult.status === "error" && parseResult.error) {
        const { error } = parseResult;
        for (let i = 0; i < schemaKeys.length; i++) {
          const key = schemaKeys[i];
          _searchParams.delete(key);
          const errors = error[key];
          if (errors && errors.length > 0) continue;
          const value = formData.get(key);
          const valueString = value?.toString();
          if (valueString && valueString !== "") {
            _searchParams.append(key, valueString);
          }
        }
      }

      router.replace(`${pathname}?${_searchParams.toString()}`);
    }
  };

  const handleClearFiltersAndClose = () => {
    router.push(pathname);
  };

  return (
    <FiltersProvider>
      <VehicleFilters
        activeFiltersCount={activeFiltersCount}
        isSearchButtonDisabled={isSearchButtonDisabled}
        onMobileSubmit={handleSubmitAllFilters}
        onMobileClear={handleClearFiltersAndClose}
      >
        <FiltersClient 
          formRef={formRef} 
          onSubmitHandlerReady={setSubmitHandler}
          onSearchButtonDisabledChange={setIsSearchButtonDisabled}
        />
      </VehicleFilters>
    </FiltersProvider>
  );
};

export default Filters;
