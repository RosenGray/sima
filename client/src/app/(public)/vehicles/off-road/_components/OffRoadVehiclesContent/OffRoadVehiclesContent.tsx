import { FC } from "react";
import { offRoadVehicleRepository, OffRoadVehicleSearchFilters } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { OffRoadVehicleCards } from "../OffRoadVehicleCards/OffRoadVehicleCards";
import { OffRoadVehicleList } from "../OffRoadVehicleList/OffRoadVehicleList";
import {
  OffRoadVehiclesGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import { Box } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";
import OffRoadVehiclesHeaderClient from "../OffRoadVehiclesHeaderClient/OffRoadVehiclesHeaderClient";

interface OffRoadVehiclesContentProps {
  filters: OffRoadVehicleSearchFilters;
  currentPage: number;
  view: "list" | "grid";
}

const OffRoadVehiclesContent: FC<OffRoadVehiclesContentProps> = async ({
  filters,
  currentPage,
  view,
}) => {
  const offRoadVehiclesResponse = await offRoadVehicleRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <OffRoadVehiclesHeaderClient totalCount={offRoadVehiclesResponse.totalCount} />

      {view === "list" ? (
        <Box mt="25px" width="100%">
          <OffRoadVehicleList offRoadVehicles={offRoadVehiclesResponse.data} />
        </Box>
      ) : (
        <OffRoadVehiclesGrid
          mt="25px"
          gap="3"
          columns={{
            initial: "1",
            xs: "2",
            md: "3",
          }}
          width="auto"
        >
          <OffRoadVehicleCards offRoadVehicles={offRoadVehiclesResponse.data} />
        </OffRoadVehiclesGrid>
      )}
      <StickyPaginationWrapper>
        <Pagination totalPages={offRoadVehiclesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default OffRoadVehiclesContent;
