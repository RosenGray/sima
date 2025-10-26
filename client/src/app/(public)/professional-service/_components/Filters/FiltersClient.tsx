"use client";
import { FC, useMemo } from "react";
import SearchSingleSelect from "@/components/filters/TextSearch/SearchSingleSelect/SearchSingleSelect";
import { useSearchParams } from "next/navigation";
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
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import { SearchSection, FiltersSection } from "./Filters.styles";

interface FiltersClientProps {
  mappedCategories: ServiceCategoryMapping;
}

const FiltersClient: FC<FiltersClientProps> = ({ mappedCategories }) => {
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId");
  const selectedDistrict = searchParams.get("district") as Districts | null;

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

  return (
    <>
      {/* <SearchSection>
        <TextSearch
          placeholder="Поиск по описанию / Текст объявления"
          paramName="description"
        />
      </SearchSection> */}
      <FiltersSection>
        <SearchSingleSelect
          paramName="categoryId"
          options={categoriesOptions}
        />
        <SearchSingleSelect
          paramName="subCategoryId"
          options={subCategoryOptions}
          isDisabled={!selectedCategoryId}
          defaultValue={subCategoryOptions[0]}
        />
        <SearchSingleSelect
          paramName="district"
          options={areasOptions}
        />
        <SearchSingleSelect
          paramName="city"
          options={citiesOptions}
          defaultValue={citiesOptions[0]}
        />
        
      </FiltersSection>
    </>
  );
};

export default FiltersClient;
