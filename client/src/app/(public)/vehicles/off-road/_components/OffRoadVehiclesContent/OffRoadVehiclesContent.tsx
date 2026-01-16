import { FC } from "react";
import { offRoadVehicleRepository, OffRoadVehicleSearchFilters } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { OffRoadVehicleCards } from "../OffRoadVehicleCards/OffRoadVehicleCards";
import {
  OffRoadVehiclesGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface OffRoadVehiclesContentProps {
  filters: OffRoadVehicleSearchFilters;
  currentPage: number;
}

const OffRoadVehiclesContent: FC<OffRoadVehiclesContentProps> = async ({
  filters,
  currentPage,
}) => {
  const offRoadVehiclesResponse = await offRoadVehicleRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <Title size="5">Внедорожники</Title>

      <Text as="p" size="2" color="gray">
        {offRoadVehiclesResponse.totalCount} результатов найдено
      </Text>

      <OffRoadVehiclesGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <OffRoadVehicleCards offRoadVehicles={offRoadVehiclesResponse.data} />
      </OffRoadVehiclesGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={offRoadVehiclesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default OffRoadVehiclesContent;
