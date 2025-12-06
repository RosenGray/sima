"use client";
import { FC, ReactNode, useState } from "react";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  VehicleFiltersContainer,
  VehicleFiltersContent,
  VehicleFiltersHeader,
  MobileFilterButton,
  FiltersCountBadge,
} from "./VehicleFilters.styles";

interface VehicleFiltersProps {
  children: ReactNode;
  activeFiltersCount?: number;
}

const VehicleFilters: FC<VehicleFiltersProps> = ({
  children,
  activeFiltersCount = 0,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Desktop View */}
      <VehicleFiltersContainer $isModalOpen={isModalOpen}>
        <VehicleFiltersHeader>
          <Heading size="4">Фильтры</Heading>
        </VehicleFiltersHeader>
        <VehicleFiltersContent>{children}</VehicleFiltersContent>
      </VehicleFiltersContainer>

      {/* Mobile Filter Button */}
      <MobileFilterButton
        size="2"
        variant="soft"
        onClick={() => setIsModalOpen(true)}
      >
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

export default VehicleFilters;
