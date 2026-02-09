import { FC, Suspense } from "react";
import { PetForSalePageContainer } from "./page.styles";
import PetForSaleContent from "./_components/PetForSaleContent/PetForSaleContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { PetForSaleSearchFilters } from "@/lib/pets/for-sale/repository/PetForSaleRepository";

interface PetForSalePageProps {
  searchParams?: Promise<{
    animal?: string | string[];
    kind?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    district?: string | string[];
    city?: string | string[];
    textSearch?: string;
    adjustments?: string | string[];
    sort?: string;
    page?: string;
  }>;
}

const PetForSalePage: FC<PetForSalePageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;
  const sort =
    typeof searchParams?.sort === "string" ? searchParams.sort : undefined;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: PetForSaleSearchFilters = {
    animal: arrayFilters.animal,
    kind: arrayFilters.kind,
    district: arrayFilters.district,
    city: arrayFilters.city,
    adjustments: arrayFilters.adjustments,
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

  const contentKey = JSON.stringify({ ...filters, page: currentPage, sort });
  const filtersKey = JSON.stringify(filters);

  return (
    <PetForSalePageContainer>
      <Suspense key={filtersKey} fallback={<LoadingFilters />}>
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <PetForSaleContent
          filters={filters}
          currentPage={currentPage}
          sort={sort}
        />
      </Suspense>
    </PetForSalePageContainer>
  );
};

export default PetForSalePage;
