import { FC } from "react";
import {
  accessoryRepository,
  AccessorySearchFilters,
} from "@/lib/vehicles/accessories/repository/AccessoryRepository";
import { AccessoryCards } from "../AccessoryCards/AccessoryCards";
import { AccessoryList } from "../AccessoryList/AccessoryList";
import {
  AccessoryGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import { Box } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";
import AccessoryHeaderClient from "../AccessoryHeaderClient/AccessoryHeaderClient";

interface AccessoryContentProps {
  filters: AccessorySearchFilters;
  currentPage: number;
  view: "list" | "grid";
}

const AccessoryContent: FC<AccessoryContentProps> = async ({
  filters,
  currentPage,
  view,
}) => {
  const accessoriesResponse = await accessoryRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <AccessoryHeaderClient totalCount={accessoriesResponse.totalCount} />

      {view === "list" ? (
        <Box mt="25px" width="100%">
          <AccessoryList accessories={accessoriesResponse.data} />
        </Box>
      ) : (
        <AccessoryGrid
          mt="25px"
          gap="3"
          columns={{
            initial: "1",
            xs: "2",
            md: "3",
          }}
          width="auto"
        >
          <AccessoryCards
            accessories={accessoriesResponse.data}
          />
        </AccessoryGrid>
      )}
      <StickyPaginationWrapper>
        <Pagination totalPages={accessoriesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default AccessoryContent;
