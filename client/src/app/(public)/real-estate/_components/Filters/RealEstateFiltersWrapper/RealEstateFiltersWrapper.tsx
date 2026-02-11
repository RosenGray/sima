"use client";
import { FC, ReactNode, useMemo } from "react";
import { Flex, Heading, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { MixerHorizontalIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useFiltersModal } from "@/components/filters/FiltersContext";
import {
  RealEstateFiltersContainer,
  RealEstateFiltersContent,
  RealEstateFiltersHeader,
  MobileFilterButton,
  FiltersCountBadge,
  RealEstateFiltersNavBar,
  RealEstateFiltersNavBarList,
  RealEstateFiltersNavBarItem,
} from "./RealEstateFiltersWrapper.styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RealEstateCategory {
  id: string;
  title: string;
  description: string;
  href: string;
}

const realEstateCategories: RealEstateCategory[] = [
  {
    id: "for-sale",
    title: "Продажа",
    description: "Продажа недвижимости",
    href: "/real-estate/for-sale",
  },
  {
    id: "for-rent",
    title: "Аренда",
    description: "Сдать недвижимость в аренду",
    href: "/real-estate/for-rent",
  },
  {
    id: "commercial-real-estate",
    title: "Коммерческая недвижимость",
    description: "Коммерческая недвижимость для бизнеса",
    href: "/real-estate/commercial-real-estate",
  },
];

interface RealEstateFiltersWrapperProps {
  children: ReactNode;
  activeFiltersCount?: number;
}

const RealEstateFiltersWrapper: FC<RealEstateFiltersWrapperProps> = ({
  children,
  activeFiltersCount = 0,
}) => {
  const { isModalOpen, openModal, closeModal } = useFiltersModal();
  const pathname = usePathname();

  const isCategoryActive = useMemo(() => {
    return (category: RealEstateCategory): boolean => {
      return pathname === category.href;
    };
  }, [pathname]);

  return (
    <>
      {/* Desktop View */}
      <RealEstateFiltersContainer $isModalOpen={isModalOpen}>
        <RealEstateFiltersHeader>
          <IconButton
            size="4"
            variant="ghost"
            color="gray"
            onClick={closeModal}
          >
            <CrossCircledIcon width="28" height="28" />
          </IconButton>
          <Heading size="4">Фильтры</Heading>
        </RealEstateFiltersHeader>
        <RealEstateFiltersNavBar>
          <RealEstateFiltersNavBarList>
            {realEstateCategories.map((category) => (
              <Tooltip content={category.title} key={category.id}>
                <RealEstateFiltersNavBarItem
                  $isActive={isCategoryActive(category)}
                >
                  <Link href={category.href}>
                    <Text size="2" weight="medium">
                      {category.title}
                    </Text>
                  </Link>
                </RealEstateFiltersNavBarItem>
              </Tooltip>
            ))}
          </RealEstateFiltersNavBarList>
        </RealEstateFiltersNavBar>
        <RealEstateFiltersContent>{children}</RealEstateFiltersContent>
      </RealEstateFiltersContainer>

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

export default RealEstateFiltersWrapper;
