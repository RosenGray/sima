import { FC, Suspense } from "react";
import { Yad2PageContainer } from "./page.styles";
import Yad2ItemContent from "./_components/Yad2ItemContent/Yad2ItemContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { Yad2ItemSearchFilters } from "@/lib/yad2/repository/Yad2ItemRepository";

interface Yad2PageProps {
  searchParams?: Promise<{
    category?: string | string[];
    subCategory?: string | string[];
    district?: string | string[];
    city?: string | string[];
    priceFrom?: string;
    priceTo?: string;
    textSearch?: string;
    page?: string;
  }>;
}

const Yad2Page: FC<Yad2PageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: Yad2ItemSearchFilters = {
    category: arrayFilters.category,
    subCategory: arrayFilters.subCategory,
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

  // Handle text search filter
  if (searchParams.textSearch) {
    filters.textSearch = Array.isArray(searchParams.textSearch)
      ? searchParams.textSearch[0]
      : searchParams.textSearch;
  }

  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <Yad2PageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <Yad2ItemContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </Yad2PageContainer>
  );
};

export default Yad2Page;
