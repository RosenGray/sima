import { FC } from "react";
import {
  petForFreeRepository,
  PetForFreeSearchFilters,
} from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { PetForFreeCards } from "../PetForFreeCards/PetForFreeCards";
import { PetForFreeList } from "../PetForFreeList/PetForFreeList";
import {
  PetForFreeGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import Pagination from "@/components/Pagination/Pagination";
import PetForFreeHeaderClient from "../PetForFreeHeaderClient/PetForFreeHeaderClient";
import { SortOption } from "@/components/SortFilters/SortFilters";
import { Box } from "@radix-ui/themes";

interface PetForFreeContentProps {
  filters: PetForFreeSearchFilters;
  currentPage: number;
  sort?: string;
  view: "list" | "grid";
}

const petForFreeSortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Дата (старые → новые)",
    descLabel: "Дата (новые → старые)",
  },
];

const PetForFreeContent: FC<PetForFreeContentProps> = async ({
  filters,
  currentPage,
  sort,
  view,
}) => {
  const petsResponse = await petForFreeRepository.getAll(
    filters,
    currentPage,
    10,
    sort
  );

  return (
    <>
      <PetForFreeHeaderClient
        totalCount={petsResponse.totalCount}
        initialSort={sort}
        sortOptions={petForFreeSortOptions}
      />

      {view === "list" ? (
        <Box mt="25px" width="100%">
          <PetForFreeList pets={petsResponse.data} />
        </Box>
      ) : (
        <PetForFreeGrid
          mt="25px"
          gap="3"
          columns={{
            initial: "1",
            xs: "2",
            md: "3",
          }}
          width="auto"
        >
          <PetForFreeCards pets={petsResponse.data} />
        </PetForFreeGrid>
      )}
      <StickyPaginationWrapper>
        <Pagination totalPages={petsResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default PetForFreeContent;
