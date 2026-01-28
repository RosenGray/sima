import { FC } from "react";
import {
  commercialRealEstateRepository,
  CommercialRealEstateSearchFilters,
} from "@/lib/real-estate/commercial-real-estate/repository/CommercialRealEstateRepository";
import { CommercialRealEstateCards } from "../CommercialRealEstateCards/CommercialRealEstateCards";
import {
  CommercialRealEstateGrid,
  StickyPaginationWrapper,
  Title,
} from "../../page.styles";
import { Text } from "@radix-ui/themes";
import Pagination from "@/components/Pagination/Pagination";

interface CommercialRealEstateContentProps {
  filters: CommercialRealEstateSearchFilters;
  currentPage: number;
}

const CommercialRealEstateContent: FC<CommercialRealEstateContentProps> =
  async ({ filters, currentPage }) => {
    const commercialRealEstatesResponse =
      await commercialRealEstateRepository.getAll(filters, currentPage, 10);

    return (
      <>
        <Title size="5">Коммерческая недвижимость</Title>

        <Text as="p" size="2" color="gray">
          {commercialRealEstatesResponse.totalCount} результатов найдено
        </Text>

        <CommercialRealEstateGrid
          mt="25px"
          gap="3"
          columns={{
            initial: "1",
            xs: "2",
            md: "3",
          }}
          width="auto"
        >
          <CommercialRealEstateCards
            commercialRealEstates={commercialRealEstatesResponse.data}
          />
        </CommercialRealEstateGrid>
        <StickyPaginationWrapper>
          <Pagination
            totalPages={commercialRealEstatesResponse.totalPages}
          />
        </StickyPaginationWrapper>
      </>
    );
  };

export default CommercialRealEstateContent;
