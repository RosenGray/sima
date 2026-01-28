"use client";
import { FC } from "react";
import FiltersClient from "./FiltersClient";
import RealEstateFiltersWrapper from "../../../_components/Filters/RealEstateFiltersWrapper/RealEstateFiltersWrapper";
import { useSearchParams } from "next/navigation";

const Filters: FC = () => {
  const searchParams = useSearchParams();

  return (
    <RealEstateFiltersWrapper activeFiltersCount={searchParams.size - 1}>
      <FiltersClient />
    </RealEstateFiltersWrapper>
  );
};

export default Filters;
