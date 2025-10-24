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
  searchParams?: Promise<{ query?: string; page?: string }>;
}

const ProfessionalsPage: FC<ProfessionalsPageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

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
        {/* <Suspense fallback={<div>Loading...</div>}>
          <ProfessionalServiceCards
            key={query + currentPage}
            query={query}
            currentPage={currentPage}
          />
        </Suspense> */}
      </ProfessionalsServicesGrid>
      {/* <Pagination totalPages={totalPages} /> */}
    </ProfessionalsPageContainer>
  );
};

export default ProfessionalsPage;
