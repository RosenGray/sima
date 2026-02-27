import { FC } from "react";
import {
  motorcycleRepository,
  MotorcycleSearchFilters,
} from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { MotorcycleCards } from "../MotorcycleCards/MotorcycleCards";
import { MotorcycleList } from "../MotorcycleList/MotorcycleList";
import {
  MotorcycleGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import { Box } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";
import MotorcyclesHeaderClient from "../MotorcyclesHeaderClient/MotorcyclesHeaderClient";

interface MotorcyclesContentProps {
  filters: MotorcycleSearchFilters;
  currentPage: number;
  view: "list" | "grid";
}

const MotorcyclesContent: FC<MotorcyclesContentProps> = async ({
  filters,
  currentPage,
  view,
}) => {
  const motorcyclesResponse = await motorcycleRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <MotorcyclesHeaderClient totalCount={motorcyclesResponse.totalCount} />

      {view === "list" ? (
        <Box mt="25px" width="100%">
          <MotorcycleList motorcycles={motorcyclesResponse.data} />
        </Box>
      ) : (
        <MotorcycleGrid
          mt="25px"
          gap="3"
          columns={{
            initial: "1",
            xs: "2",
            md: "3",
          }}
          width="auto"
        >
          <MotorcycleCards motorcycles={motorcyclesResponse.data} />
        </MotorcycleGrid>
      )}
      <StickyPaginationWrapper>
        <Pagination totalPages={motorcyclesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default MotorcyclesContent;
