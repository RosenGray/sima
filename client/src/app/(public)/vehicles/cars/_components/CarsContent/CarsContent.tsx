import { FC } from "react";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { CarCards } from "../CarCards/CarCards";
import {
  CarsGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

// Placeholder type for filters - will be replaced when filters are implemented
interface CarSearchFilters {
  // Filters will be added here later
}

interface CarsContentProps {
  filters: CarSearchFilters;
  currentPage: number;
}

const CarsContent: FC<CarsContentProps> = async ({
  filters,
  currentPage,
}) => {
  //fake await 10 sec
  // For now, getAll doesn't accept filters - will be updated when filters are implemented
  const carsResponse = await carRepository.getAll(currentPage, 10);

  return (
    <>
      <Title size="5">Автомобили</Title>

      <Text as="p" size="2" color="gray">
        {carsResponse.totalCount} результатов найдено
      </Text>

      <CarsGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <CarCards cars={carsResponse.data} />
      </CarsGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={carsResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default CarsContent;

