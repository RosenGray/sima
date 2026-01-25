import { FC } from "react";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { FiltersContainer } from "@/components/filters/Filters.styles";
import FiltersClient from "./FiltersClient";

const Filters: FC = () => {
  return (
    <FiltersProvider>
      <FiltersContainer>
        <FiltersClient />
      </FiltersContainer>
    </FiltersProvider>
  );
};

export default Filters;
