import { FC, Ref, ReactNode } from "react";
import { TextField, Text, Box } from "@radix-ui/themes";
import { FieldMetadata, getInputProps } from "@conform-to/react";
import EmailDisclaimer from "@/components/EmailDisclaimer/EmailDisclaimer";

interface BasicFormFieldrops extends TextField.RootProps {
  field: FieldMetadata<
    number | string | string[] | (string | undefined)[] | undefined
  >;
  dataIsValid: boolean;
  errors?: string[];
  ref?: Ref<HTMLInputElement>;
  children?: ReactNode;
  label?: string;
  anotherLabel?: string;
  showEmailDisclaimer?: boolean;
  _key?: string;
}

const BasicFormField: FC<BasicFormFieldrops> = ({
  field,
  placeholder,
  size,
  defaultValue,
  className,
  dataIsValid,
  children,
  errors,
  ref,
  label,
  anotherLabel,
  showEmailDisclaimer,
  type = "text",
  _key,
  ...rest
}) => {
  const { mb, mt, mr, ml } = rest;

  return (
    <Box mb={mb} mt={mt} mr={mr} ml={ml}>
      {label && (
        <Text
          htmlFor={rest.id}
          as="label"
          size="3"
          weight="bold"
          style={{ lineHeight: "2" }}
          className={className}
        >
          <Text as="span">{label}</Text>
        </Text>
      )}
      <TextField.Root
        {...getInputProps(field, { type })}
        key={_key}
        placeholder={placeholder}
        size={size}
        defaultValue={defaultValue}
        className={className}
        data-isvalid={dataIsValid}
        ref={ref}
        {...rest}
      >
        <TextField.Slot>{children}</TextField.Slot>
      </TextField.Root>
      <Text style={{ fontSize: 10 }} weight="bold" as="span" size="1">
        {anotherLabel}
      </Text>
      <br />
      <Text as="p" align="center" weight="bold" size="2" color="red">
        {errors}
      </Text>
      {showEmailDisclaimer && (
        <Box mt="10px">
          <EmailDisclaimer />
        </Box>
      )}
    </Box>
  );
};

export default BasicFormField;
