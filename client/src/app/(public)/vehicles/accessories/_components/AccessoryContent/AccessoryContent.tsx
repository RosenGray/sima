import { FC } from "react";
import {
  accessoryRepository,
  AccessorySearchFilters,
} from "@/lib/vehicles/accessories/repository/AccessoryRepository";
import { AccessoryCards } from "../AccessoryCards/AccessoryCards";
import {
  AccessoryGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface AccessoryContentProps {
  filters: AccessorySearchFilters;
  currentPage: number;
}

const AccessoryContent: FC<AccessoryContentProps> = async ({
  filters,
  currentPage,
}) => {
  const accessoriesResponse = await accessoryRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <Title size="5">Аксессуары и звук</Title>

      <Text as="p" size="2" color="gray">
        {accessoriesResponse.totalCount} результатов найдено
      </Text>

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
      <StickyPaginationWrapper>
        <Pagination totalPages={accessoriesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default AccessoryContent;
