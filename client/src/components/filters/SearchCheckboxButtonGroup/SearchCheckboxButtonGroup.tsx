"use client";

import { FC, useCallback, useId } from "react";
import { Text } from "@radix-ui/themes";
import {
  ButtonList,
  CheckboxButtonLabel,
  FieldsetWrapper,
  HiddenCheckboxInput,
  IconTextWrapper,
  LegendBox,
} from "./SearchCheckboxButtonGroup.styles";

export interface SearchCheckboxButtonOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SearchCheckboxButtonGroupProps {
  label: string;
  subLabel?: string;
  options: SearchCheckboxButtonOption[];
  value: string[];
  onChange: (value: string[]) => void;
  isDisabled?: boolean;
}

const SearchCheckboxButtonGroup: FC<SearchCheckboxButtonGroupProps> = ({
  label,
  subLabel,
  options,
  value,
  onChange,
  isDisabled,
}) => {
  const baseId = useId();

  const handleChange = useCallback(
    (optionValue: string, checked: boolean) => {
      if (checked) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((v) => v !== optionValue));
      }
    },
    [value, onChange]
  );

  return (
    <FieldsetWrapper>
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
        {options.map((opt) => {
          const id = `${baseId}-${opt.value}`;
          const checked = value.includes(opt.value);
          return (
            <CheckboxButtonLabel key={opt.value} htmlFor={id}>
              <HiddenCheckboxInput
                id={id}
                type="checkbox"
                value={opt.value}
                checked={checked}
                disabled={isDisabled}
                onChange={(e) =>
                  handleChange(opt.value, e.currentTarget.checked)
                }
                aria-checked={checked}
              />
              <IconTextWrapper>
                {opt.icon && opt.icon}
                <Text as="span" size="2" truncate>
                  {opt.label}
                </Text>
              </IconTextWrapper>
            </CheckboxButtonLabel>
          );
        })}
      </ButtonList>
    </FieldsetWrapper>
  );
};

export default SearchCheckboxButtonGroup;
