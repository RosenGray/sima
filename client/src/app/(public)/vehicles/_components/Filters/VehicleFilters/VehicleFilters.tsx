"use client";
import { FC, ReactNode } from "react";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { MixerHorizontalIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useFiltersModal } from "@/components/filters/FiltersContext";
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
  const { isModalOpen, openModal, closeModal } = useFiltersModal();

  return (
    <>
      {/* Desktop View */}
      <VehicleFiltersContainer $isModalOpen={isModalOpen}>
        <VehicleFiltersHeader>
          <IconButton
            size="4"
            variant="ghost"
            color="gray"
            onClick={closeModal}
          >
            <CrossCircledIcon width="28" height="28" />
          </IconButton>
          <Heading size="4">Фильтры</Heading>
        </VehicleFiltersHeader>
        <div style={{ height: "50px", border: "1px solid blue" }}>
          navarplaceholder
        </div>
        <VehicleFiltersContent>{children}</VehicleFiltersContent>
      </VehicleFiltersContainer>

      {/* Mobile Filter Button */}
      <MobileFilterButton
        size="2"
        variant="soft"
        onClick={openModal}
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
