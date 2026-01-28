import { FC } from "react";
import {
  realEstateForRentRepository,
  RealEstateForRentSearchFilters,
} from "@/lib/real-estate/for-rent/repository/RealEstateForRentRepository";
import { RealEstateForRentCards } from "../RealEstateForRentCards/RealEstateForRentCards";
import {
  RealEstateForRentGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface RealEstateForRentContentProps {
  filters: RealEstateForRentSearchFilters;
  currentPage: number;
}

const RealEstateForRentContent: FC<RealEstateForRentContentProps> = async ({
  filters,
  currentPage,
}) => {
  const realEstatesResponse = await realEstateForRentRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <Title size="5">Недвижимость в аренду</Title>

      <Text as="p" size="2" color="gray">
        {realEstatesResponse.totalCount} результатов найдено
      </Text>

      <RealEstateForRentGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <RealEstateForRentCards realEstates={realEstatesResponse.data} />
      </RealEstateForRentGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={realEstatesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default RealEstateForRentContent;
