"use client";
import { FC, ReactNode } from "react";
import { Dialog, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  MoreFiltersModalContent,
  MoreFiltersModalHeader,
  MoreFiltersModalBody,
  MoreFiltersModalFooter,
} from "./MoreFiltersModal.styles";

interface MoreFiltersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const MoreFiltersModal: FC<MoreFiltersModalProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <MoreFiltersModalContent>
        <MoreFiltersModalHeader>
          <Flex direction="column" gap="1">
            <Heading
              size={{
                initial: "4",
                xs: "5",
              }}
            >
              Больше фильтров
            </Heading>
            <Text size="2" color="gray">
              Дополнительные параметры поиска
            </Text>
          </Flex>
          <IconButton
            variant="ghost"
            color="gray"
            onClick={() => onOpenChange(false)}
            size={{
              initial: "2",
              xs: "3",
            }}
          >
            <Cross2Icon width="20" height="20" />
          </IconButton>
        </MoreFiltersModalHeader>

        <MoreFiltersModalBody>{children}</MoreFiltersModalBody>

        <MoreFiltersModalFooter>
          <Dialog.Close>
            <Text size="2" color="gray" style={{ cursor: "pointer" }}>
              Закрыть
            </Text>
          </Dialog.Close>
        </MoreFiltersModalFooter>
      </MoreFiltersModalContent>
    </Dialog.Root>
  );
};

export default MoreFiltersModal;

