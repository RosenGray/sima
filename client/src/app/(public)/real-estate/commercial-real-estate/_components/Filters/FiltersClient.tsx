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
import {
  CommercialRealEstateFilter,
  CommercialRealEstateFilterSchema,
} from "./filters.types";
import PriceTextSearch from "@/components/filters/PriceTextSearch/PriceTextSearch";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import SearchCheckboxButtonGroup from "@/components/filters/SearchCheckboxButtonGroup/SearchCheckboxButtonGroup";
import { ADDITIONAL_FEATURES_OPTIONS } from "@/lib/real-estate/commercial-real-estate/additionalFeaturesOptions";
import DialogPrimitiveButton from "@/components/modals/DialogPrimitiveButton/DialogPrimitiveButton";
import {
  getPriceDialogButtonTitle,
  getSquaremeterDialogButtonTitle,
} from "./Filters.utils";
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
  getDealKindOptions,
  getPropertyKindOptions,
} from "@/lib/real-estate/commercial-real-estate/utils/commercialRealEstateOptions";

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
        ["propertyKind", []],
        ["dealKind", []],
        ["district", []],
        ["city", []],
      ])
    );
  const [moreFilters, setMoreFilters] = useState({
    priceFrom: searchParams.get("priceFrom") ?? "",
    priceTo: searchParams.get("priceTo") ?? "",
    squaremeterFrom: searchParams.get("squaremeterFrom") ?? "",
    squaremeterTo: searchParams.get("squaremeterTo") ?? "",
    textSearch: searchParams.get("textSearch") ?? "",
    additionalFeatures: searchParams.getAll("additionalFeatures"),
  });

  const isSearchButtonDisabled = useMemo(() => {
    const optionsFiltersAreDisabled = Array.from(
      allSelectedFilterOptions.values()
    ).every((options) => options.length === 0);
    const moreFiltersScalarEmpty = [
      moreFilters.priceFrom,
      moreFilters.priceTo,
      moreFilters.squaremeterFrom,
      moreFilters.squaremeterTo,
      moreFilters.textSearch,
    ].every((v) => v === undefined || v === "" || v === null);
    const moreFiltersAreDisabled =
      moreFiltersScalarEmpty && moreFilters.additionalFeatures.length === 0;
    return optionsFiltersAreDisabled && moreFiltersAreDisabled;
  }, [allSelectedFilterOptions, moreFilters]);

  const selectedDistricts = allSelectedFilterOptions
    .get("district")!
    .map((option) => option.value) as Districts[];

  const handleSubmitAllFilters = useCallback(() => {
    const formData = new FormData();
    formData.append("priceFrom", moreFilters.priceFrom ?? "");
    formData.append("priceTo", moreFilters.priceTo ?? "");
    formData.append("squaremeterFrom", moreFilters.squaremeterFrom ?? "");
    formData.append("squaremeterTo", moreFilters.squaremeterTo ?? "");
    formData.append("textSearch", moreFilters.textSearch ?? "");
    const parseResult = parseWithZod(formData, {
      schema: CommercialRealEstateFilterSchema,
    });
    const schemaKeys = Object.keys(CommercialRealEstateFilterSchema.shape);

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

    // Handle schema-validated scalar filters (price, squaremeter, textSearch)
    if (parseResult.status === "success") {
      const values = parseResult.value;
      schemaKeys.forEach((key) => {
        _searchParams.delete(key);
        const value = values[key as keyof CommercialRealEstateFilter];
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

    // Handle array filters (additionalFeatures)
    _searchParams.delete("additionalFeatures");
    moreFilters.additionalFeatures.forEach((v) => {
      _searchParams.append("additionalFeatures", v);
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
    (
      key:
        | "priceFrom"
        | "priceTo"
        | "squaremeterFrom"
        | "squaremeterTo"
        | "textSearch",
      value: string
    ) => {
      setMoreFilters((prev) =>
        produce(prev, (draft) => {
          draft[key] = value;
        })
      );
    },
    []
  );

  const handleAdditionalFeaturesChange = useCallback((values: string[]) => {
    setMoreFilters((prev) => ({ ...prev, additionalFeatures: values }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setAllSelectedFilterOptions(
      new Map([
        ["propertyKind", []],
        ["dealKind", []],
        ["district", []],
        ["city", []],
      ])
    );
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
      squaremeterFrom: "",
      squaremeterTo: "",
      textSearch: "",
      additionalFeatures: [],
    });
    router.push(pathname);
  }, [router, pathname]);

  const handleClearMoreFilters = useCallback(() => {
    setMoreFilters({
      priceFrom: "",
      priceTo: "",
      squaremeterFrom: "",
      squaremeterTo: "",
      textSearch: "",
      additionalFeatures: [],
    });
  }, []);

  const dealKindOptions = useMemo(() => getDealKindOptions(), []);
  const propertyKindOptions = useMemo(() => getPropertyKindOptions(), []);
  const areasOptions = useMemo(() => mapAreasToSelectOptions(), []);

  const citiesOptions = useMemo(
    () => getCitiesToSelectOptionsByDistrictIds(selectedDistricts),
    [selectedDistricts]
  );

  const priceDialogButtonTitle = getPriceDialogButtonTitle(
    moreFilters.priceFrom,
    moreFilters.priceTo
  );

  const squaremeterDialogButtonTitle = getSquaremeterDialogButtonTitle(
    moreFilters.squaremeterFrom,
    moreFilters.squaremeterTo
  );

  const renderMobileFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="тип сделки"
          placeholder="Выберите тип сделки"
          paramName="dealKind"
          options={dealKindOptions}
          maxSelectedOptions={2}
          selectedOptions={allSelectedFilterOptions.get("dealKind")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />

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

  const renderMainFilters = () => {
    return (
      <>
        <SearchMultiSelect
          displayName="тип сделки"
          placeholder="Выберите тип сделки"
          paramName="dealKind"
          options={dealKindOptions}
          maxSelectedOptions={2}
          selectedOptions={allSelectedFilterOptions.get("dealKind")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
          isPortalTarget
        />

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
        <DialogPrimitiveButton
          title={squaremeterDialogButtonTitle}
          showOverlay={true}
        >
          <TextSearch
            name="squaremeterFrom"
            placeholder="0"
            type="number"
            label="Площадь от (м²)"
            value={moreFilters.squaremeterFrom}
            onChange={(value) => handleMoreFiltersChange("squaremeterFrom", value)}
          />

          <TextSearch
            name="squaremeterTo"
            placeholder="0"
            type="number"
            label="Площадь до (м²)"
            value={moreFilters.squaremeterTo}
            onChange={(value) => handleMoreFiltersChange("squaremeterTo", value)}
          />
        </DialogPrimitiveButton>

        <SearchCheckboxButtonGroup
          label="Дополнительные особенности"
          subLabel="Отметьте дополнительные особенности недвижимости."
          options={ADDITIONAL_FEATURES_OPTIONS}
          value={moreFilters.additionalFeatures}
          onChange={handleAdditionalFeaturesChange}
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
