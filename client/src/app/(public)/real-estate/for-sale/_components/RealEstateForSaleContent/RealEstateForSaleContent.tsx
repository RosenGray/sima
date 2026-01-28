import { FC } from "react";
import {
  realEstateForSaleRepository,
  RealEstateForSaleSearchFilters,
} from "@/lib/real-estate/for-sale/repository/RealEstateForSaleRepository";
import { RealEstateForSaleCards } from "../RealEstateForSaleCards/RealEstateForSaleCards";
import {
  RealEstateForSaleGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface RealEstateForSaleContentProps {
  filters: RealEstateForSaleSearchFilters;
  currentPage: number;
}

const RealEstateForSaleContent: FC<RealEstateForSaleContentProps> = async ({
  filters,
  currentPage,
}) => {
  const realEstatesResponse = await realEstateForSaleRepository.getAll(
    filters,
    currentPage,
    10
  );

  return (
    <>
      <Title size="5">Недвижимость на продажу</Title>

      <Text as="p" size="2" color="gray">
        {realEstatesResponse.totalCount} результатов найдено
      </Text>

      <RealEstateForSaleGrid
        mt="25px"
        gap="3"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        width="auto"
      >
        <RealEstateForSaleCards realEstates={realEstatesResponse.data} />
      </RealEstateForSaleGrid>
      <StickyPaginationWrapper>
        <Pagination totalPages={realEstatesResponse.totalPages} />
      </StickyPaginationWrapper>
    </>
  );
};

export default RealEstateForSaleContent;
