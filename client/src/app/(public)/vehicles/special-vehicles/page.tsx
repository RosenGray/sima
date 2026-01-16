import { FC, Suspense } from "react";
import { PageContainer } from "./page.styles";
import SpecialVehicleContent from "./_components/SpecialVehicleContent/SpecialVehicleContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { SpecialVehicleSearchFilters } from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";

interface SpecialVehiclesPageProps {
  searchParams?: Promise<{
    category?: string | string[];
    kind?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    district?: string | string[];
    city?: string | string[];
    page?: string;
  }>;
}

const SpecialVehiclesPage: FC<SpecialVehiclesPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: SpecialVehicleSearchFilters = {
    category: arrayFilters.category,
    kind: arrayFilters.kind,
    district: arrayFilters.district,
    city: arrayFilters.city,
  };

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
    <PageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <SpecialVehicleContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </PageContainer>
  );
};

export default SpecialVehiclesPage;
