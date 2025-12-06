import { FC, Suspense } from "react";
import { CarsPageContainer } from "./page.styles";
import CarsContent from "./_components/CarsContent/CarsContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";

interface CarsPageProps {
  searchParams?: Promise<{
    manufacturer?: string | string[];
    model?: string | string[];
    yearFrom?: string | string[];
    yearTo?: string | string[];
    page?: string;
  }>;
}

const CarsPage: FC<CarsPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  const filters = searchParamsToFilters(searchParams);

  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <CarsPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <Filters />
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <CarsContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </CarsPageContainer>
  );
};

export default CarsPage;
