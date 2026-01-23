"use client";
import { FC } from "react";
import FiltersClient from "./FiltersClient";
import PetFilters from "../../../_components/Filters/PetFilters/PetFilters";
import { useSearchParams } from "next/navigation";

const Filters: FC = () => {
  const searchParams = useSearchParams();

  return (
    <PetFilters activeFiltersCount={searchParams.size - 1}>
      <FiltersClient />
    </PetFilters>
  );
};

export default Filters;
