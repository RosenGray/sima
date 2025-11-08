"use client";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { enableMapSet, produce } from "immer";
import SearchSingleSelect from "@/components/filters/TextSearch/SearchMultiSelect/SearchMultiSelect";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptionsByCategoryIds,
} from "@/lib/service-categories/utils/professionals.utils";
import {
  getCitiesToSelectOptionsByDistrictIds,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import { ServiceCategoryMapping } from "@/lib/professionals/professional-service/types/professional-service.scema";
import {
  Dialog,
  Flex,
  Heading,
  IconButton,
  Button,
  Text,
} from "@radix-ui/themes";
import { Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useFiltersModal } from "./FiltersContext";
import {
  FiltersSection,
  DesktopFiltersWrapper,
  MobileFilterButton,
  FiltersModalContent,
  ModalHeader,
  ModalBody,
  ModalFiltersSection,
  ModalFooter,
  SubmitSearchFiltersButton,
} from "./Filters.styles";
import { Districts } from "@/lib/cities/types/cities.schema";
import { MultiValue } from "react-select";
import {
  AllSelectedFilterOptionsMap,
  Option,
} from "@/components/filters/TextSearch/SearchMultiSelect/types";

enableMapSet();

interface FiltersClientProps {
  mappedCategories: ServiceCategoryMapping;
}

const FiltersClient: FC<FiltersClientProps> = ({ mappedCategories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isModalOpen, openModal, closeModal } = useFiltersModal();
  // const selectedCategoryIds = searchParams.getAll("categoryId");
  const selectedDistricts = searchParams.getAll("district") as Districts[];
  const [allSelectedFilterOptions, setAllSelectedFilterOptions] =
    useState<AllSelectedFilterOptionsMap>(
      new Map([
        ["categoryId", []],
        ["subCategoryId", []],
        ["district", []],
        ["city", []],
      ])
    );

  const selectedCategoryIds = allSelectedFilterOptions
    .get("categoryId")!
    .map((option) => option.value);
  console.log("selectedCategoryIds", selectedCategoryIds);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchParams.get("categoryId")) count++;
    if (searchParams.get("subCategoryId")) count++;
    if (searchParams.get("district")) count++;
    if (searchParams.get("city")) count++;
    return count;
  }, [searchParams]);

  const handleSubmitAllFilters = () => {
    console.log("allSelectedFilterOptions", allSelectedFilterOptions);
    // router.push(pathname);
  };

  const handleSetAllSelectedFilterOptions = useCallback(
    (paramName: string, options: MultiValue<Option>) => {
      setAllSelectedFilterOptions((prevOptionsMap) => {
        return produce(prevOptionsMap, (draft) => {
          draft.set(paramName, [...options]);
          return draft;
        });
      });
    },
    []
  );

  // Clear filters and close modal (for mobile)
  const handleClearFiltersAndClose = () => {
    router.push(pathname);
    closeModal();
  };

  const categoriesOptions = useMemo(
    () => mapServiceCategoriesToSelectOptions(mappedCategories),
    [mappedCategories]
  );

  const areasOptions = useMemo(() => mapAreasToSelectOptions(), []);

  const subCategoryOptions = useMemo(
    () =>
      mapServiceSubCategoriesToSelectOptionsByCategoryIds(
        mappedCategories,
        selectedCategoryIds
      ),
    [mappedCategories, selectedCategoryIds]
  );

  const citiesOptions = useMemo(
    () => getCitiesToSelectOptionsByDistrictIds(selectedDistricts),
    [selectedDistricts]
  );

  const renderFilters = () => {
    return (
      <>
        <SearchSingleSelect
          displayName="категории"
          placeholder="Выберите категорию"
          paramName="categoryId"
          options={categoriesOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("categoryId")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />
        <SearchSingleSelect
          placeholder="Выберите подкатегорию"
          paramName="subCategoryId"
          displayName="подкатегории"
          options={subCategoryOptions}
          // isDisabled={selectedCategoryIds.length === 0}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("subCategoryId")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />
        <SearchSingleSelect
          placeholder="Выберите район"
          displayName="районы"
          paramName="district"
          options={areasOptions}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("district")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />
        <SearchSingleSelect
          displayName="города"
          placeholder="Выберите город"
          paramName="city"
          options={citiesOptions}
          isDisabled={selectedDistricts.length === 0}
          maxSelectedOptions={3}
          selectedOptions={allSelectedFilterOptions.get("city")!}
          setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
        />
      </>
    );
  };
  return (
    <>
      {/* Desktop Filters */}
      <DesktopFiltersWrapper>
        <MixerHorizontalIcon
          style={{
            // position: "absolute",
            left: 5,
            top: 5,
          }}
          width="18"
          height="18"
        />
        <FiltersSection>{renderFilters()}</FiltersSection>
        {/* {activeFiltersCount > 0 && ( */}
        <SubmitSearchFiltersButton
          variant="outline"
          color="gray"
          onClick={handleSubmitAllFilters}
          size="3"
        >
          Поиск
        </SubmitSearchFiltersButton>
        {/* )} */}
      </DesktopFiltersWrapper>

      {/* Mobile Filter Button */}
      <MobileFilterButton
        size={{
          initial: "2",
          xs: "3",
        }}
        variant="soft"
        onClick={openModal}
      >
        <Flex align="center" gap="2">
          <MixerHorizontalIcon width="18" height="18" />
          <Text>Фильтры</Text>
          {activeFiltersCount > 0 && (
            <Flex
              align="center"
              justify="center"
              style={{
                minWidth: "20px",
                height: "20px",
                borderRadius: "var(--radius-full)",
                background: "var(--accent-9)",
                color: "var(--accent-1)",
                fontSize: "11px",
                fontWeight: "600",
                padding: "0 6px",
              }}
            >
              {activeFiltersCount}
            </Flex>
          )}
        </Flex>
      </MobileFilterButton>

      {/* Mobile Filters Modal */}
      <Dialog.Root open={isModalOpen} onOpenChange={closeModal}>
        <FiltersModalContent>
          <ModalHeader>
            <Flex direction="column" gap="1">
              <Heading
                size={{
                  initial: "4",
                  xs: "5",
                }}
              >
                Фильтры
              </Heading>
              {activeFiltersCount > 0 && (
                <Text size="2" color="gray">
                  {activeFiltersCount}{" "}
                  {activeFiltersCount === 1
                    ? "фильтр"
                    : activeFiltersCount < 5
                    ? "фильтра"
                    : "фильтров"}{" "}
                  применено
                </Text>
              )}
            </Flex>
            <IconButton
              variant="ghost"
              color="gray"
              onClick={closeModal}
              size={{
                initial: "2",
                xs: "3",
              }}
            >
              <Cross2Icon width="20" height="20" />
            </IconButton>
          </ModalHeader>

          <ModalBody>
            <ModalFiltersSection>
              {/* <FiltersContent /> */}
            </ModalFiltersSection>
          </ModalBody>

          <ModalFooter>
            <Flex direction="column" gap="3" width="100%">
              <Flex gap="3" width="100%">
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    color="gray"
                    onClick={handleClearFiltersAndClose}
                    size={{
                      initial: "2",
                      xs: "3",
                    }}
                    style={{ flex: 1 }}
                  >
                    Очистить
                  </Button>
                )}
                <Button
                  variant="solid"
                  style={{
                    flex: activeFiltersCount > 0 ? 1 : undefined,
                    width: activeFiltersCount === 0 ? "100%" : undefined,
                  }}
                  onClick={closeModal}
                  size={{
                    initial: "2",
                    xs: "3",
                  }}
                >
                  Показать результаты
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </FiltersModalContent>
      </Dialog.Root>
    </>
  );
};

export default FiltersClient;
