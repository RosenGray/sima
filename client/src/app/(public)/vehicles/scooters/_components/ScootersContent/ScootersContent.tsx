import { FC } from "react";
import { scooterRepository, ScooterSearchFilters } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { ScooterCards } from "../ScooterCards/ScooterCards";
import { ScooterList } from "../ScooterList/ScooterList";
import {
  ScootersGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import { Box } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";
import ScootersHeaderClient from "../ScootersHeaderClient/ScootersHeaderClient";

interface ScootersContentProps {
  filters: ScooterSearchFilters;
  currentPage: number;
  view: "list" | "grid";
}

const ScootersContent: FC<ScootersContentProps> = async ({
  filters,
  currentPage,
  view,
}) => {
  const scootersResponse = await scooterRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <ScootersHeaderClient totalCount={scootersResponse.totalCount} />

      {view === "list" ? (
        <Box mt="25px" width="100%">
          <ScooterList scooters={scootersResponse.data} />
        </Box>
      ) : (
        <ScootersGrid
          mt="25px"
          gap="3"
          columns={{
            initial: "1",
            xs: "2",
            md: "3",
          }}
          width="auto"
        >
          <ScooterCards scooters={scootersResponse.data} />
        </ScootersGrid>
      )}
      <StickyPaginationWrapper>
        <Pagination totalPages={scootersResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default ScootersContent;
