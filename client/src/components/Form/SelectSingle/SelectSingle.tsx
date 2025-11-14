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
import { RADIX_THEME_APP_ID, RADIX_THEME_PORTAL_ID } from "@/config/client";
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
}

const SelectSingle: FC<SelectSingleProps> = ({
  label,
  errors,
  field,
  options,
  defaultValue,
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
        key={key}
        name={name}
        instanceId={`select-${field.name}`}
        options={options}
        menuPortalTarget={portalTarget}
      
        // menuPortalTarget={document.getElementById(RADIX_THEME_PORTAL_ID)}
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
