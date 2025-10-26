import SearchSingleSelect from "@/components/filters/TextSearch/SearchSingleSelect/SearchSingleSelect";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { mapServiceCategoriesToSelectOptions } from "@/lib/service-categories/utils/professionals.utils";
import { FiltersContainer } from "./Filters.styles";
import { FC } from "react";
import FiltersClient from "./FiltersClient";

const Filters: FC = async () => {
  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();

  return (
    <FiltersContainer>
      <FiltersClient mappedCategories={mappedCategories} />
    </FiltersContainer>
  );
};

export default Filters;
