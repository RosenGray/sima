import SearchSingleSelect from "@/components/filters/TextSearch/SearchSingleSelect/SearchSingleSelect";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { mapServiceCategoriesToSelectOptions } from "@/lib/service-categories/utils/professionals.utils";
import { FiltersContainer } from "./Filters.styles";
import { FC } from "react";

const Filters: FC = async () => {
  const mappedCategories = await serviceCategoryRepository.getMappedCategories();
  const options = mapServiceCategoriesToSelectOptions(mappedCategories);

  return (
    <FiltersContainer>
      <TextSearch
        placeholder="Поиск по описанию / Текст объявления"
        paramName="description"
        label="Поиск по описанию / Текст объявления"
      />
      <SearchSingleSelect
        paramName="categoryId"
        label="Выберите категорию"
        options={options}
      />

    </FiltersContainer>
  );
};

export default Filters;
