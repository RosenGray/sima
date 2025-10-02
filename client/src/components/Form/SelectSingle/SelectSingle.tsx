"use client";
import { FC, useEffect } from "react";
import React from "react";
import Select, { Props } from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "./SelectSingle.styles";
import { FieldMetadata, useInputControl } from "@conform-to/react";

interface Option {
  value: string;
  label: string;
}

interface SelectSingleProps extends Props {
  field: FieldMetadata<string | string[] | (string | undefined)[] | undefined>;
  options: Option[];
  defaultValue?: Option;
  label?: string;
  className?: string;
  errors?: string[];
}

const SelectSingle: FC<SelectSingleProps> = ({
  label,
  errors,
  field,
  options,
  defaultValue,
  ...rest
}) => {
  const control = useInputControl(field);
  useEffect(() => {
    if (defaultValue?.value) {
      control.change(defaultValue.value);
    }
  }, [defaultValue?.value,control]);
  return (
    <Box>
      {label && (
        <Text
          style={{ lineHeight: "2" }}
          htmlFor={rest.id}
          as="label"
          size="3"
          weight="bold"
        >
          {label}
        </Text>
      )}
      <Select
        classNamePrefix="sima-select-single"
        styles={styles}
        name={field.name}
        menuPortalTarget={document.body}
        onBlur={control.blur}
        onFocus={control.focus}
        value={options.find((opt) => opt.value === control.value)}
        options={options}
        onChange={(option) => {
          if (option) {
            control.change((option as Option).value);
          }
        }}
        {...rest}
      />
      <Text as="p" align="center" weight="bold" size="2" color="red">
        {errors}
      </Text>
    </Box>
  );
};

export default SelectSingle;
