import { FC } from "react";
import { commercialVehicleRepository, CommercialVehicleSearchFilters } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { CommercialVehicleCards } from "../CommercialVehicleCards/CommercialVehicleCards";
import { CommercialVehicleList } from "../CommercialVehicleList/CommercialVehicleList";
import {
  CommercialVehiclesGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import { Box } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";
import CommercialVehiclesHeaderClient from "../CommercialVehiclesHeaderClient/CommercialVehiclesHeaderClient";

interface CommercialVehiclesContentProps {
  filters: CommercialVehicleSearchFilters;
  currentPage: number;
  view: "list" | "grid";
}

const CommercialVehiclesContent: FC<CommercialVehiclesContentProps> = async ({
  filters,
  currentPage,
  view,
}) => {
  const commercialVehiclesResponse = await commercialVehicleRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <CommercialVehiclesHeaderClient totalCount={commercialVehiclesResponse.totalCount} />

      {view === "list" ? (
        <Box mt="25px" width="100%">
          <CommercialVehicleList commercialVehicles={commercialVehiclesResponse.data} />
        </Box>
      ) : (
        <CommercialVehiclesGrid
          mt="25px"
          gap="3"
          columns={{
            initial: "1",
            xs: "2",
            md: "3",
          }}
          width="auto"
        >
          <CommercialVehicleCards commercialVehicles={commercialVehiclesResponse.data} />
        </CommercialVehiclesGrid>
      )}
      <StickyPaginationWrapper>
        <Pagination totalPages={commercialVehiclesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default CommercialVehiclesContent;
