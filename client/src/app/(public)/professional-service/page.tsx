import { FC, Suspense } from "react";
import { ProfessionalsPageContainer } from "./page.styles";
import Filters from "./_components/Filters/Filters";
import { LoadingFilters } from "./_components/Filters/Filters.styles";
import ProfessionalServiceContent from "./_components/ProfessionalServiceContent/ProfessionalServiceContent";
import Loading from "./loading";

interface ProfessionalsPageProps {
  searchParams?: Promise<{
    description?: string;
    categoryId?: string | string[];
    city?: string | string[];
    subCategoryId?: string | string[];
    district?: string | string[];
    page?: string;
  }>;
}

const ProfessionalsPage: FC<ProfessionalsPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};

  const filters = Object.keys(searchParams)
    .filter((key) => key !== "page")
    .reduce((acc, k) => {
      const searchParamValue = searchParams[k as keyof typeof searchParams];
      if (!searchParamValue) return acc;
      if (Array.isArray(searchParamValue)) {
        acc[k] = searchParamValue;
      } else {
        acc[k] = [searchParamValue];
      }
      return acc;
    }, {} as Record<string, string[]>);

  const currentPage = Number(searchParams?.page) || 1;

  // Create a unique key based on search params to force re-render on filter change
  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <ProfessionalsPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <Filters />
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <ProfessionalServiceContent
          filters={filters}
          currentPage={currentPage}
        />
      </Suspense>
    </ProfessionalsPageContainer>
  );
};

export default ProfessionalsPage;
