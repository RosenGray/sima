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
import DialogPrimitiveButton from "@/components/modals/DialogPrimitiveButton/DialogPrimitiveButton";

interface CarsContentProps {
  filters: CarSearchFilters;
  currentPage: number;
}

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
    <DialogPrimitiveButton title="Сортировать по" showOverlay={false}>
     123
    </DialogPrimitiveButton>
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

{/* <DialogPrimitiveButton title={yearDialogButtonTitle} showOverlay={true}>
<SearchSingleSelect
  placeholder="Год от"
  displayName="год от"
  paramName="yearFrom"
  options={yearsOptions}
  selectedOptions={allSelectedFilterOptions.get("yearFrom")!}
  setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
/>

<SearchSingleSelect
  placeholder="Год до"
  displayName="год до"
  paramName="yearTo"
  options={yearsOptions}
  selectedOptions={allSelectedFilterOptions.get("yearTo")!}
  setAllSelectedFilterOptions={handleSetAllSelectedFilterOptions}
/>
</DialogPrimitiveButton> */}