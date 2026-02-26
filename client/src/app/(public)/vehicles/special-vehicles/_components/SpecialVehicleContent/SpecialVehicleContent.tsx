import { FC } from "react";
import {
  specialVehicleRepository,
  SpecialVehicleSearchFilters,
} from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";
import { SpecialVehicleCards } from "../SpecialVehicleCards/SpecialVehicleCards";
import { SpecialVehicleList } from "../SpecialVehicleList/SpecialVehicleList";
import {
  SpecialVehicleGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import { Box } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";
import SpecialVehicleHeaderClient from "../SpecialVehicleHeaderClient/SpecialVehicleHeaderClient";

interface SpecialVehicleContentProps {
  filters: SpecialVehicleSearchFilters;
  currentPage: number;
  view: "list" | "grid";
}

const SpecialVehicleContent: FC<SpecialVehicleContentProps> = async ({
  filters,
  currentPage,
  view,
}) => {
  const specialVehiclesResponse = await specialVehicleRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <SpecialVehicleHeaderClient totalCount={specialVehiclesResponse.totalCount} />

      {view === "list" ? (
        <Box mt="25px" width="100%">
          <SpecialVehicleList specialVehicles={specialVehiclesResponse.data} />
        </Box>
      ) : (
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
      )}
      <StickyPaginationWrapper>
        <Pagination totalPages={specialVehiclesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default SpecialVehicleContent;
