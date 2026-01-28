"use client";
import { FC } from "react";
import FiltersClient from "./FiltersClient";
import Yad2FiltersWrapper from "./Yad2FiltersWrapper/Yad2FiltersWrapper";
import { useSearchParams } from "next/navigation";

const Filters: FC = () => {
  const searchParams = useSearchParams();

  return (
    <Yad2FiltersWrapper activeFiltersCount={searchParams.size - 1}>
      <FiltersClient />
    </Yad2FiltersWrapper>
  );
};

export default Filters;
