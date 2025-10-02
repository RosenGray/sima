"use client";
import { FC, useLayoutEffect, useRef } from "react";
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
  const controlRef = useRef(control);
  controlRef.current = control;

  useLayoutEffect(() => {
    if (defaultValue?.value) {
      controlRef.current.change(defaultValue.value);
    }
  }, [defaultValue?.value]);

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
        defaultValue={defaultValue}
        classNamePrefix="sima-select-single"
        styles={styles}
        name={field.name}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
        onBlur={() => controlRef.current.blur()}
        onFocus={() => controlRef.current.focus()}
        value={options.find((opt) => opt.value === control.value)}
        options={options}
        onChange={(option) => {
          if (option && typeof option === 'object' && option !== null && 'value' in option) {
            controlRef.current.change((option as Option).value);
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
