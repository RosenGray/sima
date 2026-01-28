"use client";
import { FC, ReactNode } from "react";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { MixerHorizontalIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useFiltersModal } from "@/components/filters/FiltersContext";
import {
  Yad2FiltersContainer,
  Yad2FiltersContent,
  Yad2FiltersHeader,
  MobileFilterButton,
  FiltersCountBadge,
} from "./Yad2FiltersWrapper.styles";

interface Yad2FiltersWrapperProps {
  children: ReactNode;
  activeFiltersCount?: number;
}

const Yad2FiltersWrapper: FC<Yad2FiltersWrapperProps> = ({
  children,
  activeFiltersCount = 0,
}) => {
  const { isModalOpen, openModal, closeModal } = useFiltersModal();

  return (
    <>
      {/* Desktop View */}
      <Yad2FiltersContainer $isModalOpen={isModalOpen}>
        <Yad2FiltersHeader>
          <IconButton
            size="4"
            variant="ghost"
            color="gray"
            onClick={closeModal}
          >
            <CrossCircledIcon width="28" height="28" />
          </IconButton>
          <Heading size="4">Фильтры</Heading>
        </Yad2FiltersHeader>
        <Yad2FiltersContent>{children}</Yad2FiltersContent>
      </Yad2FiltersContainer>

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

export default Yad2FiltersWrapper;