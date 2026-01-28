import { FC, Suspense } from "react";
import { CommercialRealEstatePageContainer } from "./page.styles";
import CommercialRealEstateContent from "./_components/CommercialRealEstateContent/CommercialRealEstateContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { CommercialRealEstateSearchFilters } from "@/lib/real-estate/commercial-real-estate/repository/CommercialRealEstateRepository";

interface CommercialRealEstatePageProps {
  searchParams?: Promise<{
    propertyKind?: string | string[];
    dealKind?: string | string[];
    district?: string | string[];
    city?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    squaremeterFrom?: string;
    squaremeterTo?: string;
    additionalFeatures?: string | string[];
    textSearch?: string;
    page?: string;
  }>;
}

const CommercialRealEstatePage: FC<CommercialRealEstatePageProps> = async (
  props
) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: CommercialRealEstateSearchFilters = {
    propertyKind: arrayFilters.propertyKind,
    dealKind: arrayFilters.dealKind,
    district: arrayFilters.district,
    city: arrayFilters.city,
    additionalFeatures: arrayFilters.additionalFeatures,
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

  // Handle squaremeter range filters - transform from string to number
  if (searchParams.squaremeterFrom) {
    const squaremeterFromStr = Array.isArray(searchParams.squaremeterFrom)
      ? searchParams.squaremeterFrom[0]
      : searchParams.squaremeterFrom;
    const squaremeterFromNum = Number(squaremeterFromStr);
    if (!Number.isNaN(squaremeterFromNum) && squaremeterFromNum >= 0) {
      filters.squaremeterFrom = squaremeterFromNum;
    }
  }

  if (searchParams.squaremeterTo) {
    const squaremeterToStr = Array.isArray(searchParams.squaremeterTo)
      ? searchParams.squaremeterTo[0]
      : searchParams.squaremeterTo;
    const squaremeterToNum = Number(squaremeterToStr);
    if (!Number.isNaN(squaremeterToNum) && squaremeterToNum >= 0) {
      filters.squaremeterTo = squaremeterToNum;
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
    <CommercialRealEstatePageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <CommercialRealEstateContent
          filters={filters}
          currentPage={currentPage}
        />
      </Suspense>
    </CommercialRealEstatePageContainer>
  );
};

export default CommercialRealEstatePage;
