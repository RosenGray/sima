import { FC } from "react";
import { othersRepository, OthersSearchFilters } from "@/lib/other/repository/OthersRepository";
import OthersCards from "../OthersCards/OthersCards";
import Pagination from "@/components/Pagination/Pagination";
import { OthersGrid, StickyPaginationWrapper, Title } from "../../page.styles";
import { Text } from "@radix-ui/themes";

interface OthersContentProps {
  filters: OthersSearchFilters;
  currentPage: number;
}

const OthersContent: FC<OthersContentProps> = async ({ filters, currentPage }) => {
  const others = await othersRepository.getAll(filters, currentPage, 10);

  return (
    <>
      <Title size="5">Другое</Title>

      <Text as="p" size="2" color="gray">
        {others.totalCount} результатов найдено
      </Text>

      <OthersGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <OthersCards others={others.data} />
      </OthersGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={others.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default OthersContent;
