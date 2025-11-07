import { FC } from "react";
import { professionalServiceRepository, ProfessionalServiceSearchFilters } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { ProfessionalServiceCards } from "../ProfessionalServiceCards/ProfessionalServiceCards";
import Pagination from "@/components/Pagination/Pagination";
import {
  ProfessionalsServicesGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";

interface ProfessionalServiceContentProps {
  filters: ProfessionalServiceSearchFilters;
  currentPage: number;
}

const ProfessionalServiceContent: FC<ProfessionalServiceContentProps> = async ({
  filters,
  currentPage,
}) => {
  const professionalServices = await professionalServiceRepository.getAll(
    filters,
    currentPage
  );

  return (
    <>
      <Title size="5">Услуги специалистов</Title>

      <Text as="p" size="2" color="gray">
        {professionalServices.totalCount} результатов найдено
      </Text>

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
    </>
  );
};

export default ProfessionalServiceContent;
