import { FC } from "react";
import {
  petForFreeRepository,
  PetForFreeSearchFilters,
} from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { PetForFreeCards } from "../PetForFreeCards/PetForFreeCards";
import {
  PetForFreeGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface PetForFreeContentProps {
  filters: PetForFreeSearchFilters;
  currentPage: number;
  sort?: string;
}

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
      <Title size="5">Питомцы отдают бесплатно</Title>

      <Text as="p" size="2" color="gray">
        {petsResponse.totalCount} результатов найдено
      </Text>

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
