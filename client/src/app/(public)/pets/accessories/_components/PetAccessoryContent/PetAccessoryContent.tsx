import { FC } from "react";
import {
  petAccessoryRepository,
  PetAccessorySearchFilters,
} from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { PetAccessoryCards } from "../PetAccessoryCards/PetAccessoryCards";
import PetAccessoryHeaderClient from "../PetAccessoryHeaderClient/PetAccessoryHeaderClient";
import { EntityGrid, StickyPaginationWrapper } from "../../page.styles";
import Pagination from "@/components/Pagination/Pagination";
import { SortOption } from "@/components/SortFilters/SortFilters";

interface PetAccessoryContentProps {
  filters: PetAccessorySearchFilters;
  currentPage: number;
  sort?: string;
}

const petAccessorySortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Дата (старые → новые)",
    descLabel: "Дата (новые → старые)",
  },
  {
    field: "price",
    label: "Цена",
    ascLabel: "Цена (низкая → высокая)",
    descLabel: "Цена (высокая → низкая)",
  },
];

const PetAccessoryContent: FC<PetAccessoryContentProps> = async ({
  filters,
  currentPage,
  sort,
}) => {
  const accessoriesResponse = await petAccessoryRepository.getAll(
    filters,
    currentPage,
    10,
    sort
  );

  return (
    <>
      <PetAccessoryHeaderClient
        totalCount={accessoriesResponse.totalCount}
        initialSort={sort}
        sortOptions={petAccessorySortOptions}
      />

      <EntityGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <PetAccessoryCards accessories={accessoriesResponse.data} />
      </EntityGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={accessoriesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default PetAccessoryContent;
