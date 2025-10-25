import SearchSingleSelect from "@/components/filters/TextSearch/SearchSingleSelect/SearchSingleSelect";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { mapServiceCategoriesToSelectOptions } from "@/lib/service-categories/utils/professionals.utils";
import { Box } from "@radix-ui/themes";
import { FC } from "react";

const Filters: FC = async () => {
  //fake await 10 sec
  const mappedCategories = await serviceCategoryRepository.getMappedCategories();
  const options = mapServiceCategoriesToSelectOptions(mappedCategories);
  return (
    <Box>
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
    </Box>
  );
};

export default Filters;
