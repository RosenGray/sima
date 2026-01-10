import { MenuProps } from "react-select";
import { Option, CustomSelectProps } from "../types";
import { components } from "react-select";
import React, { useRef } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useClickOutsideTheComponent } from "@/hooks/useClickOutsideTheComponent";

// Fixed height for the buttons container (approximately 50px including padding)
const BUTTONS_CONTAINER_HEIGHT = 50;

const CustomMenu = ({ children, ...props }: MenuProps<Option, true>) => {
  const { selectProps } = props;
  const { customMenuCloseHandler } = selectProps as Partial<CustomSelectProps>;
  const maxMenuHeight = selectProps.maxMenuHeight ?? 250;
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

  // Calculate options max height: total maxMenuHeight minus buttons height
  const optionsMaxHeight = maxMenuHeight - BUTTONS_CONTAINER_HEIGHT;

  return (
    <components.Menu {...props}>
      <Box ref={menuListRef}>
        <Box style={{ maxHeight: optionsMaxHeight, overflowY: "auto" }}>
          {children}
        </Box>
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
