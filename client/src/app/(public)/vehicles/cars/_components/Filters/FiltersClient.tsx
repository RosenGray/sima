"use client";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { enableMapSet, produce } from "immer";
import SearchMultiSelect from "@/components/filters/select/SearchMultiSelect/SearchMultiSelect";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  mapVehicleManufacturersToSelectOptions,
  getVehicleModelsToSelectOptionsByManufacturerIds,
} from "@/lib/vehicles/cars/vehicleModels";
import { VehicleManufacturerId } from "@/lib/vehicles/cars/vehicleManufacturers/types/vehicleManufacturer.schema";
import { getYearsOptions } from "@/lib/vehicles/utils/vehicles.utils";
import { MultiValue } from "react-select";
import {
  AllSelectedFilterOptionsMap,
  Option,
} from "@/components/filters/select/types";
import { Button } from "@radix-ui/themes";
import { parseWithZod } from "@conform-to/zod";
import { CarFilter, CarFilterSchema } from "./filters.types";
import DialogPrimitiveButton from "@/components/modals/DialogPrimitiveButton/DialogPrimitiveButton";
import SearchSingleSelect from "@/components/filters/select/SearchSingleSelect/SearchSingleSelect";
import { getYearDialogButtonTitle } from "./Filters.utils";

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
        ["yearFrom", []],
        ["yearTo", []],
      ])
    );
  const formRef = useRef<HTMLFormElement>(null);

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
    const formData = new FormData(formRef.current!);
    const schemaKeys = Object.keys(CarFilterSchema.shape);
    const parseResult = parseWithZod(formData, { schema: CarFilterSchema });

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

    if (parseResult.status === "success") {
      const values = parseResult.value;
      schemaKeys.forEach((key) => {
        _searchParams.delete(key);
        const value = values[key as keyof CarFilter];
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
        ["yearFrom", []],
        ["yearTo", []],
      ])
    );
    router.push(pathname);
  };

  const manufacturerOptions = useMemo(
    () => mapVehicleManufacturersToSelectOptions(),
    []
  );

  const modelOptions = useMemo(
    () =>
      getVehicleModelsToSelectOptionsByManufacturerIds(selectedManufacturerIds),
    [selectedManufacturerIds]
  );

  const yearsOptions = useMemo(() => getYearsOptions(), []);

  const yearDialogButtonTitle = getYearDialogButtonTitle(
    allSelectedFilterOptions
  );

  return (
    <div>
      {/* Dummy container - will be replaced with proper UI later */}
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
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

        <DialogPrimitiveButton
          title={yearDialogButtonTitle}
          showOverlay={true} // Hide overlay
        >
          <SearchSingleSelect
            placeholder="Год от"
            displayName="год от"
            paramName="yearFrom"
            options={yearsOptions}
            selectedOptions={allSelectedFilterOptions.get("yearFrom")!}
            setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          />

          <SearchSingleSelect
            placeholder="Год до"
            displayName="год до"
            paramName="yearTo"
            options={yearsOptions}
            selectedOptions={allSelectedFilterOptions.get("yearTo")!}
            setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          />
        </DialogPrimitiveButton>

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
      </form>
    </div>
  );
};

export default FiltersClient;
