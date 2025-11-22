import { FC, Suspense } from "react";
import { CarsPageContainer } from "./page.styles";
import CarsContent from "./_components/CarsContent/CarsContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import { CarSearchFilters } from "@/lib/vehicles/cars/repository/CarRepository";
import Filters from "./_components/Filters/Filters";

interface CarsPageProps {
  searchParams?: Promise<{
    manufacturer?: string | string[];
    model?: string | string[];
    yearFrom?: string | string[];
    yearTo?: string | string[];
    page?: string;
  }>;
}

const CarsPage: FC<CarsPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract filters - convert to arrays for consistency
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: CarSearchFilters = {
    manufacturer: arrayFilters.manufacturer,
    model: arrayFilters.model,
  };

  // Handle yearFrom and yearTo as single values (not arrays) for range queries
  if (searchParams.yearFrom) {
    filters.yearFrom = Array.isArray(searchParams.yearFrom)
      ? searchParams.yearFrom[0]
      : searchParams.yearFrom;
  }

  if (searchParams.yearTo) {
    filters.yearTo = Array.isArray(searchParams.yearTo)
      ? searchParams.yearTo[0]
      : searchParams.yearTo;
  }

  // Create a unique key based on filters and page to force re-render on change
  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <CarsPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <Filters />
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <CarsContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </CarsPageContainer>
  );
};

export default CarsPage;
