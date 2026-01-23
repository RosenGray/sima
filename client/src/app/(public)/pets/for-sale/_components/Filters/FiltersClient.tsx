"use client";
import React, { FC, useCallback, useMemo, useState } from "react";
import { enableMapSet, produce } from "immer";
import SearchMultiSelect from "@/components/filters/select/SearchMultiSelect/SearchMultiSelect";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  mapAnimalsToSelectOptions,
  getKindsToSelectOptionsByAnimalIds,
} from "@/lib/pets/animals";
import { AnimalId } from "@/lib/pets/animals/types/animal.schema";
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
import { PetForSaleFilter, PetForSaleFilterSchema } from "./filters.types";
import SearchSingleSelect from "@/components/filters/select/SearchSingleSelect/SearchSingleSelect";
import MoreFiltersModal from "../modals/MoreFiltersModal/MoreFiltersModal";
import PriceTextSearch from "@/components/filters/PriceTextSearch/PriceTextSearch";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import DialogPrimitiveButton from "@/components/modals/DialogPrimitiveButton/DialogPrimitiveButton";
import { getPriceDialogButtonTitle } from "./Filters.utils";
import {
  DesktopFiltersWrapper,
  MobileFilterFooter,
  MobileFiltersContent,
  MobileFiltersWrapper,
  ModalFiltersSection,
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
        ["animal", []],
        ["kind", []],
        ["district", []],
        ["city", []],
      ])
    );
  const [moreFilters, setMoreFilters] = useState({
    priceFrom: searchParams.get("priceFrom") ?? "",
    priceTo: searchParams.get("priceTo") ?? "",
    textSearch: searchParams.get("textSearch") ?? "",
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

  const selectedAnimalIds = allSelectedFilterOptions
    .get("animal")!
    .map((option) => option.value) as AnimalId[];

  const selectedDistricts = allSelectedFilterOptions
    .get("district")!
    .map((option) => option.value) as Districts[];

  const handleSubmitAllFilters = useCallback(() => {
    const formData = new FormData();
    Object.entries(moreFilters).forEach(([key, value]) => {
      formData.append(key, value?.toString() ?? "");
    });
    const parseResult = parseWithZod(formData, {
      schema: PetForSaleFilterSchema,
    });
    const schemaKeys = Object.keys(PetForSaleFilterSchema.shape);

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
        const value = values[key as keyof PetForSaleFilter];
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
          // Clear dependent filter when parent is cleared
          if (paramName === "animal" && options.length === 0) {
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
        ["animal", []],
        ["kind", []],
        ["district", []],
        ["city", []],
      ])
    );
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
      textSearch: "",
    });
    router.push(pathname);
  }, [router, pathname]);

  const handleClearMoreFilters = useCallback(() => {
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
      textSearch: "",
    });
  }, []);

  const animalOptions = useMemo(() => mapAnimalsToSelectOptions(), []);

  const kindOptions = useMemo(
    () => getKindsToSelectOptionsByAnimalIds(selectedAnimalIds),
    [selectedAnimalIds]
  );

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

  const priceDialogButtonTitle = getPriceDialogButtonTitle(
    moreFilters.priceFrom,
    moreFilters.priceTo
  );

  const renderFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="животные"
          placeholder="Выберите животное"
          paramName="animal"
          options={animalOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("animal")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          isPortalTarget
        />

        <SearchMultiSelect
          placeholder="Выберите вид"
          displayName="виды"
          paramName="kind"
          options={kindOptions}
          isDisabled={selectedAnimalIds.length === 0}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("kind")!}
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

  const renderMobileFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="животные"
          placeholder="Выберите животное"
          paramName="animal"
          options={animalOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("animal")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />

        <SearchMultiSelect
          placeholder="Выберите вид"
          displayName="виды"
          paramName="kind"
          options={kindOptions}
          isDisabled={selectedAnimalIds.length === 0}
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

        <TextSearch
          name="textSearch"
          placeholder="Поиск по описанию"
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

      {/* Mobile Filters - rendered inside PetFilters modal */}
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
