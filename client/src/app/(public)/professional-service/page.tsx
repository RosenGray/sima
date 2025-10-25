import { FC } from "react";
import {
  ProfessionalsPageContainer,
  ProfessionalsServicesGrid,
  StickyPaginationWrapper,
  Title,
} from "./page.styles";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { ProfessionalServiceCards } from "./_components/ProfessionalServiceCards/ProfessionalServiceCards";
import TextSearch from "@/components/filters/TextSearch/TextSearch";
import Pagination from "@/components/Pagination/Pagination";

interface ProfessionalsPageProps {
  searchParams?: Promise<{
    description?: string;
    categoryId?: string;
    city?: string;
    page?: string;
  }>;
}

const ProfessionalsPage: FC<ProfessionalsPageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const filters = {
    description: searchParams?.description,
    categoryId: searchParams?.categoryId,
    city: searchParams?.city || "",
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
      <Title align="center">Профессиональные услуги</Title>
      <TextSearch placeholder="Search invoices..." />
      <ProfessionalsServicesGrid
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
