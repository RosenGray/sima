import { Props, MenuProps } from "react-select";
import { Option, CustomSelectProps } from "./types";
import { components } from "react-select";
import React from "react";
import { Flex, IconButton } from "@radix-ui/themes";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

// Custom ValueContainer to show count instead of individual values
const CustomMenu = ({ children, ...props }: MenuProps<Option, true>) => {
  return (
    <components.Menu {...props}>
      {children}
      <Flex align="center" gap="5" justify="center" p="2" style={{ border: "1px solid var(--gray-6)" }}>
        <IconButton color="green" variant="surface" size="2">
          <CheckIcon />
        </IconButton>
        <IconButton variant="surface" size="2">
          <Cross1Icon />
        </IconButton>
      </Flex>
    </components.Menu>
  );
};

export default CustomMenu;
