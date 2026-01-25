import { FC, Suspense } from "react";
import { OtherPageContainer } from "./page.styles";
import Filters from "./_components/Filters/Filters";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import OthersContent from "./_components/OthersContent/OthersContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { OthersSearchFilters } from "@/lib/other/repository/OthersRepository";

interface OtherPageProps {
  searchParams?: Promise<{
    district?: string | string[];
    city?: string | string[];
    textSearch?: string;
    page?: string;
  }>;
}

const OtherPage: FC<OtherPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: OthersSearchFilters = {
    district: arrayFilters.district,
    city: arrayFilters.city,
  };

  // Handle text search filter - single string value
  if (searchParams.textSearch) {
    filters.textSearch = Array.isArray(searchParams.textSearch)
      ? searchParams.textSearch[0]
      : searchParams.textSearch;
  }

  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <OtherPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <Filters />
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <OthersContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </OtherPageContainer>
  );
};

export default OtherPage;
