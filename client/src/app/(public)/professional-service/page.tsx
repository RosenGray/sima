import { FC } from "react";
import {
  ProfessionalsPageContainer,
  ProfessionalsServicesGrid,
  StickyPaginationWrapper,
  Title,
} from "./page.styles";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { ProfessionalServiceCards } from "./_components/ProfessionalServiceCards/ProfessionalServiceCards";
import Pagination from "@/components/Pagination/Pagination";
import Filters from "./_components/Filters/Filters";
import { Suspense } from "react";
import { LoadingFilters } from "./_components/Filters/Filters.styles";
import { Text } from "@radix-ui/themes";

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
  //10 sec fake await
  const professionalServices = await professionalServiceRepository.getAll(
    filters,
    currentPage
  );

  console.log("professionalServices", professionalServices);

  return (
    <ProfessionalsPageContainer>
           <Suspense fallback={<LoadingFilters />}>
        <Filters />
      </Suspense>
      <Title mt="6"  size="5">Услуги специалистов</Title>
 
      <Text as="p" size="2"  color="gray">{professionalServices.totalCount} результатов найдено</Text>
  

      <ProfessionalsServicesGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          // sm: "2",
          md: "3",
        }}
        width="auto"
      >
        <ProfessionalServiceCards
          professionalServices={professionalServices.data}
        />
      </ProfessionalsServicesGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={professionalServices.totalPages} />
      </StickyPaginationWrapper>
    </ProfessionalsPageContainer>
  );
};

export default ProfessionalsPage;
