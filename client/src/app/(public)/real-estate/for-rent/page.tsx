import { FC, Suspense } from "react";
import { RealEstateForRentPageContainer } from "./page.styles";
import RealEstateForRentContent from "./_components/RealEstateForRentContent/RealEstateForRentContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { RealEstateForRentSearchFilters } from "@/lib/real-estate/for-rent/repository/RealEstateForRentRepository";

interface RealEstateForRentPageProps {
  searchParams?: Promise<{
    propertyKind?: string | string[];
    district?: string | string[];
    city?: string | string[];
    numberOfRooms?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    airconditioning?: string | string[];
    balcony?: string | string[];
    parking?: string | string[];
    floor?: string | string[];
    totalflors?: string | string[];
    additionalFeatures?: string | string[];
    furniture?: string | string[];
    entryDate?: string | string[];
    year?: string | string[];
    month?: string | string[];
    day?: string | string[];
    textSearch?: string;
    page?: string;
  }>;
}

const RealEstateForRentPage: FC<RealEstateForRentPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: RealEstateForRentSearchFilters = {
    propertyKind: arrayFilters.propertyKind,
    district: arrayFilters.district,
    city: arrayFilters.city,
    numberOfRooms: arrayFilters.numberOfRooms,
    airconditioning: arrayFilters.airconditioning,
    balcony: arrayFilters.balcony,
    parking: arrayFilters.parking,
    floor: arrayFilters.floor,
    totalflors: arrayFilters.totalflors,
    additionalFeatures: arrayFilters.additionalFeatures,
    furniture: arrayFilters.furniture,
    entryDate: arrayFilters.entryDate,
    year: arrayFilters.year,
    month: arrayFilters.month,
    day: arrayFilters.day,
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

  // Handle text search filter - single string value
  if (searchParams.textSearch) {
    filters.textSearch = Array.isArray(searchParams.textSearch)
      ? searchParams.textSearch[0]
      : searchParams.textSearch;
  }

  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <RealEstateForRentPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <RealEstateForRentContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </RealEstateForRentPageContainer>
  );
};

export default RealEstateForRentPage;
