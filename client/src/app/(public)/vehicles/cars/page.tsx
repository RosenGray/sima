import { FC } from "react";
import { CarsPageContainer, CarsGrid } from "./page.styles";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { CarCards } from "./_components/CarCards/CarCards";
import { Heading, Text } from "@radix-ui/themes";
import Filters from "../_components/Filters/Filters";
import VehicleFilters from "../_components/Filters/VehicleFilters/VehicleFilters";

interface CarsPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

const CarsPage: FC<CarsPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  const currentPage = Number(searchParams?.page) || 1;

  const carsResponse = await carRepository.getAll(currentPage, 10);
  console.log('carsResponse',carsResponse)

  return (
    <CarsPageContainer>
     <VehicleFilters>123</VehicleFilters>
      <Heading size="5">Автомобили</Heading>

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
    </CarsPageContainer>
  );
};

export default CarsPage;