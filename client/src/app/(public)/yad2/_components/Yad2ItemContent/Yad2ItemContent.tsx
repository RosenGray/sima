import { FC } from "react";
import {
  yad2ItemRepository,
  Yad2ItemSearchFilters,
} from "@/lib/yad2/repository/Yad2ItemRepository";
import { Yad2ItemCards } from "../Yad2ItemCards/Yad2ItemCards";
import {
  Yad2ItemGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface Yad2ItemContentProps {
  filters: Yad2ItemSearchFilters;
  currentPage: number;
}

const Yad2ItemContent: FC<Yad2ItemContentProps> = async ({
  filters,
  currentPage,
}) => {
  const yad2ItemsResponse = await yad2ItemRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <Title size="5">Б/у товары</Title>

      <Text as="p" size="2" color="gray">
        {yad2ItemsResponse.totalCount} результатов найдено
      </Text>

      <Yad2ItemGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <Yad2ItemCards yad2Items={yad2ItemsResponse.data} />
      </Yad2ItemGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={yad2ItemsResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default Yad2ItemContent;
