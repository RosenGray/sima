"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { enableMapSet, produce } from "immer";
import SearchMultiSelect from "@/components/filters/select/SearchMultiSelect/SearchMultiSelect";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  mapSpecialVehicleCategoriesToSelectOptions,
} from "@/lib/vehicles/special-vehicles/specialVehicleCategories";
import {
  getSpecialVehicleKindsToSelectOptionsByCategoryIds,
} from "@/lib/vehicles/special-vehicles/specialVehicleKinds";
import { SpecialVehicleCategoryId } from "@/lib/vehicles/special-vehicles/specialVehicleCategories/types/specialVehicleCategory.schema";
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
import { SpecialVehicleFilter, SpecialVehicleFilterSchema } from "./filters.types";
import MoreFiltersModal from "../modals/MoreFiltersModal/MoreFiltersModal";
import PriceTextSearch from "@/components/filters/PriceTextSearch/PriceTextSearch";
import {
  DesktopFiltersWrapper,
  MobileFilterFooter,
  MobileFiltersContent,
  MobileFiltersWrapper,
  ModalFiltersSection,
  FiltersSection,
  ButtonsSection,
} from "./Filters.styles";
import { useFiltersModal } from "@/components/filters/FiltersContext";

enableMapSet();

const FiltersClient: FC = () => {
  const { closeModal } = useFiltersModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isMoreFiltersModalOpen, setIsMoreFiltersModalOpen] = useState(false);
  const [allSelectedFilterOptions, setAllSelectedFilterOptions] =
    useState<AllSelectedFilterOptionsMap>(
      new Map([
        ["category", []],
        ["kind", []],
        ["district", []],
        ["city", []],
      ])
    );
  const [moreFilters, setMoreFilters] = useState({
    priceFrom: searchParams.get("priceFrom") ?? "",
    priceTo: searchParams.get("priceTo") ?? "",
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

  const selectedCategoryIds = allSelectedFilterOptions
    .get("category")!
    .map((option) => option.value) as SpecialVehicleCategoryId[];

  const selectedDistricts = allSelectedFilterOptions
    .get("district")!
    .map((option) => option.value) as Districts[];

  const handleSubmitAllFilters = useCallback(() => {
    const formData = new FormData();
    Object.entries(moreFilters).forEach(([key, value]) => {
      formData.append(key, value?.toString() ?? "");
    });
    const parseResult = parseWithZod(formData, {
      schema: SpecialVehicleFilterSchema,
    });
    const schemaKeys = Object.keys(SpecialVehicleFilterSchema.shape);

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
        const value = values[key as keyof SpecialVehicleFilter];
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
          // When category changes, clear kind if category is empty
          if (paramName === "category" && options.length === 0) {
            draft.set("kind", []);
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
        ["category", []],
        ["kind", []],
        ["district", []],
        ["city", []],
      ])
    );
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
    });
    router.push(pathname);
  }, [router, pathname]);

  const handleClearMoreFilters = useCallback(() => {
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
    });
  }, []);

  const categoryOptions = useMemo(
    () => mapSpecialVehicleCategoriesToSelectOptions(),
    []
  );

  const kindOptions = useMemo(
    () =>
      getSpecialVehicleKindsToSelectOptionsByCategoryIds(selectedCategoryIds),
    [selectedCategoryIds]
  );

  const areasOptions = useMemo(() => mapAreasToSelectOptions(), []);

  const citiesOptions = useMemo(
    () => getCitiesToSelectOptionsByDistrictIds(selectedDistricts),
    [selectedDistricts]
  );

  // Sync filter state with searchParams whenever searchParams changes
  useEffect(() => {
    // Get all option arrays
    const allCategoryOptions = mapSpecialVehicleCategoriesToSelectOptions();
    const allKindOptions = getSpecialVehicleKindsToSelectOptionsByCategoryIds(
      searchParams.getAll("category") as SpecialVehicleCategoryId[]
    );
    const allAreasOptions = mapAreasToSelectOptions();
    const allCitiesOptions = getCitiesToSelectOptionsByDistrictIds(
      searchParams.getAll("district") as Districts[]
    );

    // Sync dropdown filters (category, kind, district, city)
    const categoryParams = searchParams.getAll("category");
    const kindParams = searchParams.getAll("kind");
    const districtParams = searchParams.getAll("district");
    const cityParams = searchParams.getAll("city");

    setAllSelectedFilterOptions((prevOptionsMap) => {
      return produce(prevOptionsMap, (draft) => {
        // Update category
        if (categoryParams.length > 0) {
          const matchedCategoryOptions = allCategoryOptions.filter((opt) =>
            categoryParams.includes(opt.value)
          );
          draft.set("category", matchedCategoryOptions);
        } else {
          draft.set("category", []);
        }

        // Update kind
        if (kindParams.length > 0) {
          const matchedKindOptions = allKindOptions.filter((opt) =>
            kindParams.includes(opt.value)
          );
          draft.set("kind", matchedKindOptions);
        } else {
          draft.set("kind", []);
        }

        // Update district
        if (districtParams.length > 0) {
          const matchedDistrictOptions = allAreasOptions.filter((opt) =>
            districtParams.includes(opt.value)
          );
          draft.set("district", matchedDistrictOptions);
        } else {
          draft.set("district", []);
        }

        // Update city
        if (cityParams.length > 0) {
          const matchedCityOptions = allCitiesOptions.filter((opt) =>
            cityParams.includes(opt.value)
          );
          draft.set("city", matchedCityOptions);
        } else {
          draft.set("city", []);
        }
      });
    });

    // Sync price filters
    setMoreFilters({
      priceFrom: searchParams.get("priceFrom") ?? "",
      priceTo: searchParams.get("priceTo") ?? "",
    });
  }, [searchParams]);

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
          displayName="категории"
          placeholder="Категория"
          paramName="category"
          options={categoryOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("category")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          isPortalTarget
        />

        <SearchMultiSelect
          placeholder="Выберите вид"
          displayName="виды"
          paramName="kind"
          options={kindOptions}
          isDisabled={selectedCategoryIds.length === 0}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("kind")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          isPortalTarget
        />
      </>
    );
  };

  const renderMobileFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="категории"
          placeholder="Категория"
          paramName="category"
          options={categoryOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("category")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />

        <SearchMultiSelect
          placeholder="Выберите вид"
          displayName="виды"
          paramName="kind"
          options={kindOptions}
          isDisabled={selectedCategoryIds.length === 0}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("kind")!}
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
      </ModalFiltersSection>
    );
  };

  return (
    <>
      <DesktopFiltersWrapper>
        <FiltersSection>{renderFilters()}</FiltersSection>
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
            <Text size="2">Очистить все фильтры</Text>
          </Button>
        </ButtonsSection>
      </DesktopFiltersWrapper>

      <MoreFiltersModal
        open={isMoreFiltersModalOpen}
        onOpenChange={setIsMoreFiltersModalOpen}
        onClearMoreFilters={handleClearMoreFilters}
      >
        {renderMoreFilters()}
      </MoreFiltersModal>

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
            <Text size="2">Очистить</Text>
          </Button>
        </MobileFilterFooter>
      </MobileFiltersWrapper>
    </>
  );
};

export default FiltersClient;
