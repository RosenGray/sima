import { FC } from "react";
import { commercialVehicleRepository, CommercialVehicleSearchFilters } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { CommercialVehicleCards } from "../CommercialVehicleCards/CommercialVehicleCards";
import {
  CommercialVehiclesGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface CommercialVehiclesContentProps {
  filters: CommercialVehicleSearchFilters;
  currentPage: number;
}

const CommercialVehiclesContent: FC<CommercialVehiclesContentProps> = async ({
  filters,
  currentPage,
}) => {
  const commercialVehiclesResponse = await commercialVehicleRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <Title size="5">Коммерческий транспорт</Title>

      <Text as="p" size="2" color="gray">
        {commercialVehiclesResponse.totalCount} результатов найдено
      </Text>

      <CommercialVehiclesGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <CommercialVehicleCards commercialVehicles={commercialVehiclesResponse.data} />
      </CommercialVehiclesGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={commercialVehiclesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default CommercialVehiclesContent;
