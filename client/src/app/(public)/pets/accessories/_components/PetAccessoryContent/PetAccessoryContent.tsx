import { FC } from "react";
import {
  petAccessoryRepository,
  PetAccessorySearchFilters,
} from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { PetAccessoryCards } from "../PetAccessoryCards/PetAccessoryCards";
import {
  EntityGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface PetAccessoryContentProps {
  filters: PetAccessorySearchFilters;
  currentPage: number;
}

const PetAccessoryContent: FC<PetAccessoryContentProps> = async ({
  filters,
  currentPage,
}) => {
  const accessoriesResponse = await petAccessoryRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <Title size="5">Аксессуары для питомцев</Title>

      <Text as="p" size="2" color="gray">
        {accessoriesResponse.totalCount} результатов найдено
      </Text>

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
