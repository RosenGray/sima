"use client";
import { FC, useCallback, useMemo, useState } from "react";
import { enableMapSet, produce } from "immer";
import SearchMultiSelect from "@/components/filters/SearchMultiSelect/SearchMultiSelect";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  mapVehicleManufacturersToSelectOptions,
  getVehicleModelsToSelectOptionsByManufacturerIds,
} from "@/lib/vehicles/cars/vehicleModels";
import { VehicleManufacturerId } from "@/lib/vehicles/cars/vehicleManufacturers/types/vehicleManufacturer.schema";
import { MultiValue } from "react-select";
import {
  AllSelectedFilterOptionsMap,
  Option,
} from "@/components/filters/SearchMultiSelect/types";
import { Button } from "@radix-ui/themes";

enableMapSet();

const FiltersClient: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [allSelectedFilterOptions, setAllSelectedFilterOptions] =
    useState<AllSelectedFilterOptionsMap>(
      new Map([
        ["manufacturer", []],
        ["model", []],
      ])
    );

  const isSearchButtonDisabled = useMemo(() => {
    return Array.from(allSelectedFilterOptions.values()).every(
      (options) => options.length === 0
    );
  }, [allSelectedFilterOptions]);

  const selectedManufacturerIds = allSelectedFilterOptions
    .get("manufacturer")!
    .map((option) => option.value) as VehicleManufacturerId[];

  // Count active filters (only manufacturer and model for now)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchParams.get("manufacturer")) count++;
    if (searchParams.get("model")) count++;
    return count;
  }, [searchParams]);

  const handleSubmitAllFilters = () => {
    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set("page", "1");
    const params = allSelectedFilterOptions.keys();
    params.forEach((paramName) => {
      const options = allSelectedFilterOptions.get(paramName)!;
      if (options.length > 0) {
        _searchParams.delete(paramName);
        options.forEach((option) => {
          _searchParams.append(paramName, option.value);
        });
      } else {
        _searchParams.delete(paramName);
      }
    });

    router.replace(`${pathname}?${_searchParams.toString()}`);
  };

  const handleSetAllSelectedFilterOptions = useCallback(
    (paramName: string, options: MultiValue<Option>) => {
      setAllSelectedFilterOptions((prevOptionsMap) => {
        return produce(prevOptionsMap, (draft) => {
          draft.set(paramName, [...options]);
          // When manufacturer changes, clear model if manufacturer is empty
          if (paramName === "manufacturer" && options.length === 0) {
            draft.set("model", []);
          }
        });
      });
    },
    []
  );

  // Clear filters
  const handleClearFiltersAndClose = () => {
    setAllSelectedFilterOptions(
      new Map([
        ["manufacturer", []],
        ["model", []],
      ])
    );
    router.push(pathname);
  };

  const manufacturerOptions = useMemo(
    () => mapVehicleManufacturersToSelectOptions(),
    []
  );

  const modelOptions = useMemo(
    () => getVehicleModelsToSelectOptionsByManufacturerIds(selectedManufacturerIds),
    [selectedManufacturerIds]
  );

  return (
    <div>
      {/* Dummy container - will be replaced with proper UI later */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <SearchMultiSelect
          displayName="производители"
          placeholder="Выберите производителя"
          paramName="manufacturer"
          options={manufacturerOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("manufacturer")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />
        
        <SearchMultiSelect
          placeholder="Выберите модель"
          displayName="модели"
          paramName="model"
          options={modelOptions}
          isDisabled={selectedManufacturerIds.length === 0}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("model")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />

        {/* Dummy buttons - will be replaced with proper UI later */}
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            variant="outline"
            color="gray"
            disabled={isSearchButtonDisabled}
            onClick={handleSubmitAllFilters}
            size="3"
          >
            Поиск
          </Button>
          <Button
            variant="outline"
            color="gray"
            disabled={searchParams.size === 0}
            onClick={handleClearFiltersAndClose}
            size="3"
          >
            Очистить все фильтры
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersClient;

