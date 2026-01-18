import { FC } from "react";
import { carRepository, CarSearchFilters } from "@/lib/vehicles/cars/repository/CarRepository";
import { CarCards } from "../CarCards/CarCards";
import {
  CarsGrid,
  Header,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Box, Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";
import DialogPrimitiveOnMobileStickyButton from "@/components/modals/DialogPrimitiveOnMobileStickyButton/DialogPrimitiveOnMobileStickyButton";
import SortFilters, { SortOption } from "@/components/SortFilters/SortFilters";

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
      <Header>
        <Box>
          <Title size="5">Автомобили</Title>
          <Text as="p" size="2" color="gray">
            {carsResponse.totalCount} результатов найдено
          </Text>
        </Box>
        <DialogPrimitiveOnMobileStickyButton buttonVariant="ghost" titleIsVisible={false} title="daגte" subtitle="Сортировка по" subtitleIsVisible={true} showOverlay={false}>
          <SortFilters currentSort={sort} sortOptions={carSortOptions} />
          </DialogPrimitiveOnMobileStickyButton>
      </Header>

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
