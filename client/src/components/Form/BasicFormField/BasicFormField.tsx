import { FC, Ref, ReactNode } from "react";
import { TextField, Text, Box } from "@radix-ui/themes";
import { FieldMetadata, getInputProps } from "@conform-to/react";
import EmailDisclaimer from "@/components/EmailDisclaimer/EmailDisclaimer";
import { Browser, useBrowser } from "@/hooks/useBrowser";

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
  isMandatory?: boolean;
  containerStyle?: React.CSSProperties;
  disabledAutocomplete?: boolean;
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
  isMandatory,
  containerStyle,
  disabledAutocomplete,
  ...rest
}) => {
  const { mb, mt, mr, ml } = rest;
  const browser = useBrowser();

  return (
    <Box mb={mb} mt={mt} mr={mr} ml={ml} style={containerStyle}>
      {label && (
        <Text
          htmlFor={rest.id}
          as="label"
          size="3"
          weight="bold"
          mb="2"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          className={className}
        >
          <Text as="span">{label}</Text>
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
      <TextField.Root
        {...getInputProps(field, { type })}
        key={_key}
        placeholder={placeholder}
        size={size}
        defaultValue={defaultValue}
        className={className}
        data-isvalid={dataIsValid}
        ref={ref}
        autoComplete={(disabledAutocomplete && browser === Browser.Chrome) ? "true" : "off"}

        {...rest}
      >
        <TextField.Slot>{children}</TextField.Slot>
      </TextField.Root>
      <Text style={{ fontSize: 10 }} weight="bold" as="span" size="1">
        {anotherLabel}
      </Text>

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
