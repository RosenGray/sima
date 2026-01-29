"use client";

import { Heading, Text } from "@radix-ui/themes";
import { PetsPageContainer, PetsGrid } from "./page.styles";
import IconCard from "@/components/IconCard/IconCard";
import ForSaleIcon from "@/components/svg/pets/ForSale/ForSale";
import ForFreeIcon from "@/components/svg/pets/ForFree/ForFree";
import AccessoriesIcon from "@/components/svg/pets/Accessories/Accessories";

interface PetCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const petCategories: PetCategory[] = [
  {
    id: "for-sale",
    title: "Продажа",
    description: "Продажа домашних животных",
    icon: <ForSaleIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/pets/for-sale/create",
  },
  {
    id: "for-free",
    title: "Отдам бесплатно",
    description: "Отдать домашних животных бесплатно",
    icon: <ForFreeIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/pets/for-free/create",
  },
  {
    id: "accessories",
    title: "Аксессуары",
    description: "Аксессуары для домашних животных",
    icon: <AccessoriesIcon viewBox={{ width: 120, height: 120 }} />,
    href: "/publish-ad/pets/accessories/create",
  },
];

const PublishAdPetsPage = () => {
  return (
    <PetsPageContainer size="3">
      <Heading size="8" mb="6" align="center">
        Домашние животные
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
      <PetsGrid
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
        {petCategories.map((category) => (
          <IconCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            description={category.description}
            href={category.href}
          />
        ))}
      </PetsGrid>
    </PetsPageContainer>
  );
};

export default PublishAdPetsPage;
