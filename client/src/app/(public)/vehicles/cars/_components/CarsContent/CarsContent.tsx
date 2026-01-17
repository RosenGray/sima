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
import SortFilters from "@/components/SortFilters/SortFilters";

interface CarsContentProps {
  filters: CarSearchFilters;
  currentPage: number;
}

const sortFilters = [
  {
    title: "Дата",
    href: "/vehicles/cars?sort=date",
  },
  {
    title: "Цена",
    href: "/vehicles/cars?sort=price",
  },
];

const CarsContent: FC<CarsContentProps> = async ({
  filters,
  currentPage,
}) => {
  const carsResponse = await carRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <Header>
        <Box>
          <Title size="5">Автомобили</Title>
          <Text as="p" size="2" color="gray">
            {carsResponse.totalCount} результатов найдено
          </Text>
        </Box>
        <DialogPrimitiveOnMobileStickyButton buttonVariant="ghost" titleIsVisible={false} title="date" subtitle="Сортировка по" subtitleIsVisible={true} showOverlay={true}>
          <SortFilters items={sortFilters} />
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
