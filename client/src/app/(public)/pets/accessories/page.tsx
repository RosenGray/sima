import { FC, Suspense } from "react";
import { PetAccessoryPageContainer } from "./page.styles";
import PetAccessoryContent from "./_components/PetAccessoryContent/PetAccessoryContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { PetAccessorySearchFilters } from "@/lib/pets/accessories/repository/PetAccessoryRepository";

interface PetAccessoryPageProps {
  searchParams?: Promise<{
    animal?: string | string[];
    kind?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    district?: string | string[];
    city?: string | string[];
    textSearch?: string;
    page?: string;
  }>;
}

const PetAccessoryPage: FC<PetAccessoryPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: PetAccessorySearchFilters = {
    animal: arrayFilters.animal,
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

  // Handle text search filter - single string value
  if (searchParams.textSearch) {
    filters.textSearch = Array.isArray(searchParams.textSearch)
      ? searchParams.textSearch[0]
      : searchParams.textSearch;
  }

  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <PetAccessoryPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <PetAccessoryContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </PetAccessoryPageContainer>
  );
};

export default PetAccessoryPage;
