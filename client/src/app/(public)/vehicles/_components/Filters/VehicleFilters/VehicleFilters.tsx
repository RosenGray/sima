"use client";
import { FC, ReactNode } from "react";
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
  const { isModalOpen, openModal, closeModal } = useFiltersModal();

  const handleMobileSubmit = () => {
    if (onMobileSubmit) {
      onMobileSubmit();
    }
    closeModal();
  };

  const handleMobileClear = () => {
    if (onMobileClear) {
      onMobileClear();
    }
  };

  return (
    <>
      {/* Desktop View */}
      <VehicleFiltersContainer>
        <VehicleFiltersHeader>
          <Heading size="4">Фильтры</Heading>
        </VehicleFiltersHeader>
        <VehicleFiltersContent>{children}</VehicleFiltersContent>
      </VehicleFiltersContainer>

      {/* Mobile Filter Button */}
      <MobileFilterButton
        size={{
          initial: "2",
          xs: "3",
        }}
        variant="soft"
        onClick={openModal}
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
      <Dialog.Root open={isModalOpen} onOpenChange={closeModal}>
        <MobileFiltersModal>
          <ModalHeader>
            <Flex direction="column" gap="1">
              <Heading
                size={{
                  initial: "4",
                  xs: "5",
                }}
              >
                Фильтры
              </Heading>
              {activeFiltersCount > 0 && (
                <Text size="2" color="gray">
                  {activeFiltersCount}{" "}
                  {activeFiltersCount === 1
                    ? "фильтр"
                    : activeFiltersCount < 5
                    ? "фильтра"
                    : "фильтров"}{" "}
                  применено
                </Text>
              )}
            </Flex>
            <IconButton
              variant="ghost"
              color="gray"
              onClick={closeModal}
              size={{
                initial: "2",
                xs: "3",
              }}
            >
              <Cross2Icon width="20" height="20" />
            </IconButton>
          </ModalHeader>

          <ModalBody>
            <VehicleFiltersHeader>
              <Heading size="4">Фильтры</Heading>
            </VehicleFiltersHeader>
            <VehicleFiltersContent>
              <ModalFiltersSection>
                {/* Mobile filters will be rendered here via children */}
                {children}
              </ModalFiltersSection>
            </VehicleFiltersContent>
          </ModalBody>

          <ModalFooter>
            <Flex direction="column" gap="3" width="100%">
              <Flex gap="3" width="100%">
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    color="gray"
                    onClick={handleMobileClear}
                    size={{
                      initial: "2",
                      xs: "3",
                    }}
                    style={{ flex: 1 }}
                  >
                    Очистить
                  </Button>
                )}
                <Button
                  variant="solid"
                  style={{
                    flex: activeFiltersCount > 0 ? 1 : undefined,
                    width: activeFiltersCount === 0 ? "100%" : undefined,
                  }}
                  onClick={handleMobileSubmit}
                  disabled={isSearchButtonDisabled}
                  size={{
                    initial: "2",
                    xs: "3",
                  }}
                >
                  <span style={{ whiteSpace: "nowrap" }}>
                    Показать результаты
                  </span>
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </MobileFiltersModal>
      </Dialog.Root>
    </>
  );
};

export default VehicleFilters;
