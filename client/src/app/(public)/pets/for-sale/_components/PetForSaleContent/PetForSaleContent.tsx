import { FC } from "react";
import {
  petForSaleRepository,
  PetForSaleSearchFilters,
} from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { PetForSaleCards } from "../PetForSaleCards/PetForSaleCards";
import {
  PetForSaleGrid,
  StickyPaginationWrapper,
} from "../../page.styles";
import Pagination from "@/components/Pagination/Pagination";
import PetForSaleHeaderClient from "../PetForSaleHeaderClient/PetForSaleHeaderClient";
import { SortOption } from "@/components/SortFilters/SortFilters";

interface PetForSaleContentProps {
  filters: PetForSaleSearchFilters;
  currentPage: number;
  sort?: string;
}

const petForSaleSortOptions: SortOption[] = [
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

const PetForSaleContent: FC<PetForSaleContentProps> = async ({
  filters,
  currentPage,
  sort,
}) => {
  const petsResponse = await petForSaleRepository.getAll(
    filters,
    currentPage,
    10,
    sort
  );

  return (
    <>
      <PetForSaleHeaderClient
        totalCount={petsResponse.totalCount}
        initialSort={sort}
        sortOptions={petForSaleSortOptions}
      />

      <PetForSaleGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <PetForSaleCards pets={petsResponse.data} />
      </PetForSaleGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={petsResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default PetForSaleContent;
