"use client";
import { FC, useCallback, useMemo, useState } from "react";
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
import { Button, Flex, Text } from "@radix-ui/themes";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { parseWithZod } from "@conform-to/zod";
import { OthersFilter, OthersFilterSchema } from "./filters.types";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import {
  DesktopFiltersWrapper,
  FiltersSection,
  ButtonsSection,
} from "./Filters.styles";
import {
  FiltersModalContent,
  ModalHeader,
  ModalBody,
  ModalFiltersSection,
  ModalFooter,
  MobileFilterButton,
} from "@/components/filters/Filters.styles";
import { useFiltersModal } from "@/components/filters/FiltersContext";
import {
  Dialog,
  IconButton,
} from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

enableMapSet();

const FiltersClient: FC = () => {
  const { isModalOpen, openModal, closeModal } = useFiltersModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [allSelectedFilterOptions, setAllSelectedFilterOptions] =
    useState<AllSelectedFilterOptionsMap>(
      new Map([
        ["district", []],
        ["city", []],
      ])
    );
  const [moreFilters, setMoreFilters] = useState({
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

  const selectedDistricts = allSelectedFilterOptions
    .get("district")!
    .map((option) => option.value) as Districts[];

  const handleSubmitAllFilters = useCallback(() => {
    const formData = new FormData();
    formData.append("textSearch", moreFilters.textSearch ?? "");
    const parseResult = parseWithZod(formData, { schema: OthersFilterSchema });
    const schemaKeys = Object.keys(OthersFilterSchema.shape);

    const _searchParams = new URLSearchParams(searchParams);
    _searchParams.set("page", "1");

    // Handle dropdown filters
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

    // Handle text search filter
    if (parseResult.status === "success") {
      const values = parseResult.value;
      schemaKeys.forEach((key) => {
        _searchParams.delete(key);
        const value = values[key as keyof OthersFilter];
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
          // When district changes, clear city if district is empty
          if (paramName === "district" && options.length === 0) {
            draft.set("city", []);
          }
        });
      });
    },
    []
  );

  const handleMoreFiltersChange = useCallback(
    (key: "textSearch", value: string) => {
      setMoreFilters((prev) => produce(prev, (draft) => {
        draft[key] = value;
      }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setAllSelectedFilterOptions(
      new Map([
        ["district", []],
        ["city", []],
      ])
    );
    setMoreFilters({
      textSearch: "",
    });
    router.push(pathname);
  }, [router, pathname]);

  const areasOptions = useMemo(() => mapAreasToSelectOptions(), []);

  const citiesOptions = useMemo(
    () => getCitiesToSelectOptionsByDistrictIds(selectedDistricts),
    [selectedDistricts]
  );

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchParams.get("district")) count++;
    if (searchParams.get("city")) count++;
    if (searchParams.get("textSearch")) count++;
    return count;
  }, [searchParams]);

  const renderFilters = () => {
    return (
      <>
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
        <TextSearch
          name="textSearch"
          placeholder="Поиск по названию и описанию"
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
      </>
    );
  };

  return (
    <>
      {/* Desktop Filters */}
      <DesktopFiltersWrapper>
        <FiltersSection>{renderFilters()}</FiltersSection>
        <ButtonsSection>
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
            onClick={handleClearFilters}
            size="3"
          >
            Очистить все фильтры
          </Button>
        </ButtonsSection>
      </DesktopFiltersWrapper>

      {/* Mobile Filter Button */}
      <MobileFilterButton
        size={{ initial: "2", xs: "3" }}
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
            <Dialog.Title mb="0" as="h1">
              Фильтры
            </Dialog.Title>
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

            <IconButton
              variant="ghost"
              color="gray"
              onClick={closeModal}
              size={{ initial: "2", xs: "3" }}
            >
              <Cross2Icon width="20" height="20" />
            </IconButton>
          </ModalHeader>

          <ModalBody>
            <ModalFiltersSection>{renderFilters()}</ModalFiltersSection>
          </ModalBody>

          <ModalFooter>
            <Flex direction="column" gap="3" width="100%">
              <Flex gap="3" width="100%">
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    color="gray"
                    onClick={() => {
                      handleClearFilters();
                      closeModal();
                    }}
                    size={{ initial: "2", xs: "3" }}
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
                  onClick={() => {
                    closeModal();
                    handleSubmitAllFilters();
                  }}
                  size={{ initial: "2", sm: "1" }}
                >
                  <span style={{ whiteSpace: "nowrap" }}>
                    Показать результаты
                  </span>
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
