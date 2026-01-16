import { FC } from "react";
import {
  motorcycleRepository,
  MotorcycleSearchFilters,
} from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { MotorcycleCards } from "../MotorcycleCards/MotorcycleCards";
import {
  MotorcycleGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface MotorcyclesContentProps {
  filters: MotorcycleSearchFilters;
  currentPage: number;
}

const MotorcyclesContent: FC<MotorcyclesContentProps> = async ({
  filters,
  currentPage,
}) => {
  const motorcyclesResponse = await motorcycleRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <Title size="5">Мотоциклы</Title>

      <Text as="p" size="2" color="gray">
        {motorcyclesResponse.totalCount} результатов найдено
      </Text>

      <MotorcycleGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <MotorcycleCards motorcycles={motorcyclesResponse.data} />
      </MotorcycleGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={motorcyclesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default MotorcyclesContent;
