"use client";
import { FC, ReactNode } from "react";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { MixerHorizontalIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useFiltersModal } from "@/components/filters/FiltersContext";
import {
  RealEstateFiltersContainer,
  RealEstateFiltersContent,
  RealEstateFiltersHeader,
  MobileFilterButton,
  FiltersCountBadge,
} from "./RealEstateFiltersWrapper.styles";

interface RealEstateFiltersWrapperProps {
  children: ReactNode;
  activeFiltersCount?: number;
}

const RealEstateFiltersWrapper: FC<RealEstateFiltersWrapperProps> = ({
  children,
  activeFiltersCount = 0,
}) => {
  const { isModalOpen, openModal, closeModal } = useFiltersModal();

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
