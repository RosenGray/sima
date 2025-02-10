import { FC, LegacyRef, ReactNode } from "react";
import { TextField, Text, Box } from "@radix-ui/themes";
import EmailDisclaimer from "@/components/EmailDisclaimer/EmailDisclaimer";

interface BasicFormFieldrops extends TextField.RootProps {
  dataIsValid: boolean;
  errors?: string[];
  ref?: LegacyRef<HTMLInputElement>;
  children?: ReactNode;
  label?: string;
  showEmailDisclaimer?: boolean;
}

const BasicFormField: FC<BasicFormFieldrops> = ({
  key,
  placeholder,
  size,
  defaultValue,
  className,
  dataIsValid,
  children,
  errors,
  ref,
  label,
  showEmailDisclaimer,
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
          {label}
        </Text>
      )}
      <TextField.Root
        {...rest}
        key={key}
        placeholder={placeholder}
        size={size}
        defaultValue={defaultValue}
        className={className}
        data-isvalid={dataIsValid}
        ref={ref}
      >
        <TextField.Slot>{children}</TextField.Slot>
      </TextField.Root>
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
