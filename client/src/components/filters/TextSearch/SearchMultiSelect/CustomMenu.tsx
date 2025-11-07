import { Props, MenuProps, ActionMeta, MultiValue } from "react-select";
import { Option, CustomSelectProps } from "./types";
import { components } from "react-select";
import React from "react";
import { Flex, IconButton } from "@radix-ui/themes";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

// Custom ValueContainer to show count instead of individual values
const CustomMenu = ({
  children,
  ...props
}: MenuProps<Option, true>) => {
  const { selectProps } = props;
  const { customMenuCloseHandler, customMenuCheckHandler } =
    selectProps as Partial<CustomSelectProps>;
    const values = selectProps.value;

  const onCheckHandler = () => {
    if (values && Array.isArray(values) && values.length > 0) {
      customMenuCloseHandler?.();
      customMenuCheckHandler?.(values);
    }

  };

  const closeMenuHandler = () => {
    customMenuCloseHandler?.();
    selectProps.onChange?.([], {
      action: "clear",
      removedValues: [],
    });
    customMenuCheckHandler?.([]);
  };
  return (
    <components.Menu {...props}>
      {children}
      <Flex
        align="center"
        gap="5"
        justify="center"
        p="2"
        style={{ border: "1px solid var(--gray-6)" }}
      >
        <IconButton
          color="green"
          variant="surface"
          size="2"
          onClick={onCheckHandler}
        >
          <CheckIcon />
        </IconButton>
        <IconButton variant="surface" size="2" onClick={closeMenuHandler}>
          <Cross1Icon />
        </IconButton>
      </Flex>
    </components.Menu>
  );
};

export default CustomMenu;
