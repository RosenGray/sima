"use client";
import { FC, useEffect, useRef } from "react";
import React from "react";
import Select, { Props } from "react-select";
import { Box, Text } from "@radix-ui/themes";
import { styles } from "./SelectSingle.styles";
import {
  FieldMetadata,
  useInputControl,
  getSelectProps,
} from "@conform-to/react";
import { usePortalTarget } from "@/providers/PortalProvider/PortalProvider";

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
  isMandatory?: boolean;
}

const SelectSingle: FC<SelectSingleProps> = ({
  label,
  errors,
  field,
  options,
  defaultValue,
  isMandatory,
  ...rest
}) => {
  const { portalTarget } = usePortalTarget();
  const { key, name } = getSelectProps(field);
  const control = useInputControl(field);
  const controlRef = useRef(control);

  useEffect(() => {
    if (defaultValue?.value) {
      controlRef.current.change(defaultValue.value);
    }
  }, [defaultValue?.value, label]);

  return (
    <Box>
      <Box mb="2">
        {label && (
          <Text
            as="label"
            size="3"
            weight="bold"
            color="gray"
            htmlFor={rest.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              letterSpacing: 0.1,
            }}
          >
            {label}
            {isMandatory && (
              <Text as="span" size="3" weight="bold" color="tomato">
                *
              </Text>
            )}
          </Text>
        )}
        {!label && isMandatory && (
          <Text as="span" size="3" weight="bold" color="tomato">
            *
          </Text>
        )}
      </Box>
      <Select
        defaultValue={defaultValue}
        key={key}
        name={name}
        instanceId={`select-${field.name}`}
        options={options}
        menuPortalTarget={portalTarget}
        styles={styles}
        onBlur={() => controlRef.current.blur()}
        onFocus={() => controlRef.current.focus()}
        value={options.find((opt) => opt.value === control.value)}
        onChange={(option) => {
          if (option) {
            controlRef.current.change((option as Option).value);
          }
        }}
      />
      <Text as="p" align="center" weight="bold" size="2" color="red">
        {errors}
      </Text>
    </Box>
  );
};

export default SelectSingle;
