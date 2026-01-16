"use client";
import React, { FC, useCallback, useMemo, useState } from "react";
import { enableMapSet, produce } from "immer";
import SearchMultiSelect from "@/components/filters/select/SearchMultiSelect/SearchMultiSelect";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { mapCommercialVehicleManufacturersToSelectOptions } from "@/lib/vehicles/commercial-vehicles/vehicleCommercialManufacturers";
import { getCommercialVehicleModelsToSelectOptionsByManufacturerIds } from "@/lib/vehicles/commercial-vehicles/vehicleCommercialModels";
import { VehicleManufacturerId } from "@/lib/vehicles/commercial-vehicles/vehicleCommercialManufacturers/types/commercialVehicleManufacturer.schema";
import {
  getYearsOptions,
  getNumberOfHandsOptions,
} from "@/lib/vehicles/utils/vehicles.utils";
import { TransmissionType } from "@/lib/vehicles/cars/types/cars.types";
import {
  getCitiesToSelectOptionsByDistrictIds,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { MultiValue } from "react-select";
import {
  AllSelectedFilterOptionsMap,
  Option,
} from "@/components/filters/select/types";
import { Button, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { parseWithZod } from "@conform-to/zod";
import { CommercialVehicleFilter, CommercialVehicleFilterSchema } from "./filters.types";
import SearchSingleSelect from "@/components/filters/select/SearchSingleSelect/SearchSingleSelect";
import MoreFiltersModal from "../modals/MoreFiltersModal/MoreFiltersModal";
import PriceTextSearch from "@/components/filters/PriceTextSearch/PriceTextSearch";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import DialogPrimitiveButton from "@/components/modals/DialogPrimitiveButton/DialogPrimitiveButton";
import { getYearDialogButtonTitle } from "./Filters.utils";
import {
  DesktopFiltersWrapper,
  MobileFilterFooter,
  MobileFiltersContent,
  MobileFiltersWrapper,
  ModalFiltersSection,
} from "./Filters.styles";
import { useFiltersModal } from "@/components/filters/FiltersContext";

enableMapSet();

// Map TransmissionType enum to select options
const transmissionOptions = Object.values(TransmissionType).map((value) => ({
  value,
  label:
    value === TransmissionType.MANUAL
      ? "Механическая"
      : value === TransmissionType.AUTOMATIC
      ? "Автоматическая"
      : value === TransmissionType.TIPTRONIC
      ? "Типтроник"
      : "Роботизированная",
}));

const FiltersClient: FC = () => {
  const { closeModal } = useFiltersModal();
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
        ["numberOfHand", []],
        ["transmission", []],
        ["district", []],
        ["city", []],
      ])
    );
  const [moreFilters, setMoreFilters] = useState({
    priceFrom: searchParams.get("priceFrom") ?? "",
    priceTo: searchParams.get("priceTo") ?? "",
    color: searchParams.get("color") ?? "",
  });

  const isSearchButtonDisabled = useMemo(() => {
    const optionsFiltersAreDisabled = Array.from(
      allSelectedFilterOptions.values()
    ).every((options) => options.length === 0);
    const moreFiltersAreDisabled = Object.values(moreFilters).every(
      (value) => value === undefined || value === "" || value === null
    );
    return optionsFiltersAreDisabled && moreFiltersAreDisabled;
  }, [allSelectedFilterOptions, moreFilters]);

  const selectedManufacturerIds = allSelectedFilterOptions
    .get("manufacturer")!
    .map((option) => option.value) as VehicleManufacturerId[];

  const selectedDistricts = allSelectedFilterOptions
    .get("district")!
    .map((option) => option.value) as Districts[];

  const handleSubmitAllFilters = useCallback(() => {
    const formData = new FormData();
    Object.entries(moreFilters).forEach(([key, value]) => {
      formData.append(key, value?.toString() ?? "");
    });
    const parseResult = parseWithZod(formData, { schema: CommercialVehicleFilterSchema });
    const schemaKeys = Object.keys(CommercialVehicleFilterSchema.shape);

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
        const value = values[key as keyof CommercialVehicleFilter];
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
  }, [moreFilters, searchParams, allSelectedFilterOptions, router, pathname]);

  const handleSetAllSelectedFilterOptions = useCallback(
    (paramName: string, options: MultiValue<Option>) => {
      setAllSelectedFilterOptions((prevOptionsMap) => {
        return produce(prevOptionsMap, (draft) => {
          draft.set(paramName, [...options]);
          // When manufacturer changes, clear model if manufacturer is empty
          if (paramName === "manufacturer" && options.length === 0) {
            draft.set("model", []);
          }
          // When district changes, clear city if district is empty
          if (paramName === "district" && options.length === 0) {
            draft.set("city", []);
          }
        });
      });
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setAllSelectedFilterOptions(
      new Map([
        ["manufacturer", []],
        ["model", []],
        ["yearFrom", []],
        ["yearTo", []],
        ["numberOfHand", []],
        ["transmission", []],
        ["district", []],
        ["city", []],
      ])
    );
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
      color: "",
    });
    router.push(pathname);
  }, [router, pathname]);

  const handleClearMoreFilters = useCallback(() => {
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
      color: "",
    });
  }, []);

  const manufacturerOptions = useMemo(
    () => mapCommercialVehicleManufacturersToSelectOptions(),
    []
  );

  const modelOptions = useMemo(
    () =>
      getCommercialVehicleModelsToSelectOptionsByManufacturerIds(selectedManufacturerIds),
    [selectedManufacturerIds]
  );

  const yearsOptions = useMemo(() => getYearsOptions(), []);

  const yearDialogButtonTitle = getYearDialogButtonTitle(
    allSelectedFilterOptions
  );

  const numberOfHandsOptions = useMemo(() => getNumberOfHandsOptions(), []);

  const areasOptions = useMemo(() => mapAreasToSelectOptions(), []);

  const citiesOptions = useMemo(
    () => getCitiesToSelectOptionsByDistrictIds(selectedDistricts),
    [selectedDistricts]
  );

  const handleMoreFiltersChange = useCallback(
    (key: keyof typeof moreFilters, value: string) => {
      setMoreFilters((prevMoreFilters) => {
        return produce(prevMoreFilters, (draft) => {
          draft[key] = value;
        });
      });
    },
    []
  );

  const renderFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="производители"
          placeholder="Производитель"
          paramName="manufacturer"
          options={manufacturerOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("manufacturer")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          isPortalTarget
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
          isPortalTarget
        />

        <DialogPrimitiveButton title={yearDialogButtonTitle} showOverlay={true}>
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

  const renderMobileFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="производители"
          placeholder="Производитель"
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
        <SearchMultiSelect
          placeholder="Выберите район"
          displayName="районы"
          paramName="district"
          options={areasOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("district")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          displayName="города"
          placeholder="Выберите город"
          paramName="city"
          options={citiesOptions}
          isDisabled={selectedDistricts.length === 0}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("city")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Количество рук"
          displayName="количество рук"
          paramName="numberOfHand"
          options={numberOfHandsOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("numberOfHand")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Коробка передач"
          displayName="коробка передач"
          paramName="transmission"
          options={transmissionOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("transmission")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          menuPosition="fixed"
        />

        <PriceTextSearch
          name="priceFrom"
          placeholder="0"
          value={moreFilters.priceFrom}
          onChange={(value) => handleMoreFiltersChange("priceFrom", value)}
        />
        <PriceTextSearch
          name="priceTo"
          placeholder="0"
          value={moreFilters.priceTo}
          onChange={(value) => handleMoreFiltersChange("priceTo", value)}
        />
        <TextSearch
          name="color"
          placeholder="Цвет"
          type="text"
          value={moreFilters.color}
          onChange={(value) => handleMoreFiltersChange("color", value)}
        />
      </ModalFiltersSection>
    );
  };

  return (
    <>
      <DesktopFiltersWrapper>
        {renderFilters()}
        <Button
          variant="outline"
          color="gray"
          onClick={() => setIsMoreFiltersModalOpen(true)}
          size="3"
        >
          <MixerHorizontalIcon width="18" height="18" />
          <Text size="2">еще фильтры</Text>
        </Button>

        <Button
          variant="solid"
          color="yellow"
          disabled={isSearchButtonDisabled}
          onClick={handleSubmitAllFilters}
          size="3"
        >
          <MagnifyingGlassIcon width="18" height="18" />
          <Text size="3">Поиск</Text>
        </Button>
        <Button
          variant="outline"
          color="gray"
          disabled={searchParams.size === 0}
          onClick={handleClearFilters}
          size="3"
        >
          Очистить все фильтры
        </Button>
      </DesktopFiltersWrapper>

      {/* More Filters Modal (Desktop) */}
      <MoreFiltersModal
        open={isMoreFiltersModalOpen}
        onOpenChange={setIsMoreFiltersModalOpen}
        onClearMoreFilters={handleClearMoreFilters}
      >
        {renderMoreFilters()}
      </MoreFiltersModal>

      {/* Mobile Filters - rendered inside VehicleFilters modal */}
      <MobileFiltersWrapper>
        <MobileFiltersContent>
          {renderMobileFilters()}
          {renderMoreFilters()}
        </MobileFiltersContent>

        <MobileFilterFooter>
          <Button
            variant="solid"
            color="yellow"
            disabled={isSearchButtonDisabled}
            onClick={() => {
              handleSubmitAllFilters();
              closeModal();
            }}
            size="3"
          >
            <MagnifyingGlassIcon width="18" height="18" />
            <Text size="3">Поиск</Text>
          </Button>
          <Button
            variant="outline"
            color="gray"
            disabled={searchParams.size === 0}
            onClick={handleClearFilters}
            size="3"
          >
            Очистить все фильтры
          </Button>
        </MobileFilterFooter>
      </MobileFiltersWrapper>
    </>
  );
};

export default FiltersClient;
