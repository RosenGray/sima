"use client";
import { FC, useCallback, useMemo, useState } from "react";
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
import SearchSingleSelect from "@/components/filters/select/SearchSingleSelect/SearchSingleSelect";
import MoreFiltersModal from "../modals/MoreFiltersModal/MoreFiltersModal";
import PriceTextSearch from "@/components/filters/PriceTextSearch/PriceTextSearch";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import DialogPrimitiveButton from "@/components/modals/DialogPrimitiveButton/DialogPrimitiveButton";
import { getYearDialogButtonTitle } from "./Filters.utils";
import {
  DesktopFiltersWrapper,
  ModalFiltersSection,
} from "@/components/filters/Filters.styles";

enableMapSet();

interface FiltersClientProps {
  formRef: React.RefObject<HTMLFormElement>;
}

const FiltersClient: FC<FiltersClientProps> = ({ formRef }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isMoreFiltersModalOpen, setIsMoreFiltersModalOpen] = useState(false);
  const [allSelectedFilterOptions, setAllSelectedFilterOptions] =
    useState<AllSelectedFilterOptionsMap>(
      new Map([
        ["manufacturer", []],
        ["model", []],
        ["yearFrom", []],
        ["yearTo", []],
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

  // Render filters for desktop (with DialogPrimitiveButton for years)
  const renderDesktopFilters = () => {
    return (
      <>
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
          showOverlay={true}
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
      </>
    );
  };

  // Render filters for mobile (without DialogPrimitiveButton for years)
  const renderMobileFilters = () => {
    return (
      <>
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
      </>
    );
  };

  const renderMoreFilters = () => {
    return (
      <ModalFiltersSection>
        <PriceTextSearch
          name="priceFrom"
          placeholder="0"
          defaultValue={searchParams.get("priceFrom") ?? undefined}
        />
        <PriceTextSearch
          name="priceTo"
          placeholder="0"
          defaultValue={searchParams.get("priceTo") ?? undefined}
        />
        <TextSearch
          name="color"
          placeholder="Цвет"
          type="text"
          defaultValue={searchParams.get("color")?.toString()}
        />
      </ModalFiltersSection>
    );
  };

  return (
    <>
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
        {/* Desktop Filters */}
        <DesktopFiltersWrapper>
          {renderDesktopFilters()}

          <Button
            variant="outline"
            color="gray"
            onClick={() => setIsMoreFiltersModalOpen(true)}
            size="3"
          >
            Больше фильтров
          </Button>

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
        </DesktopFiltersWrapper>
      </form>

      {/* More Filters Modal (Desktop) */}
      <MoreFiltersModal
        open={isMoreFiltersModalOpen}
        onOpenChange={setIsMoreFiltersModalOpen}
      >
        {renderMoreFilters()}
      </MoreFiltersModal>

      {/* Mobile Filters - rendered inside VehicleFilters modal */}
      <div
        style={{
          display: "contents",
        }}
        className="mobile-filters-content"
      >
        {renderMobileFilters()}
        {renderMoreFilters()}
      </div>
    </>
  );
};

export default FiltersClient;
