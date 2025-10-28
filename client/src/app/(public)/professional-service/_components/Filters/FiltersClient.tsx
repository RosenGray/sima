"use client";
import { FC, useMemo } from "react";
import SearchSingleSelect from "@/components/filters/TextSearch/SearchSingleSelect/SearchSingleSelect";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  mapServiceCategoriesToSelectOptions,
  mapServiceSubCategoriesToSelectOptions,
} from "@/lib/service-categories/utils/professionals.utils";
import {
  getCitiesToSelectOptions,
  mapAreasToSelectOptions,
} from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";
import { ServiceCategoryMapping } from "@/lib/professionals/professional-service/types/professional-service.scema";
import { Dialog, Flex, Heading, IconButton, Button, Text } from "@radix-ui/themes";
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
} from "./Filters.styles";

interface FiltersClientProps {
  mappedCategories: ServiceCategoryMapping;
}

const FiltersClient: FC<FiltersClientProps> = ({ mappedCategories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isModalOpen, openModal, closeModal } = useFiltersModal();
  const selectedCategoryId = searchParams.get("categoryId");
  const selectedDistrict = searchParams.get("district") as Districts | null;

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchParams.get("categoryId")) count++;
    if (searchParams.get("subCategoryId")) count++;
    if (searchParams.get("district")) count++;
    if (searchParams.get("city")) count++;
    return count;
  }, [searchParams]);

  // Clear all filters
  const handleClearFilters = () => {
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
      mapServiceSubCategoriesToSelectOptions(
        mappedCategories,
        selectedCategoryId
      ),
    [mappedCategories, selectedCategoryId]
  );

  const citiesOptions = useMemo(
    () => getCitiesToSelectOptions(selectedDistrict || Districts.Center),
    [selectedDistrict]
  );

  const FiltersContent = () => (
    <>
      <SearchSingleSelect
        paramName="categoryId"
        options={categoriesOptions}
        dependencyParams={["subCategoryId"]}
      />
      <SearchSingleSelect
        paramName="subCategoryId"
        options={subCategoryOptions}
        isDisabled={!selectedCategoryId}
      />
      <SearchSingleSelect
        paramName="district"
        options={areasOptions}
        dependencyParams={["city"]}
      />
      <SearchSingleSelect paramName="city" options={citiesOptions} />
    </>
  );

  return (
    <>
      {/* Desktop Filters */}
      <DesktopFiltersWrapper>
        <FiltersSection>
          <FiltersContent />
        </FiltersSection>
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
                  {activeFiltersCount} {activeFiltersCount === 1 ? 'фильтр' : activeFiltersCount < 5 ? 'фильтра' : 'фильтров'} применено
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
              <FiltersContent />
            </ModalFiltersSection>
          </ModalBody>

          <ModalFooter>
            <Flex direction="column" gap="3" width="100%">
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  color="gray"
                  onClick={handleClearFilters}
                  size={{
                    initial: "2",
                    xs: "3",
                  }}
                  style={{ width: "100%" }}
                >
                  Очистить все фильтры
                </Button>
              )}
              <Flex gap="3" width="100%">
                <Button
                  variant="soft"
                  color="gray"
                  style={{ flex: 1 }}
                  onClick={closeModal}
                  size={{
                    initial: "2",
                    xs: "3",
                  }}
                >
                  Отмена
                </Button>
                <Button
                  variant="solid"
                  style={{ flex: 1 }}
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
