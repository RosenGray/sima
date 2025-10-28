import { FC, Suspense } from "react";
import { ProfessionalsPageContainer } from "./page.styles";
import Filters from "./_components/Filters/Filters";
import { LoadingFilters } from "./_components/Filters/Filters.styles";
import ProfessionalServiceContent from "./_components/ProfessionalServiceContent/ProfessionalServiceContent";
import Loading from "./loading";

interface ProfessionalsPageProps {
  searchParams?: Promise<{
    description?: string;
    categoryId?: string;
    city?: string;
    subCategoryId?: string;
    district?: string;
    page?: string;
  }>;
}

const ProfessionalsPage: FC<ProfessionalsPageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const filters = {
    description: searchParams?.description,
    categoryId: searchParams?.categoryId,
    city: searchParams?.city,
    subCategoryId: searchParams?.subCategoryId,
    district: searchParams?.district,
  };
  const currentPage = Number(searchParams?.page) || 1;

  // Create a unique key based on search params to force re-render on filter change
  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <ProfessionalsPageContainer>
      <Suspense fallback={<LoadingFilters />}>
        <Filters />
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <ProfessionalServiceContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </ProfessionalsPageContainer>
  );
};

export default ProfessionalsPage;
