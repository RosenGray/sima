import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { FiltersContainer } from "./Filters.styles";
import { FC } from "react";
import FiltersClient from "./FiltersClient";
import { FiltersProvider } from "./FiltersContext";

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
