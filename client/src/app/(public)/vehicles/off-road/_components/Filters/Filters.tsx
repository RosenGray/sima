"use client";
import { FC } from "react";
import FiltersClient from "./FiltersClient";
import VehicleFilters from "../../../_components/Filters/VehicleFilters/VehicleFilters";
import { useSearchParams } from "next/navigation";

const Filters: FC = () => {
  const searchParams = useSearchParams();

  return (
    <VehicleFilters activeFiltersCount={searchParams.size - 1}>
      <FiltersClient />
    </VehicleFilters>
  );
};

export default Filters;
