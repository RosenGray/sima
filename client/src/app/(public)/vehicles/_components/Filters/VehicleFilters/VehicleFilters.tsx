"use client";
import { FC, ReactNode, useState } from "react";
import { Dialog, Flex, Heading, IconButton, Text, Button } from "@radix-ui/themes";
import { Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  VehicleFiltersContainer,
  VehicleFiltersContent,
  VehicleFiltersHeader,
  MobileFiltersModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  MobileFilterButton,
  ModalFiltersSection,
} from "./VehicleFilters.styles";
import { useFiltersModal } from "@/components/filters/FiltersContext";

interface VehicleFiltersProps {
  children: ReactNode;
  activeFiltersCount?: number;
  onMobileSubmit?: () => void;
  onMobileClear?: () => void;
  isSearchButtonDisabled?: boolean;
}

const VehicleFilters: FC<VehicleFiltersProps> = ({
  children,
  activeFiltersCount = 0,
  onMobileSubmit,
  onMobileClear,
  isSearchButtonDisabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log(isModalOpen);

  // const { isModalOpen, openModal, closeModal } = useFiltersModal();

  // const handleMobileSubmit = () => {
  //   if (onMobileSubmit) {
  //     onMobileSubmit();
  //   }
  //   closeModal();
  // };

  // const handleMobileClear = () => {
  //   if (onMobileClear) {
  //     onMobileClear();
  //   }
  // };

  return (
    <>
      {/* Desktop View */}
      <VehicleFiltersContainer $isModalOpen={isModalOpen}>
        <VehicleFiltersHeader>
          <Heading size="4">Фильтры</Heading>
        </VehicleFiltersHeader>
        <VehicleFiltersContent>
          {children}
        </VehicleFiltersContent>
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
            <Flex
              align="center"
              justify="center"
              style={{
                minWidth: "20px",
                height: "20px",
                borderRadius: "var(--radius-full)",
                background: "var(--accent-9)",
                color: "var(--accent-1)",
                fontSize: "11px",
                fontWeight: "600",
                padding: "0 6px",
              }}
            >
              {activeFiltersCount}
            </Flex>
          )}
        </Flex>
      </MobileFilterButton>

      {/* Mobile Modal */}

    </>
  );
};

export default VehicleFilters;
