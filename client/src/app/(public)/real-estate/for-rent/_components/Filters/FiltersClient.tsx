"use client";
import React, { FC, useCallback, useMemo, useState } from "react";
import { enableMapSet, produce } from "immer";
import SearchMultiSelect from "@/components/filters/select/SearchMultiSelect/SearchMultiSelect";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
import { RealEstateForRentFilter, RealEstateForRentFilterSchema } from "./filters.types";
import PriceTextSearch from "@/components/filters/PriceTextSearch/PriceTextSearch";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import SearchCheckboxButtonGroup from "@/components/filters/SearchCheckboxButtonGroup/SearchCheckboxButtonGroup";
import { ADDITIONAL_FEATURES_OPTIONS } from "@/lib/real-estate/for-rent/additionalFeaturesOptions";
import DialogPrimitiveButton from "@/components/modals/DialogPrimitiveButton/DialogPrimitiveButton";
import { getPriceDialogButtonTitle } from "./Filters.utils";
import { useFiltersModal } from "@/components/filters/FiltersContext";
import {
  DesktopFiltersWrapper,
  MobileFiltersWrapper,
  MobileFiltersContent,
  MobileFilterFooter,
  ModalFiltersSection,
  FiltersSection,
  ButtonsSection,
} from "./Filters.styles";
import MoreFiltersModal from "../modals/MoreFiltersModal/MoreFiltersModal";
import {
  getPropertyKindOptions,
  getAirConditioningOptions,
  getParkingOptions,
  getFurnitureOptions,
  getEntryDateOptions,
  getNumberOfRoomsOptions,
  getYearOptionsForSelect,
  getMonthOptions,
  getDayOptions,
  getFloorOptions,
} from "@/lib/real-estate/for-rent/utils/realEstateOptions";

enableMapSet();

type MoreFiltersState = {
  priceFrom: string;
  priceTo: string;
  textSearch: string;
  airconditioning: string[];
  balcony: string[];
  parking: string[];
  floor: string[];
  totalflors: string[];
  additionalFeatures: string[];
  furniture: string[];
  entryDate: string[];
  year: string[];
  month: string[];
  day: string[];
};

type ArrayFilterKey = Exclude<keyof MoreFiltersState, "priceFrom" | "priceTo" | "textSearch">;

const FiltersClient: FC = () => {
  const { closeModal } = useFiltersModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isMoreFiltersModalOpen, setIsMoreFiltersModalOpen] = useState(false);
  const [allSelectedFilterOptions, setAllSelectedFilterOptions] =
    useState<AllSelectedFilterOptionsMap>(
      new Map([
        ["propertyKind", []],
        ["district", []],
        ["city", []],
        ["numberOfRooms", []],
      ])
    );
  const [moreFilters, setMoreFilters] = useState<MoreFiltersState>({
    priceFrom: searchParams.get("priceFrom") ?? "",
    priceTo: searchParams.get("priceTo") ?? "",
    textSearch: searchParams.get("textSearch") ?? "",
    airconditioning: searchParams.getAll("airconditioning"),
    balcony: searchParams.getAll("balcony"),
    parking: searchParams.getAll("parking"),
    floor: searchParams.getAll("floor"),
    totalflors: searchParams.getAll("totalflors"),
    additionalFeatures: searchParams.getAll("additionalFeatures"),
    furniture: searchParams.getAll("furniture"),
    entryDate: searchParams.getAll("entryDate"),
    year: searchParams.getAll("year"),
    month: searchParams.getAll("month"),
    day: searchParams.getAll("day"),
  });

  const isSearchButtonDisabled = useMemo(() => {
    const optionsFiltersAreDisabled = Array.from(
      allSelectedFilterOptions.values()
    ).every((options) => options.length === 0);
    const moreFiltersScalarEmpty = [
      moreFilters.priceFrom,
      moreFilters.priceTo,
      moreFilters.textSearch,
    ].every((v) => v === undefined || v === "" || v === null);
    const moreFiltersArraysEmpty = [
      moreFilters.airconditioning,
      moreFilters.balcony,
      moreFilters.parking,
      moreFilters.floor,
      moreFilters.totalflors,
      moreFilters.additionalFeatures,
      moreFilters.furniture,
      moreFilters.entryDate,
      moreFilters.year,
      moreFilters.month,
      moreFilters.day,
    ].every((arr) => arr.length === 0);
    const moreFiltersAreDisabled =
      moreFiltersScalarEmpty && moreFiltersArraysEmpty;
    return optionsFiltersAreDisabled && moreFiltersAreDisabled;
  }, [allSelectedFilterOptions, moreFilters]);

  const selectedDistricts = allSelectedFilterOptions
    .get("district")!
    .map((option) => option.value) as Districts[];

  const handleSubmitAllFilters = useCallback(() => {
    const formData = new FormData();
    formData.append("priceFrom", moreFilters.priceFrom ?? "");
    formData.append("priceTo", moreFilters.priceTo ?? "");
    formData.append("textSearch", moreFilters.textSearch ?? "");
    const parseResult = parseWithZod(formData, {
      schema: RealEstateForRentFilterSchema,
    });
    const schemaKeys = Object.keys(RealEstateForRentFilterSchema.shape);

    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set("page", "1");

    // Handle main filters (dropdowns)
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

    // Handle schema-validated scalar filters (price, textSearch)
    if (parseResult.status === "success") {
      const values = parseResult.value;
      schemaKeys.forEach((key) => {
        _searchParams.delete(key);
        const value = values[key as keyof RealEstateForRentFilter];
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

    // Handle array filters from moreFilters
    const arrayFilterKeys = [
      "airconditioning",
      "balcony",
      "parking",
      "floor",
      "totalflors",
      "additionalFeatures",
      "furniture",
      "entryDate",
      "year",
      "month",
      "day",
    ];

    arrayFilterKeys.forEach((key) => {
      _searchParams.delete(key);
      const values = moreFilters[key as keyof typeof moreFilters] as string[];
      if (Array.isArray(values) && values.length > 0) {
        values.forEach((v) => {
          _searchParams.append(key, v);
        });
      }
    });

    router.replace(`${pathname}?${_searchParams.toString()}`);
  }, [moreFilters, searchParams, allSelectedFilterOptions, router, pathname]);

  const handleSetAllSelectedFilterOptions = useCallback(
    (paramName: string, options: MultiValue<Option>) => {
      setAllSelectedFilterOptions((prevOptionsMap) => {
        return produce(prevOptionsMap, (draft) => {
          draft.set(paramName, [...options]);
          // Clear dependent filter when parent is cleared
          if (paramName === "district" && options.length === 0) {
            draft.set("city", []);
          }
        });
      });
    },
    []
  );

  const handleMoreFiltersChange = useCallback(
    (key: "priceFrom" | "priceTo" | "textSearch", value: string) => {
      setMoreFilters((prev) => produce(prev, (draft) => {
        draft[key] = value;
      }));
    },
    []
  );

  const handleArrayFilterChange = useCallback(
    (key: ArrayFilterKey, values: string[]) => {
      setMoreFilters((prev) =>
        produce(prev, (draft) => {
          draft[key] = values;
        })
      );
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setAllSelectedFilterOptions(
      new Map([
        ["propertyKind", []],
        ["district", []],
        ["city", []],
        ["numberOfRooms", []],
      ])
    );
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
      textSearch: "",
      airconditioning: [],
      balcony: [],
      parking: [],
      floor: [],
      totalflors: [],
      additionalFeatures: [],
      furniture: [],
      entryDate: [],
      year: [],
      month: [],
      day: [],
    });
    router.push(pathname);
  }, [router, pathname]);

  const handleClearMoreFilters = useCallback(() => {
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
      textSearch: "",
      airconditioning: [],
      balcony: [],
      parking: [],
      floor: [],
      totalflors: [],
      additionalFeatures: [],
      furniture: [],
      entryDate: [],
      year: [],
      month: [],
      day: [],
    });
  }, []);

  const propertyKindOptions = useMemo(() => getPropertyKindOptions(), []);
  const numberOfRoomsOptions = useMemo(() => getNumberOfRoomsOptions(), []);
  const areasOptions = useMemo(() => mapAreasToSelectOptions(), []);

  const citiesOptions = useMemo(
    () => getCitiesToSelectOptionsByDistrictIds(selectedDistricts),
    [selectedDistricts]
  );

  const airConditioningOptions = useMemo(() => getAirConditioningOptions(), []);
  const parkingOptions = useMemo(() => getParkingOptions(), []);
  const furnitureOptions = useMemo(() => getFurnitureOptions(), []);
  const entryDateOptions = useMemo(() => getEntryDateOptions(), []);
  const floorOptions = useMemo(() => getFloorOptions(), []);
  const yearOptions = useMemo(() => getYearOptionsForSelect(), []);
  const monthOptions = useMemo(() => getMonthOptions(), []);
  const dayOptions = useMemo(() => getDayOptions(), []);

  const priceDialogButtonTitle = getPriceDialogButtonTitle(
    moreFilters.priceFrom,
    moreFilters.priceTo
  );

  const renderMobileFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="тип недвижимости"
          placeholder="Выберите тип"
          paramName="propertyKind"
          options={propertyKindOptions}
          maxSelectedOptions={2}
          selectedOptions={allSelectedFilterOptions.get("propertyKind")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />

        <SearchMultiSelect
          placeholder="Выберите район"
          displayName="районы"
          paramName="district"
          options={areasOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("district")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
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
        />

        <SearchMultiSelect
          displayName="количество комнат"
          placeholder="Выберите количество комнат"
          paramName="numberOfRooms"
          options={numberOfRoomsOptions}
          maxSelectedOptions={5}
          selectedOptions={allSelectedFilterOptions.get("numberOfRooms")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />
      </>
    );
  };

  const renderMainFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="тип недвижимости"
          placeholder="Выберите тип"
          paramName="propertyKind"
          options={propertyKindOptions}
          maxSelectedOptions={2}
          selectedOptions={allSelectedFilterOptions.get("propertyKind")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          isPortalTarget
        />

        <SearchMultiSelect
          placeholder="Выберите район"
          displayName="районы"
          paramName="district"
          options={areasOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("district")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          isPortalTarget
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
          isPortalTarget
        />

        <SearchMultiSelect
          displayName="количество комнат"
          placeholder="Выберите количество комнат"
          paramName="numberOfRooms"
          options={numberOfRoomsOptions}
          maxSelectedOptions={5}
          selectedOptions={allSelectedFilterOptions.get("numberOfRooms")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          isPortalTarget
        />

        <DialogPrimitiveButton
          title={priceDialogButtonTitle}
          showOverlay={true}
        >
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
        </DialogPrimitiveButton>
      </>
    );
  };

  const renderMoreFilters = () => {
    return (
      <ModalFiltersSection>
        <SearchMultiSelect
          placeholder="Выберите кондиционер"
          displayName="кондиционер"
          paramName="airconditioning"
          options={airConditioningOptions}
          maxSelectedOptions={3}
          selectedOptions={moreFilters.airconditioning.map((v) => ({
            value: v,
            label: airConditioningOptions.find((o) => o.value === v)?.label || v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("airconditioning", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Выберите количество балконов"
          displayName="балкон"
          paramName="balcony"
          options={Array.from({ length: 5 }, (_, i) => ({
            value: i.toString(),
            label: i.toString(),
          }))}
          maxSelectedOptions={5}
          selectedOptions={moreFilters.balcony.map((v) => ({
            value: v,
            label: v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("balcony", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Выберите парковку"
          displayName="парковка"
          paramName="parking"
          options={parkingOptions}
          maxSelectedOptions={3}
          selectedOptions={moreFilters.parking.map((v) => ({
            value: v,
            label: parkingOptions.find((o) => o.value === v)?.label || v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("parking", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Выберите этаж"
          displayName="этаж"
          paramName="floor"
          options={floorOptions}
          maxSelectedOptions={5}
          selectedOptions={moreFilters.floor.map((v) => ({
            value: v,
            label: v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("floor", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Выберите общее количество этажей"
          displayName="всего этажей"
          paramName="totalflors"
          options={floorOptions}
          maxSelectedOptions={5}
          selectedOptions={moreFilters.totalflors.map((v) => ({
            value: v,
            label: v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("totalflors", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchCheckboxButtonGroup
          label="Дополнительные особенности"
          subLabel="Отметьте дополнительные особенности недвижимости."
          options={ADDITIONAL_FEATURES_OPTIONS}
          value={moreFilters.additionalFeatures}
          onChange={(values) => handleArrayFilterChange("additionalFeatures", values)}
        />

        <SearchMultiSelect
          placeholder="Выберите мебель"
          displayName="мебель"
          paramName="furniture"
          options={furnitureOptions}
          maxSelectedOptions={3}
          selectedOptions={moreFilters.furniture.map((v) => ({
            value: v,
            label: furnitureOptions.find((o) => o.value === v)?.label || v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("furniture", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Выберите тип въезда"
          displayName="тип въезда"
          paramName="entryDate"
          options={entryDateOptions}
          maxSelectedOptions={2}
          selectedOptions={moreFilters.entryDate.map((v) => ({
            value: v,
            label: entryDateOptions.find((o) => o.value === v)?.label || v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("entryDate", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Выберите год"
          displayName="год"
          paramName="year"
          options={yearOptions}
          maxSelectedOptions={5}
          selectedOptions={moreFilters.year.map((v) => ({
            value: v,
            label: v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("year", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Выберите месяц"
          displayName="месяц"
          paramName="month"
          options={monthOptions}
          maxSelectedOptions={5}
          selectedOptions={moreFilters.month.map((v) => ({
            value: v,
            label: v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("month", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <SearchMultiSelect
          placeholder="Выберите день"
          displayName="день"
          paramName="day"
          options={dayOptions}
          maxSelectedOptions={5}
          selectedOptions={moreFilters.day.map((v) => ({
            value: v,
            label: v,
          }))}
          setAllSelectedFilterOptions={(paramName, options) => {
            handleArrayFilterChange("day", options.map((o) => o.value));
          }}
          menuPosition="fixed"
        />

        <TextSearch
          name="textSearch"
          placeholder="Поиск по описанию и улице"
          type="text"
          value={moreFilters.textSearch}
          onChange={(value) => handleMoreFiltersChange("textSearch", value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmitAllFilters();
            }
          }}
        />
      </ModalFiltersSection>
    );
  };

  return (
    <>
      <DesktopFiltersWrapper>
        <FiltersSection>{renderMainFilters()}</FiltersSection>
        <ButtonsSection>
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
        </ButtonsSection>
      </DesktopFiltersWrapper>

      {/* More Filters Modal (Desktop) */}
      <MoreFiltersModal
        open={isMoreFiltersModalOpen}
        onOpenChange={setIsMoreFiltersModalOpen}
        onClearMoreFilters={handleClearMoreFilters}
      >
        {renderMoreFilters()}
      </MoreFiltersModal>

      {/* Mobile Filters - rendered inside RealEstateFiltersWrapper modal */}
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
