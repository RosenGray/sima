import { FC } from "react";
import { carRepository, CarSearchFilters } from "@/lib/vehicles/cars/repository/CarRepository";
import { CarCards } from "../CarCards/CarCards";
import {
  CarsGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import Pagination from "@/components/Pagination/Pagination";
import { SortOption } from "@/components/SortFilters/SortFilters";
import CarsHeaderClient from "../CarsHeaderClient/CarsHeaderClient";

interface CarsContentProps {
  filters: CarSearchFilters;
  currentPage: number;
  sort?: string;
}

const carSortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Дата",
    // descLabel: "Дата (новые → старые)",
  },
  {
    field: "year",
    label: "Год",
    ascLabel: "Год (младшие → старшие)",
    // descLabel: "Год (старшие → младшие)",
  },
  {
    field: "price",
    label: "Цена",
    ascLabel: "Цена (низкая → высокая)",
    descLabel: "Цена (высокая → низкая)",
  },
  {
    field: "mileage",
    label: "Пробег",
    ascLabel: "Пробег (низкий → высокий)",
    // descLabel: "Пробег (высокий → низкий)",
  },
];

const CarsContent: FC<CarsContentProps> = async ({
  filters,
  currentPage,
  sort,
}) => {
  const carsResponse = await carRepository.getAll(filters, currentPage, 10, sort);

  return (
    <>
      <CarsHeaderClient
        totalCount={carsResponse.totalCount}
        initialSort={sort}
        sortOptions={carSortOptions}
      />

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
