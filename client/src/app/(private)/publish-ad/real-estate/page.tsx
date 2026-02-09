"use client";

import { Heading, Text } from "@radix-ui/themes";
import { RealEstatePageContainer, RealEstateGrid } from "./page.styles";
import IconCard from "@/components/IconCard/IconCard";
import CommercialRealEstateIcon from "@/components/svg/realestate/CommercialRealEstate/CommercialRealEstate";
import HouseForRentIcon from "@/components/svg/realestate/HouseForRent/HouseForRent";
import HouseForSaleIcon from "@/components/svg/realestate/HouseForSale/HouseForSale";

interface RealEstateCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const realEstateCategories: RealEstateCategory[] = [
  {
    id: "commercial-real-estate",
    title: "Коммерческая недвижимость",
    description: "Коммерческая недвижимость для бизнеса",
    icon: <CommercialRealEstateIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/real-estate/commercial-real-estate/create",
  },
  {
    id: "for-rent",
    title: "Аренда",
    description: "Сдать недвижимость в аренду",
    icon: <HouseForRentIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/real-estate/for-rent/create",
  },
  {
    id: "for-sale",
    title: "Продажа",
    description: "Продажа недвижимости",
    icon: <HouseForSaleIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/real-estate/for-sale/create",
  },
];

const PublishAdRealEstatePage = () => {
  return (
    <RealEstatePageContainer size="3">
      <Heading size="8" mb="6" align="center">
        Недвижимость
      </Heading>
      <Text
        size="4"
        style={{ display: "block" }}
        color="gray"
        mb="10px"
        align="center"
        as="p"
      >
        Выберите категорию объявления
      </Text>
      <RealEstateGrid
        width="100%"
        columns={{
          initial: "1",
          xs: "2",
          md: "3",
        }}
        gap={{
          initial: "4",
          md: "5",
          lg: "6",
        }}
      >
        {realEstateCategories.map((category) => (
          <IconCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            description={category.description}
            href={category.href}
          />
        ))}
      </RealEstateGrid>
    </RealEstatePageContainer>
  );
};

export default PublishAdRealEstatePage;
