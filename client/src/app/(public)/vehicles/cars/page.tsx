import { FC, Suspense } from "react";
import { CarsPageContainer } from "./page.styles";
import CarsContent from "./_components/CarsContent/CarsContent";
import Loading from "./loading";

interface CarsPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

const CarsPage: FC<CarsPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  // Placeholder filters object - will be populated when filters are implemented
  const filters = {};

  // Create a unique key based on filters and page to force re-render on change
  const contentKey = JSON.stringify({ ...filters, page: currentPage });

  return (
    <CarsPageContainer>
      <Suspense key={contentKey} fallback={<Loading />}>
        <CarsContent filters={filters} currentPage={currentPage} />
      </Suspense>
    </CarsPageContainer>
  );
};

export default CarsPage;