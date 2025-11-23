import { MenuProps } from "react-select";
import { Option, CustomSelectProps } from "../types";
import { components } from "react-select";
import React, { useRef } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useClickOutsideTheComponent } from "@/hooks/useClickOutsideTheComponent";

const CustomMenu = ({ children, ...props }: MenuProps<Option, true>) => {
  const { selectProps } = props;
  const { customMenuCloseHandler } = selectProps as Partial<CustomSelectProps>;
  const menuListRef = useRef<HTMLDivElement | null>(null);

  useClickOutsideTheComponent(menuListRef, () => {
    customMenuCloseHandler?.();
  });

  const onCheckHandler = () => {
    customMenuCloseHandler?.();
  };

  const closeMenuHandler = () => {
    selectProps.onChange?.([], {
      action: "clear",
      removedValues: [],
    });
    customMenuCloseHandler?.();
  };
  return (
    <components.Menu {...props}>
      <Box ref={menuListRef}>
        {children}
        <Flex
          align="center"
          justify="center"
          gap="2"
          p="1"
          style={{ border: "1px solid var(--gray-6)" }}
        >
          <Button
            color="green"
            variant="surface"
            size={{
              initial: "1",
              md: "2",
            }}
            onClick={onCheckHandler}
          >
            подтвердить
          </Button>
          <Button
            variant="surface"
            size={{
              initial: "1",
              md: "2",
            }}
            onClick={closeMenuHandler}
          >
            отменить выбор
          </Button>
        </Flex>
      </Box>
    </components.Menu>
  );
};

export default CustomMenu;
