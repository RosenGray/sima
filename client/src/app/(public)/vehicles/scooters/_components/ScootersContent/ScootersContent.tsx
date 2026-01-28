import { FC } from "react";
import { scooterRepository, ScooterSearchFilters } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { ScooterCards } from "../ScooterCards/ScooterCards";
import {
  ScootersGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface ScootersContentProps {
  filters: ScooterSearchFilters;
  currentPage: number;
}

const ScootersContent: FC<ScootersContentProps> = async ({
  filters,
  currentPage,
}) => {
  const scootersResponse = await scooterRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <Title size="5">Скутеры</Title>

      <Text as="p" size="2" color="gray">
        {scootersResponse.totalCount} результатов найдено
      </Text>

      <ScootersGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <ScooterCards scooters={scootersResponse.data} />
      </ScootersGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={scootersResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default ScootersContent;
