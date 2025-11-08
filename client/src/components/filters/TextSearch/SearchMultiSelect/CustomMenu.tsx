import { MenuProps } from "react-select";
import { Option, CustomSelectProps } from "./types";
import { components } from "react-select";
import React, { useRef } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useClickOutsideTheComponent } from "@/hooks/useClickOutsideTheComponent";

const CustomMenu = ({ children, ...props }: MenuProps<Option, true>) => {
  const { selectProps } = props;
  const {
    customMenuCloseHandler,
    customMenuCheckHandler,
    paramSelectionOptions,
  } = selectProps as Partial<CustomSelectProps>;
  const values = selectProps.value;
  const menuListRef = useRef<HTMLDivElement | null>(null);


  useClickOutsideTheComponent(menuListRef, () => {
    customMenuCloseHandler?.();
  });

  const onCheckHandler = () => {
     customMenuCloseHandler?.();
    // if (values && Array.isArray(values) && values.length > 0) {
    //   customMenuCloseHandler?.();
    //   customMenuCheckHandler?.(values);
    // }
  };
  

  const closeMenuHandler = () => {
    selectProps.onChange?.([], {
      action: "clear",
      removedValues: [],
    });
    customMenuCloseHandler?.();
    // if (
    //   paramSelectionOptions &&
    //   Array.isArray(paramSelectionOptions) &&
    //   paramSelectionOptions.length > 0
    // ) {
    //   customMenuCheckHandler?.([]);
    //   // customMenuCloseHandler?.();
    // }
    // 
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
