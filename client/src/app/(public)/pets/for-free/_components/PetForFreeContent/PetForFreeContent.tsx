import { FC } from "react";
import {
  petForFreeRepository,
  PetForFreeSearchFilters,
} from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { PetForFreeCards } from "../PetForFreeCards/PetForFreeCards";
import {
  PetForFreeGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import Pagination from "@/components/Pagination/Pagination";
import PetForFreeHeaderClient from "../PetForFreeHeaderClient/PetForFreeHeaderClient";
import { SortOption } from "@/components/SortFilters/SortFilters";

interface PetForFreeContentProps {
  filters: PetForFreeSearchFilters;
  currentPage: number;
  sort?: string;
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
      <StickyPaginationWrapper>
        <Pagination totalPages={petsResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default PetForFreeContent;
