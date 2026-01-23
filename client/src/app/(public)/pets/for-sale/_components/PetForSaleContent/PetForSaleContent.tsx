import { FC } from "react";
import {
  petForSaleRepository,
  PetForSaleSearchFilters,
} from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { PetForSaleCards } from "../PetForSaleCards/PetForSaleCards";
import {
  PetForSaleGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface PetForSaleContentProps {
  filters: PetForSaleSearchFilters;
  currentPage: number;
  sort?: string;
}

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
      <Title size="5">Питомцы на продажу</Title>

      <Text as="p" size="2" color="gray">
        {petsResponse.totalCount} результатов найдено
      </Text>

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
