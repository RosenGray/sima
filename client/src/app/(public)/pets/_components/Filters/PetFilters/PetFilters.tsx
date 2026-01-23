"use client";
import { FC, ReactNode, useMemo } from "react";
import { Flex, Heading, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { MixerHorizontalIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useFiltersModal } from "@/components/filters/FiltersContext";
import {
  PetFiltersContainer,
  PetFiltersContent,
  PetFiltersHeader,
  MobileFilterButton,
  FiltersCountBadge,
  PetFiltersNavBar,
  PetsFiltersNavBarList,
  PetFiltersNavBarItem,
} from "./PetFilters.styles";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PetCategory {
  id: string;
  title: string;
  description: string;
  href: string;
}

const petCategories: PetCategory[] = [
  {
    id: "for-sale",
    title: "Продажа",
    description: "Продажа домашних животных",
    href: "/pets/for-sale",
  },
  {
    id: "for-free",
    title: "Отдам бесплатно",
    description: "Отдать домашних животных бесплатно",
    href: "/pets/for-free",
  },
  {
    id: "accessories",
    title: "Аксессуары",
    description: "Аксессуары для домашних животных",
    href: "/pets/accessories",
  },
];

interface PetFiltersProps {
  children: ReactNode;
  activeFiltersCount?: number;
}

const PetFilters: FC<PetFiltersProps> = ({
  children,
  activeFiltersCount = 0,
}) => {
  const { isModalOpen, openModal, closeModal } = useFiltersModal();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to check if a category is active
  const isCategoryActive = useMemo(() => {
    return (category: PetCategory): boolean => {
      return pathname === category.href;
    };
  }, [pathname]);

  return (
    <>
      {/* Desktop View */}
      <PetFiltersContainer $isModalOpen={isModalOpen}>
        <PetFiltersHeader>
          <IconButton
            size="4"
            variant="ghost"
            color="gray"
            onClick={closeModal}
          >
            <CrossCircledIcon width="28" height="28" />
          </IconButton>
          <Heading size="4">Фильтры</Heading>
        </PetFiltersHeader>
        <PetFiltersNavBar>
          <PetsFiltersNavBarList>
            {petCategories.map((category) => (
              <Tooltip content={category.title} key={category.id}>
                <PetFiltersNavBarItem $isActive={isCategoryActive(category)}>
                  <Link href={category.href}>
                    <Text size="2" weight="medium">
                      {category.title}
                    </Text>
                  </Link>
                </PetFiltersNavBarItem>
              </Tooltip>
            ))}
          </PetsFiltersNavBarList>
        </PetFiltersNavBar>
        <PetFiltersContent>{children}</PetFiltersContent>
      </PetFiltersContainer>

      {/* Mobile Filter Button */}
      <MobileFilterButton size="2" variant="soft" onClick={openModal}>
        <Flex align="center" gap="2">
          <MixerHorizontalIcon width="18" height="18" />
          <Text>Фильтры</Text>
          {activeFiltersCount > 0 && (
            <FiltersCountBadge>{activeFiltersCount}</FiltersCountBadge>
          )}
        </Flex>
      </MobileFilterButton>
    </>
  );
};

export default PetFilters;
