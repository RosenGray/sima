import { FC, Suspense } from "react";
import {
  ProfessionalsPageContainer,
  ProfessionalsServicesGrid,
  Title,
} from "./page.styles";
import Dummy from "@/components/Dummy/Dummy";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { ProfessionalServiceCards } from "./_components/ProfessionalServiceCards/ProfessionalServiceCards";
import Search from "@/components/Serach/Search";

interface ProfessionalsPageProps {
  searchParams?: Promise<{
    categoryId?: string;
    city?: string;
    email?: string;
    page?: string;
  }>;
}

const ProfessionalsPage: FC<ProfessionalsPageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const filters = {
    email: searchParams?.email,
    categoryId: searchParams?.categoryId,
    city: searchParams?.city || "",
    // minPrice: searchParams?.minPrice || '',
    // maxPrice: searchParams?.maxPrice || '',
  };
  const currentPage = Number(searchParams?.page) || 1;
  //10 sec fake await
  const professionalServices = await professionalServiceRepository.getAll(
    filters,
    currentPage
  );

  console.log('professionalServices',professionalServices);

  return (
    <ProfessionalsPageContainer>
      <Title align="center">Профессиональные услуги</Title>
      <Search placeholder="Search invoices..." />
      <ProfessionalsServicesGrid
        gap="3"
        columns={{
          xs: "1",
          sm: "2",
        }}
        width="auto"
      >
        <ProfessionalServiceCards professionalServices={professionalServices.data} />
      </ProfessionalsServicesGrid>
      {/* <Pagination totalPages={totalPages} /> */}
    </ProfessionalsPageContainer>
  );
};

export default ProfessionalsPage;
