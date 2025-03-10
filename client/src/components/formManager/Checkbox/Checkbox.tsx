import { FC, useState } from "react";
import {
  Flex,
  Text,
  Checkbox as RadixCheckbox,
  CheckboxProps,
  Box,
} from "@radix-ui/themes";

import styles from "./Checkbox.module.scss";
import { FieldMetadata, getInputProps } from "@conform-to/react";
interface CustomCheckboxProps extends CheckboxProps {
  field: FieldMetadata<boolean | string>;
  label?: string;
  labelSize?: "1" | "2" | "3" | "4";
  errors?: string[];
}

const Checkbox: FC<CustomCheckboxProps> = ({
  field,
  label,
  labelSize = "3",
  size = "3",
  errors,
  ...rest
}) => {
  const { mb, mt, mr, ml } = rest;

  const checkboxProps = getInputProps(field, { type: "checkbox" });
  const [checked, setChecked] = useState<boolean | "indeterminate" | undefined>(
    checkboxProps["defaultChecked"]
  );

  const showErrors = !checked && errors && errors.length > 0;

  return (
    <Box mb={mb} mt={mt} mr={mr} ml={ml}>
      <Text
        style={{ display: "flex", justifyContent: "center" }}
        className={styles.Checkbox}
        as="label"
        size={labelSize}
      >
        <Flex className={styles.Checkbox__Container} gap="2">
          <RadixCheckbox
            size={size}
            key={field.key}
            name={field.name}
            checked={checked}
            aria-describedby={checkboxProps["aria-describedby"]}
            aria-invalid={checkboxProps["aria-invalid"]}
            form={checkboxProps["form"]}
            id={checkboxProps["id"]}
            onCheckedChange={(e) => {
              setChecked(e);
            }}
            {...rest}
          />
          {label ?? label}
        </Flex>
      </Text>
      <Text as="p" align="center" weight="bold" size="2" color="red">
        {showErrors && errors}
      </Text>
    </Box>
  );
};

export default Checkbox;
