import { FC, Suspense } from "react";
import { JobsPageContainer } from "./page.styles";
import Filters from "./_components/Filters/Filters";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import JobContent from "./_components/JobContent/JobContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { JobSearchFilters } from "@/lib/jobs/repository/JobRepository";

interface JobsPageProps {
  searchParams?: Promise<{
    district?: string | string[];
    city?: string | string[];
    textSearch?: string;
    page?: string;
  }>;
}

const JobsPage: FC<JobsPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Extract array filters using utility
  const arrayFilters = searchParamsToFilters(searchParams);

  // Build filters object with proper types
  const filters: JobSearchFilters = {
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
    <JobsPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <Filters />
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <JobContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </JobsPageContainer>
  );
};

export default JobsPage;
