import { FC } from "react";
import {
  Flex,
  Text,
  Checkbox as RadixCheckbox,
  CheckboxProps,
} from "@radix-ui/themes";

import styles from "./Checkbox.module.scss";
import { FieldMetadata, getInputProps } from "@conform-to/react";
interface CustomCheckboxProps extends CheckboxProps {
  field: FieldMetadata<boolean | string>;
  label?: string;
  labelSize?: "1" | "2" | "3" | "4";
}

const Checkbox: FC<CustomCheckboxProps> = ({
  field,
  label,
  labelSize = "3",
  size = "3",
  ...rest
}) => {
  const checkboxProps = getInputProps(field, { type: "checkbox" });

  return (
    <Text className={styles.Checkbox} as="label" size={labelSize}>
      <Flex className={styles.Checkbox__Container} gap="2">
        <RadixCheckbox
          size={size}
          value={checkboxProps.value === "on" ? "true" : "false"}
          aria-describedby={checkboxProps["aria-describedby"]}
          aria-invalid={checkboxProps["aria-invalid"]}
          form={checkboxProps["form"]}
          id={checkboxProps["id"]}
          name={checkboxProps["name"]}
          defaultChecked={checkboxProps["defaultChecked"]}
          {...rest}
        />
        {label ?? label}
      </Flex>
    </Text>
  );
};

export default Checkbox;
