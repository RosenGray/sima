import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { FiltersContainer } from "../../../../../components/filters/Filters.styles";
import { FC } from "react";
import FiltersClient from "./FiltersClient";
import { FiltersProvider } from "../../../../../components/filters/FiltersContext";

const Filters: FC = async () => {
  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();

  return (
    <FiltersProvider>
      <FiltersContainer>
        <FiltersClient mappedCategories={mappedCategories} />
      </FiltersContainer>
    </FiltersProvider> 
  );
};

export default Filters;
