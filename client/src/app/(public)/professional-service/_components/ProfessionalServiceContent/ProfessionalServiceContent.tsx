import { FC } from "react";
import { professionalServiceRepository, ProfessionalServiceSearchFilters } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { ProfessionalServiceCards } from "../ProfessionalServiceCards/ProfessionalServiceCards";
import { ProfessionalServiceList } from "../ProfessionalServiceList/ProfessionalServiceList";
import Pagination from "@/components/Pagination/Pagination";
import {
  ProfessionalsServicesGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import { SortOption } from "@/components/SortFilters/SortFilters";
import ProfessionalServiceHeaderClient from "../ProfessionalServiceHeaderClient/ProfessionalServiceHeaderClient";
import { Box } from "@radix-ui/themes";

interface ProfessionalServiceContentProps {
  filters: ProfessionalServiceSearchFilters;
  currentPage: number;
  sort?: string;
  view: "list" | "grid";
}

const professionalServiceSortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Старые → новые",
    descLabel: "Новые → старые",
  },
];

const ProfessionalServiceContent: FC<ProfessionalServiceContentProps> = async ({
  filters,
  currentPage,
  sort,
  view,
}) => {
  const professionalServices = await professionalServiceRepository.getAll(
    filters,
    currentPage,
    10,
    sort
  );
  return (
    <>
      <ProfessionalServiceHeaderClient
        totalCount={professionalServices.totalCount}
        initialSort={sort}
        sortOptions={professionalServiceSortOptions}
      />

      {view === "list" ? (
        <Box mt="25px" width="100%">
          <ProfessionalServiceList professionalServices={professionalServices.data} />
        </Box>
      ) : (
        <ProfessionalsServicesGrid
          mt="25px"
          gap="3"
          columns={{
            initial: "1",
            xs: "2",
            md: "3",
          }}
          width="auto"
        >
          <ProfessionalServiceCards
            professionalServices={professionalServices.data}
          />
        </ProfessionalsServicesGrid>
      )}
      <StickyPaginationWrapper>
        <Pagination totalPages={professionalServices.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default ProfessionalServiceContent;
