import { FC, Suspense } from "react";
import { MotorcyclesPageContainer } from "./page.styles";
import MotorcyclesContent from "./_components/MotorcyclesContent/MotorcyclesContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { MotorcycleSearchFilters } from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";

interface MotorcyclesPageProps {
  searchParams?: Promise<{
    manufacturer?: string | string[];
    model?: string | string[];
    yearFrom?: string | string[];
    yearTo?: string | string[];
    kind?: string | string[];
    numberOfHand?: string | string[];
    district?: string | string[];
    city?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    page?: string;
  }>;
}

const MotorcyclesPage: FC<MotorcyclesPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: MotorcycleSearchFilters = {
    manufacturer: arrayFilters.manufacturer,
    model: arrayFilters.model,
    kind: arrayFilters.kind,
    numberOfHand: arrayFilters.numberOfHand,
    district: arrayFilters.district,
    city: arrayFilters.city,
  };

  // Handle single value filters (yearFrom/yearTo) - not arrays for range queries
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

  // Handle price range filters - transform from string (with commas) to number
  if (searchParams.priceFrom) {
    const priceFromStr = Array.isArray(searchParams.priceFrom)
      ? searchParams.priceFrom[0]
      : searchParams.priceFrom;
    // Remove commas and parse to number (same logic as PriceFromToSchema)
    const cleaned = priceFromStr.replace(/,/g, "");
    const priceFromNum = Number(cleaned);
    if (!Number.isNaN(priceFromNum) && priceFromNum >= 0) {
      filters.priceFrom = priceFromNum;
    }
  }

  if (searchParams.priceTo) {
    const priceToStr = Array.isArray(searchParams.priceTo)
      ? searchParams.priceTo[0]
      : searchParams.priceTo;
    // Remove commas and parse to number (same logic as PriceFromToSchema)
    const cleaned = priceToStr.replace(/,/g, "");
    const priceToNum = Number(cleaned);
    if (!Number.isNaN(priceToNum) && priceToNum >= 0) {
      filters.priceTo = priceToNum;
    }
  }

  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <MotorcyclesPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <MotorcyclesContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </MotorcyclesPageContainer>
  );
};

export default MotorcyclesPage;
