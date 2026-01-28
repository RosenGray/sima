import { FC } from "react";
import {
  specialVehicleRepository,
  SpecialVehicleSearchFilters,
} from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";
import { SpecialVehicleCards } from "../SpecialVehicleCards/SpecialVehicleCards";
import {
  SpecialVehicleGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface SpecialVehicleContentProps {
  filters: SpecialVehicleSearchFilters;
  currentPage: number;
}

const SpecialVehicleContent: FC<SpecialVehicleContentProps> = async ({
  filters,
  currentPage,
}) => {
  const specialVehiclesResponse = await specialVehicleRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <Title size="5">Специальные транспортные средства</Title>

      <Text as="p" size="2" color="gray">
        {specialVehiclesResponse.totalCount} результатов найдено
      </Text>

      <SpecialVehicleGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <SpecialVehicleCards
          specialVehicles={specialVehiclesResponse.data}
        />
      </SpecialVehicleGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={specialVehiclesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default SpecialVehicleContent;
