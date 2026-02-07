"use client";

import { FC } from "react";
import { Text } from "@radix-ui/themes";
import { getCollectionProps, getFieldsetProps } from "@conform-to/react";
import type { FieldMetadata } from "@conform-to/react";
import {
  ButtonList,
  CheckboxButtonLabel,
  FieldsetWrapper,
  HiddenCheckboxInput,
  IconTextWrapper,
  LegendBox,
} from "./CheckboxButtonGroup.styles";

export interface CheckboxButtonOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CheckboxButtonGroupProps {
  field: FieldMetadata<string[] | number[]>;
  label: string;
  subLabel?: string;
  options: CheckboxButtonOption[];
  errors?: string[];
  isDisabled?: boolean;
  dataAttrList?: string;
  dataAttrLabel?: string;
  dataAttrInput?: string;
}

const CheckboxButtonGroup: FC<CheckboxButtonGroupProps> = ({
  field,
  label,
  subLabel,
  options,
  errors,
  isDisabled,
  dataAttrList,
  dataAttrLabel,
  dataAttrInput,
}) => {
  const collectionProps = getCollectionProps(field, {
    type: "checkbox",
    options: options.map((o) => o.value),
  });

  const optionMap = new Map(options.map((o) => [o.value, o]));

  return (
    <FieldsetWrapper {...getFieldsetProps(field)}>
      <legend>
        <LegendBox>
          <Text as="span" size="3" weight="bold">
            {label}
          </Text>
          {subLabel && (
            <Text as="span" size="2" color="gray" style={{ display: "block" }}>
              {subLabel}
            </Text>
          )}
        </LegendBox>
      </legend>
      <ButtonList
        columns={{ initial: "1", xs: "2", md: "3" }}
        gap={{ initial: "3", md: "4" }}
      >
        {collectionProps.map((props) => {
          const { key, ...inputProps } = props;
          const opt = optionMap.get(props.value as string);
          const icon = opt?.icon;
          return (
            <CheckboxButtonLabel
              key={key}
              htmlFor={props.id}
              data-testid="check-button"
            >
              <HiddenCheckboxInput {...inputProps} disabled={isDisabled} />
              <IconTextWrapper>
                {icon && icon}
                <Text as="span" size="2" truncate>
                  {opt?.label ?? props.value}
                </Text>
              </IconTextWrapper>
            </CheckboxButtonLabel>
          );
        })}
      </ButtonList>
      {errors && errors.length > 0 && (
        <Text as="p" size="2" weight="bold" color="red" mt="2">
          {errors.join(", ")}
        </Text>
      )}
    </FieldsetWrapper>
  );
};

export default CheckboxButtonGroup;
