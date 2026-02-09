import { FC, Suspense } from "react";
import { PetForFreePageContainer } from "./page.styles";
import PetForFreeContent from "./_components/PetForFreeContent/PetForFreeContent";
import Loading from "./loading";
import { searchParamsToFilters } from "@/utils/common";
import { LoadingFilters } from "@/components/filters/Filters.styles";
import Filters from "./_components/Filters/Filters";
import { FiltersProvider } from "@/components/filters/FiltersContext";
import { PetForFreeSearchFilters } from "@/lib/pets/for-free/repository/PetForFreeRepository";

interface PetForFreePageProps {
  searchParams?: Promise<{
    animal?: string | string[];
    kind?: string | string[];
    district?: string | string[];
    city?: string | string[];
    textSearch?: string;
    adjustments?: string | string[];
    sort?: string;
    page?: string;
  }>;
}

const PetForFreePage: FC<PetForFreePageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort || "date_desc";

  const arrayFilters = searchParamsToFilters(searchParams);

  const filters: PetForFreeSearchFilters = {
    animal: arrayFilters.animal,
    kind: arrayFilters.kind,
    district: arrayFilters.district,
    city: arrayFilters.city,
    adjustments: arrayFilters.adjustments,
  };

  if (searchParams.textSearch) {
    filters.textSearch = Array.isArray(searchParams.textSearch)
      ? searchParams.textSearch[0]
      : searchParams.textSearch;
  }

  const contentKey = JSON.stringify({ ...filters, page: currentPage, sort });
  const filtersKey = JSON.stringify(filters);
  return (
    <PetForFreePageContainer>
      <Suspense key={filtersKey} fallback={<LoadingFilters />}>
        <FiltersProvider>
          <Filters />
        </FiltersProvider>
      </Suspense>
      <Suspense key={contentKey} fallback={<Loading />}>
        <PetForFreeContent
          filters={filters}
          currentPage={currentPage}
          sort={sort}
        />
      </Suspense>
    </PetForFreePageContainer>
  );
};

export default PetForFreePage;
